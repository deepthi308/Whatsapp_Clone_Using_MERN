const createHttpError = require("http-errors");
const validator = require("validator");
const { UserModel } = require("../models/index");

// ENV Variables
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

const createUser = async (userData) => {
  const { name, email, password, picture, status } = userData;

  // Checking if field are empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all the fields");
  }

  // Checking Name Length
  if (
    !validator.isLength(name, {
      min: 2,
      max: 20,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your name is between 2 and 16 characters"
    );
  }

  // Check if email address is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      "Please make sure to provide valid email address"
    );
  }

  // Check if the user already exist
  const checkDB = await UserModel.findOne({ email });
  console.log(checkDB);
  if (checkDB) {
    throw createHttpError.Conflict(
      "Please try again with a different email address, this email already exist"
    );
    return;
  }

  // Check Password Length
  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your password is between 6 and 128 characters"
    );
  }

  // Check status length
  if (status && status.length > 64) {
    throw createHttpError.BadRequest(
      "Please make sure your status is less than 64 characters"
    );
  }

  const user = await new UserModel({
    name: name,
    email: email,
    password: password,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
  }).save();

  return user;
};

module.exports = { createUser };
