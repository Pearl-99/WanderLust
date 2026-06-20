# WanderLust 🌍

WanderLust is a full-stack Airbnb-style listings web app built with **Node.js, Express, MongoDB, and EJS**. Users can browse, search, and filter property listings, view them on an interactive map, sign up and log in, create and manage their own listings with image uploads, and leave star-rated reviews.

**Live demo:** [wanderlust-l6tk.onrender.com](https://wanderlust-l6tk.onrender.com)

> Note: the app is hosted on Render's free tier, so the first request after a period of inactivity may take a few seconds to spin up.

## Features

- **Listings CRUD** — create, view, edit, and delete property listings
- **Search & filter** — search by title/location/country and filter by category (Rooms, Iconic Cities, Mountains, Castles, Amazing Pools, Camping, Farms, Arctic, Trending)
- **Trending sort** — surfaces listings with the most reviews
- **Interactive maps** — listing locations are geocoded and shown on a Leaflet map
- **Reviews & ratings** — logged-in users can leave star ratings and comments on listings
- **Authentication** — sign up / log in / log out powered by Passport.js, with session persistence in MongoDB
- **Authorization** — only a listing's owner can edit or delete it; only logged-in users can create listings or reviews
- **Image uploads** — listing photos are uploaded and served via Cloudinary
- **Server-side validation** — request bodies validated with Joi
- **Flash messages** — success/error feedback after key actions
- **Centralized error handling** — custom error class with a catch-all 404 and error page

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Server / Routing | Express 5 |
| Templating | EJS + EJS-Mate (layouts) |
| Database | MongoDB + Mongoose |
| Auth | Passport.js (passport-local, passport-local-mongoose) |
| Sessions | express-session + connect-mongo |
| File storage | Cloudinary + Multer |
| Geocoding | Geoapify API |
| Maps | Leaflet.js |
| Validation | Joi |
| Frontend | Bootstrap, custom CSS, vanilla JS |

## Project Structure

```
WanderLust/
├── controllers/      # Route handler logic (listings, reviews, users)
├── init/             # DB seed script and sample data
├── models/           # Mongoose schemas (Listing, Review, User)
├── public/           # Static assets (CSS, client-side JS)
├── routes/           # Express routers
├── utils/            # Custom error class, async wrapper, geocoding helper
├── views/            # EJS templates and layouts
├── app.js            # App entry point
├── cloudConfig.js    # Cloudinary/Multer storage config
├── middleware.js     # Auth/ownership/validation middleware
└── schema.js         # Joi validation schemas
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB database (local instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)
- A [Geoapify](https://www.geoapify.com/) API key (for geocoding listing locations)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Pearl-99/WanderLust.git
   cd WanderLust
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   GEOAPIFY_API_KEY=your_geoapify_api_key
   ```

4. (Optional) Seed the database with sample listings
   ```bash
   node init/index.js
   ```

5. Start the server
   ```bash
   node app.js
   ```

6. Visit `http://localhost:8080` in your browser

## Usage

- Browse listings on the home page, or use the search bar and category filters to narrow results
- Sign up for an account to create new listings or leave reviews
- Click into any listing to see full details, its location on the map, and existing reviews
- Listing owners can edit or delete their own listings from the listing's detail page
