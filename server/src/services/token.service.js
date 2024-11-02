const createHttpError = require("http-errors");
const { UserModel } = require("../models");
const { sign, verify } = require("../utils/token.util");
const bcrypt = require("bcrypt");

const generateToken = async (payload, expiresIn, secret) => {
  const token = await sign(payload, expiresIn, secret);
  return token;
};

const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  // Check if user exist
  if (!user) {
    throw createHttpError.NotFound("Invalid credentials.");
  }

  // Comparse passwords
  let passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw createHttpError.NotFound("Invalid credentials.");
  }

  return user;
};

const verifyToken = async (token, secret) => {
  let check = await verify(token, secret);
  return check;
};

module.exports = { generateToken, signUser, verifyToken };
