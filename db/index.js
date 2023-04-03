const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();

require("dotenv").config();

let MONGODB_URL = process.env.PROD_MONGODB || process.env.MONGODB_URL;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

mongoose
  .connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
