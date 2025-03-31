const { Song } = require("../../model/songSchema");

const updateSong = async (req, res) => {
  try {
    const { songName, songGenre, songLink } = req.body;
    
    if (!songName || !songGenre || !songLink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedSong = await Song.findOneAndUpdate(
      { songName }, 
      { songGenre, songLink }, 
      { new: true } // Return the updated document
    );
    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ message: "Song updated successfully", song: updatedSong });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while updating song", error: err.message });
  }
};

module.exports = { updateSong };
