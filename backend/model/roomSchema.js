const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: Number,
      required: true,
      unique: true,
      min: 100000,
      max: 999999, // Ensuring a 6-digit number
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    activeUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    currentSong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song", // Reference to Song model
    },
    playedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ], // Corrected playedSongs syntax
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
