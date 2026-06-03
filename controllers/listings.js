const Listing=require("../models/listing.js")
const getCoordinates = require("../utils/geocode");


module.exports.index=async(req,res)=>{

    const {q}=req.query;

    let allListings;

    if (q && q.trim() !== "")
    {
        allListings= await Listing.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { location: { $regex: q, $options: "i" } },
                { country: { $regex: q, $options: "i" } }
            ]
        });

    }
    else
    {
        allListings=await Listing.find({});
    }

  
    res.render("listings/index.ejs",{allListings,q});
};

module.exports.renderNewForm=(req,res)=>{
    // console.log(req.user);
    
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing)
    {
        req.flash("error","Listing you requested for, doesn't exist!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};


module.exports.createListing = async (req, res, next) => {

    const fullLocation =`${req.body.listing.location}, ${req.body.listing.country}`;

    const coords = await getCoordinates(fullLocation);

    //console.log(coords);

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    newListing.geometry = {
        type: "Point",
        coordinates: [
            coords.longitude,
            coords.latitude,
        ],
    };

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing)
    {
        req.flash("error","Listing you requested for, doesn't exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
    
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file!=="undefined")
    {
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(`Deleted listing is ${deletedListing}`);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}
