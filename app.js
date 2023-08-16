const express = require("express");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}

// using middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes

const user = require("./routes/user")

// using routes
app.use("/api/v1",user)

module.exports = app;
