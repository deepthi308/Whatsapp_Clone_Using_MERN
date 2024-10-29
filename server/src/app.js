const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();

// Create express server
const app = express();

// Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Helmet
app.use(helmet());

// Parse JSON data from request body
app.use(express.json());

// Parse JSON data from request URL
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(mongoSanitize());

// Enable cookie parser
app.use(cookieParser());

// Gzip compression
app.use(compression());

// File upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Cors
app.use(
  // cors({
  //   origin: "http://localhost:3000",
  // })
  cors()
);

app.post("/", (req, res) => {
  res.send(req.body);
});

module.exports = app;
