const { Schema, model } = require("mongoose");

const tuitSchema = new Schema({
  text: {
    type: String,
    maxlength: 200,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Tuit = model("Tuit", tuitSchema);

module.exports = Tuit;
