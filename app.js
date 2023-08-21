const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

const cors = require("cors");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

// using middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("*",cors({
  origin: true,
  credentials: true,
}))
// import routes

const user = require("./routes/user");

// using routes
app.use("/api/v1", user);

module.exports = app;
