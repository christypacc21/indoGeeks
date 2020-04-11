// The index js file of backend
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();

const app = express();
const usersRouter = require("./routes/api/users");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(cors());

// DB Config
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
	.catch(error => handleError(error));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose database connection established successfully");
})

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", usersRouter);

// Server
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));