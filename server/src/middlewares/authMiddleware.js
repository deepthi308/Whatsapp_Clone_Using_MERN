const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (!req.headers["authorization"]) {
    // return next(createHttpError.Unauthorized());
    throw createHttpError.Unauthorized();
  }

  const bearerToken = req.headers["authorization"];
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      console.log(error.name);
      console.log(error.message);
      throw createHttpError.Unauthorized();
    } else {
      req.user = payload;
      next();
    }
  });
};

module.exports = { authMiddleware };
