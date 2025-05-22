const express=require("express");
const router=express.Router();
const {createRoom}=require("../../controllers/room/createRoom");
router.post("/createroom",createRoom);
module.exports=router;