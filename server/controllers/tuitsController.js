require("dotenv").config();
const debug = require("debug")("tuitah:controller");

const chalk = require("chalk");

const Tuit = require("../../database/models/tuit");

const getTuits = async (req, res, next) => {
  const tuits = await Tuit.find();
  res.json(tuits);
};

module.exports = { getTuits };
