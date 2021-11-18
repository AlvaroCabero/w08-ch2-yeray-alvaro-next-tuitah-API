const express = require("express");
const {
  getTuits,
  createTuit,
  deleteTuit,
} = require("../controllers/tuitsController");
const { tuitSchema } = require("../schemas/tuitSchema");
const { validate } = require("express-validation");

const router = express.Router();

router.get("/", getTuits);
router.post("/new", createTuit);
router.delete("/delete/:id", deleteTuit);

module.exports = router;
