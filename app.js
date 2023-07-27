// const exp = require('constants');
const express=require('express');
const app=express();
const path=require('path');
const port=80;
const hbs =require('hbs');

require(path.join(__dirname,"/conn.js"));
const Register=require(path.join(__dirname,"register.js"));
const workwithus=require(path.join(__dirname,"thanks.js"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','hbs');
app.set('views',path.join(__dirname,"templates","views"));
hbs.registerPartials(path.join(__dirname,"templates/partials"));

app.use(express.static(path.join(__dirname,"static","css")));
app.use(express.static(path.join(__dirname,"static","images")));

app.get("/",(req,res)=>{
    res.status(200).render("home.hbs");    
});
app.get("/login",(req,res)=>{
    res.status(200).render("login");
});
app.get("/notes",(req,res)=>{
res.render("notes");
});
app.get("/signup",(req,res)=>{
res.render("signup");
});
app.get("/workwithus",(req,res)=>{
res.render("workwithus");
});
app.get("/contact",(req,res)=>{
res.render("contact");
});


app.post("/signup",async(req,res)=>{
    try{
        const password=req.body.spassword;
        const cpassword=req.body.Scpassword;
        if(password === cpassword){
          const mydata=new Register({
            Sname:req.body.Sname,
            Semail:req.body.Semail,
            spassword:req.body.spassword,
            Scpassword:req.body.Scpassword
          });
          
           await mydata.save();
          console.log("Registered Successfully");
          res.render("courses");
        }
        else{
            res.send("PAssword not matchiing");
        } 
    }
    catch(e){
            res.status(400).send(e);
    }
    });

app.post("/thanks",async(req,res)=>{
    try{
        const employee=new workwithus({
            wname:req.body.wname,
            wemail:req.body.wemail,
            wphone:req.body.wphone,
            wurl:req.body.wurl
        });
        employee.save();
        res.status(200).send(`<h1 align="center" >We Will Contact You Shortly</h1>`);
        
        console.log("Data Recieved Successfully");
    }
    catch(e){
        console.log(e);
    }
});

app.post("/login",async(req,res)=>{
    try{
      const hemail=req.body.lemail;
      const hpassword=req.body.lpassword;
      const useremail=await Register.findOne({Semail:hemail})
      if(useremail.spassword == hpassword){
res.render("courses");
console.log("loged in successfully");
      }
     else{
        res.send("invalid login details");
     }
      }
    catch(e){

    }
});
app.listen(80,()=>
{
    console.log("website started successfully");
    
});