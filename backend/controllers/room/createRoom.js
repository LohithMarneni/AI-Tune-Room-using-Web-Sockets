const Room=require('../../model/roomSchema');
const createRoom=async(req,res)=>{
    return res.json({username:req.user,message:"Room created successfully"});
}
module.exports={createRoom};