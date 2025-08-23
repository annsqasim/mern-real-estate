import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Property from "../models/Property.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear old data
    await Property.deleteMany();

    const properties = [
      {
        title: "Luxury Apartment in Downtown",
        price: 120000,
        type: "sale",
        location: "Downtown",
        bedrooms: 3,
        bathrooms: 2,
        area: 1500,
        amenities: ["Pool", "Gym", "Parking"],
        images: ["https://via.placeholder.com/300"],
        status: "active"
      },
      {
        title: "Beachfront Villa",
        price: 2500,
        type: "rent",
        location: "Palm Jumeirah",
        bedrooms: 5,
        bathrooms: 4,
        area: 4000,
        amenities: ["Beach Access", "Private Pool"],
        images: ["https://via.placeholder.com/400"],
        status: "active"
      },
      {
        title: "Cozy Studio Apartment",
        price: 700,
        type: "rent",
        location: "Marina",
        bedrooms: 1,
        bathrooms: 1,
        area: 450,
        amenities: ["Furnished", "Balcony"],
        images: ["https://via.placeholder.com/200"],
        status: "active"
      },
      {
        title: "Modern 2BR Apartment",
        price: 1500,
        type: "rent",
        location: "JLT",
        bedrooms: 2,
        bathrooms: 2,
        area: 1100,
        amenities: ["Gym", "Parking"],
        images: ["https://via.placeholder.com/250"],
        status: "active"
      },
      {
        title: "Spacious Family Villa",
        price: 180000,
        type: "sale",
        location: "Arabian Ranches",
        bedrooms: 4,
        bathrooms: 3,
        area: 3500,
        amenities: ["Garden", "Garage", "Maid Room"],
        images: ["https://via.placeholder.com/350"],
        status: "active"
      },
      {
        title: "Penthouse with City View",
        price: 500000,
        type: "sale",
        location: "Downtown",
        bedrooms: 4,
        bathrooms: 5,
        area: 5000,
        amenities: ["Private Pool", "Terrace", "Gym"],
        images: ["https://via.placeholder.com/500"],
        status: "active"
      },
      {
        title: "Affordable Studio",
        price: 500,
        type: "rent",
        location: "International City",
        bedrooms: 1,
        bathrooms: 1,
        area: 400,
        amenities: ["AC", "Shared Parking"],
        images: ["https://via.placeholder.com/150"],
        status: "active"
      },
      {
        title: "Townhouse with Backyard",
        price: 95000,
        type: "sale",
        location: "Mirdif",
        bedrooms: 3,
        bathrooms: 3,
        area: 2200,
        amenities: ["Backyard", "Garage"],
        images: ["https://via.placeholder.com/280"],
        status: "active"
      },
      {
        title: "Luxury 1BR with Sea View",
        price: 2200,
        type: "rent",
        location: "JBR",
        bedrooms: 1,
        bathrooms: 2,
        area: 1000,
        amenities: ["Beach Access", "Balcony"],
        images: ["https://via.placeholder.com/260"],
        status: "active"
      },
      {
        title: "Commercial Office Space",
        price: 75000,
        type: "sale",
        location: "Business Bay",
        bedrooms: 0,
        bathrooms: 1,
        area: 2000,
        amenities: ["Meeting Room", "Parking"],
        images: ["https://via.placeholder.com/220"],
        status: "active"
      }
    ];

    await Property.insertMany(properties);
    console.log("✅ 10 mock properties added");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
