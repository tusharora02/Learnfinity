const mongoose=require('mongoose');
const employeeSchema =new mongoose.Schema({
    Sname:{
        type:String,
        
    },
    Semail:{
          type:String,
          unique:true,
          
    },
    spassword:{
          type:String,
          
          
    },
    Scpassword:{
        type:String,
        
    }

})
const Register=new mongoose.model("Register",employeeSchema);
module.exports=Register;