const app = require("./app");
const logger = require("./configs/logger.config");
const { mongoose } = require("mongoose");

// ENV Variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

// MongoDB Connection
mongoose
  .connect(
    DATABASE_URL
    // ,
    // {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // }
  )
  .then(() => {
    logger.info("Connected to MongoDB.");
  });

// Exit on MongoDB error
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error : ${err}`);
  process.exit(1);
});

// MongoDB debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

// Starting Server
const server = app.listen(PORT, () => {
  logger.info(`Server has started listening at http://localhost:${PORT}.`);
});

// Handle Server Errors
const exitHandler = () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  }
});
