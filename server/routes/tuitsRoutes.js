const express = require("express");
const { getTuits, createTuit } = require("../controllers/tuitsController");
const { tuitSchema } = require("../schemas/tuitSchema");
const { validate } = require("express-validation");

const router = express.Router();

router.get("/", getTuits);
router.post("/new", validate(tuitSchema), createTuit);

module.exports = router;
