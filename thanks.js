const mongoose =require('mongoose');
const workwithus1=new mongoose.Schema({
    wname:{
        type:String,
        
    },
    wemail:{
         type:String,
         
    },
    wphone:{
        type:String,
        
    },
    wurl:{
        type:String,
        
    }
})
const workwithus =new mongoose.model("Unemployment",workwithus1);
module.exports=workwithus;