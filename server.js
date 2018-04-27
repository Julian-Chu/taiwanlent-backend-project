const express = require('express');
const app = express();
const PersonalUser = require('./models/PersonalUser');

app.get("/users", (req,res)=>{
  PersonalUser.findAll({})
    .then(users=> res.status(200).json(users));
});


app.listen(5000);
console.log("Server started: port 5000");