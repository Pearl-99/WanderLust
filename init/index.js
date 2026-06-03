require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const getCoordinates = require("../utils/geocode");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
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

      owner: "6a1ff13fd4c56a10b13a55f1",

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