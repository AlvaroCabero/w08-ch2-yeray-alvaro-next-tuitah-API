require("dotenv").config();
const debug = require("debug")("tuitah:controller");
const chalk = require("chalk");
const Tuit = require("../../database/models/tuit");

const getTuits = async (req, res, next) => {
  const tuits = await Tuit.find();
  res.json(tuits);
};

const createTuit = async (req, res, next) => {
  try {
    const tuit = req.body;
    const newTuit = await Tuit.create(tuit);
    debug(chalk.green("A new tuit has been created"));
    res.status(201);
    res.json(newTuit);
  } catch (error) {
    error.code = 400;
    error.message = "The tuit could not be created";
    next(error);
  }
};

const deleteTuit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTuit = await Tuit.findByIdAndDelete(id);
    if (deletedTuit) {
      res.status(200);
      res.json(deletedTuit);
    } else {
      const error = new Error("Tuit not found, impossible to delete");
      error.code = 401;
      next(error);
    }
  } catch (error) {
    error.code = 404;
    next(error);
  }
};

module.exports = { getTuits, createTuit, deleteTuit };
