const {Song}=require("../../model/songSchema");
const addSong=async(req,res)=>{
    try{
        const {songName,songGenre,songLink}=req.body;
        if(!songName || !songGenre || !songLink){
            return res.status(400).json({message:"All fields are required"});
        }
        const newSong=new Song({songName,songGenre,songLink});
        await newSong.save();
        res.status(201).json({message:"Song added successfully",song:newSong});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Error while adding song",error:err.message});
    }
}
module.exports={addSong};