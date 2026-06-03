require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const getCoordinates = require("../utils/geocode");

const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const listings = [];

  for (let listing of initData.data) {

    const fullLocation =
      `${listing.location}, ${listing.country}`;

    const coords =
      await getCoordinates(fullLocation);

    listings.push({
      ...listing,

      owner: "6a200ec5b8b69e2a9268a2ee",

      geometry: {
        type: "Point",
        coordinates: [
          coords.longitude,
          coords.latitude,
        ],
      },
    });
  }

  await Listing.insertMany(listings);

  console.log("data was initialized");
};

initDB();