// The index js file of backend

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const bodyParser = require("body-parser");
const app = express();



// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use(bodyParser.json());



// DB Config
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
	.catch(error => handleError(error));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Mongoose database connection established successfully");
})



// Routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);



// PORT and serve
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));