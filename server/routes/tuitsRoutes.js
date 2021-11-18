const express = require("express");
const { getTuits, createTuit } = require("../controllers/tuitsController");

const router = express.Router();

router.get("/", getTuits);
router.post("/new", createTuit);

module.exports = router;
