// creates express webapp on port 3000
const express = require("express");
const app = express();

const port = 3000;
// server status
app.listen(port, () => console.log(`server listening on port: ${port}`));

// mongodb config and connection
const mongoose = require("mongoose");
const url =
  "mongodb+srv://user:web-dev-2@final-project.irbaa8h.mongodb.net/?retryWrites=true&w=majority";

async function connectMongoose() {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch {
    console.error(error);
  }
}
connectMongoose();

const UserModel = require('./models/Users');

app.get('/api/users', (req, res) => {
  // should return users and their game records
  // obviously don't want to return passwords :/
  console.log("Getting users...");
  
  UserModel.find({}, {password:0}).exec().then(users => {
    res.status(200).json({
      message: 'Users found successfully',
      users: users
    });
  });

  
});

app.post("/api/users", async (req, res, next) => {

  var result = await UserModel.exists({name: req.body.name}).exec();

  if(result != null){
    res.status(409).json({
      message: 'Username already exists, please try again.'
    });
    return;
  }

  const user = new UserModel({
    name: req.body.name,
    password: req.body.password,
    wins: 0,
    losses: 0,
    ties: 0,
    createDate: Date.now() 
  });

  console.log(user);

  UserModel.create(user).then(() => {
    res.status(201).json({
      message: 'User added successfully'
    });
  });
  
});

app.post("/api/records/:username/:field=:value", (req, res, next) => {
  // find the user with given username and update their record history with the given username
  console.log(`Updating user ${username}...`)

  UserModel.findOne({name: username}).exec().then(user => {
    user
  });
});

// app.delete("/api/users/:id", (req, res, next) => {

// });