const {Song} = require('../../model/songSchema');

const getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        if(!songs){
            return res.status(404).json({ message: 'No songs found' });
        }
        res.status(200).json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while fetching songs', error: error.message });
    }
}
module.exports = { getSongs };