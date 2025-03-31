const express=require("express");
const router=express.Router();
const {addSong}=require("../../controllers/songs/addSongController");
router.post("/addsong",addSong);
module.exports=router;