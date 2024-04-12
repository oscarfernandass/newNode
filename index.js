const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel=require('./User');
const Story=require('./Story');
const bodyParser=require("body-parser");
const axios=require("axios");
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://oscar:oscar%40546@cluster0.nbn0hpp.mongodb.net/learner")
.then(() => {
  console.log("Connected to the database");
});

app.post("/login",(req,res)=>{
  const{userName,password}=req.body;
  userModel.findOne({userName:userName})
  .then(user=>{
    if(user){
      if(user.password===password){
        res.json("success");
      }
      else{
        res.json("incorrect");
      }
    }
    else{
      res.json("not exist");
    }
  })
})

app.post('/register',(req,res)=>{
  userModel.create(req.body)
  .then(users=>res.json(users))
  .catch(err=>res.json(err))
})

app.get("/user/:userName", (req, res) => {
  const userName = req.params.userName;

  userModel.findOne({ userName: userName })
    .then(user => {
      if (user) {
        res.json(user);
      }
    })
    .catch(err=>res.json(err))
  })


  app.put("/story/update-email", (req, res) => {
    const { username, newEmail } = req.body;
  
    // Find the user's story by username and update its email
    Story.findOneAndUpdate(
      { username: username },
      { email: newEmail },
      { new: true } // Return the updated document
    )
      .then(updatedStory => {
        if (updatedStory) {
          res.json({ message: "Email updated successfully", story: updatedStory });
        } else {
          res.status(404).json({ message: "User's story not found" });
        }
      })
      .catch(err => {
        console.error("Error updating email:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  });
  


  
  
  


  
app.listen(3001, () => {
  console.log("Server is Running");
});
