const express=require("express");
const router=express.Router();
const {getSongs}=require("../../controllers/songs/getSongsController");
router.get("/getsongs",getSongs);
module.exports=router;