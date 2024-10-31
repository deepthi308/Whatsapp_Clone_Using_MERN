const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const createHttpError = require("http-errors");
const routes = require("./routes/index");
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

// Routes
app.use("/api/v1", routes);

app.post("/test", (req, res) => {
  throw createHttpError.BadRequest("This route has an error");
});

app.use((req, res, next) => {
  throw createHttpError.NotFound("This route doesn't exist");
});

// Error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

module.exports = app;
