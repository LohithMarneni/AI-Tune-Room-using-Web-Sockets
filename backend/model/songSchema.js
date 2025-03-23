const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    songId: {
      type: String,
      required: true,
      unique: true,
    },
    songName: {
      type: String,
      required: true,
      trim: true,
    },
    songGenre: {
      type: String,
      required: true,
      trim: true,
    },
    songLink: {
      type: String,
      required: true,
      trim: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", songSchema);
module.exports = { Song }; 
