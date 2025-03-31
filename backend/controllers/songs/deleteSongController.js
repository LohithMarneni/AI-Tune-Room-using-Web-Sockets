const {Song} = require('../../model/songSchema');
const deleteSong = async (req, res) => {
    try {
        const {songName} = req.body;
        if(!songName){
            return res.status(400).json({message:"Song name is required"});
        }
        const deletedSong = await Song.findOneAndDelete({songName});
        if(!deletedSong){
            return res.status(404).json({message:"Song not found"});
        }
        res.status(200).json({message:"Song deleted successfully",song:deletedSong});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Error while deleting song",error:err.message});
    }
}
module.exports = {deleteSong};