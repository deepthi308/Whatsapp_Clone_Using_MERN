const createHttpError = require("http-errors");
const { UserModel } = require("../models");

const findUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw createHttpError.BadRequest("Please fill all the fields");
  }
  return user;
};

module.exports = { findUser };
