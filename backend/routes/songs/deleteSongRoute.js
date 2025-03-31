const express=require("express");
const router=express.Router();
const {deleteSong}=require("../../controllers/songs/deleteSongController");
router.delete("/deletesong",deleteSong);
module.exports=router;