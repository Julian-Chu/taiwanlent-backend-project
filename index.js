const FrontendServer = require('./dic').FrontendServer;

// @ts-check
"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//initialize sequelize and passport
require("./models/index");
require("./services/passport");
const cors = require("cors");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const corsOptions = {
  origin: [
    `${FrontendServer}`,
    'http://localhost:3000',
  ],
  methods: 'GET,HEAD,POST',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

let port = process.env.PORT || 5000;

// Routes
require("./routes/TalentRoute")(app);
require("./routes/AuthRoute")(app);
require("./routes/BusinessUserRoute")(app);
require("./routes/PeronalUserRoute")(app);
require("./routes/TestRoute")(app);
console.log("Server started: port 5000");
module.exports.app = app;

app.listen(port);