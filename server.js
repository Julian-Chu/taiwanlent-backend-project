const express = require('express');
const app = express();
const PersonalUser = require('./models/PersonalUser');

app.get("/user", (req,res)=>{
  PersonalUser.findAll({})
    .then(users=> res.status(200).json(users));
});

app.get("/user/:id", (req,res)=>{
  if(req.params.id != 0){
    console.log(req.params.id);
    PersonalUser.find({
      userId: req.params.id,
      attributes:{exclude: ['password']}
    })
    .then(user=>res.status(200).json(user));
  }
})


app.listen(5000);
console.log("Server started: port 5000");