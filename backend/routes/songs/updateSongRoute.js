const express=require("express");
const router=express.Router();
const {updateSong}=require("../../controllers/songs/updateSongController");
router.put("/updatesong",updateSong);
module.exports=router;