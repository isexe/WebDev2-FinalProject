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

const UserModel = require("./models/Users");

app.get("/api/users", (req, res) => {
	// should return users and their game records
	// obviously don't want to return passwords :/
	console.log("Getting users...");

	UserModel.find({}, { password: 0 })
		.exec()
		.then((users) => {
			res.status(200).json({
				message: "Users found successfully",
				users: users,
			});
		});
});

app.post("/api/users", async (req, res, next) => {
	var user = await UserModel.findOne({ name: req.body.name }).exec();

	if (user != null) {
    if(req.body.password == user.password) {
      res.status(200).json({message: "Login successful"});
      return;
    }

		res.status(409).json({
			message: "Username or password is not correct.",
		});
		return;
	}

	const newUser = new UserModel({
		name: req.body.name,
		password: req.body.password,
		wins: 0,
		losses: 0,
		ties: 0,
		createDate: Date.now(),
	});

	console.log(newUser);

	UserModel.create(newUser).then(() => {
		res.status(201).json({
			message: `User ${newUser.name} created successfully`,
		});
	});
});

// username gets the record from the db
// field updates the reqested field
// value increments field by x amount
app.post("/api/records/:username/:field/:value", (req, res, next) => {
	//console.log(`Updating user ${req.params.username}...`);

  var username = req.params.username;
  var field = req.params.field;
  var value = req.params.value;

  switch (field) {
    case "wins":
      UserModel.updateOne({name: username},
        {
          $inc: {
            wins: value
          }
        }).then(() => {res.status(201).json({message: `${username}.wins updated successfully`})});
      break;
    case "losses":
      UserModel.updateOne({name: username},
        {
          $inc: {
            losses: value
          }
        }).then(() => {res.status(201).json({message: `${username}.losses updated successfully`})});
      break;
    case "ties":
      UserModel.updateOne({name: username},
        {
          $inc: {
            ties: value
          }
        }).then(() => {res.status(201).json({message: `${username}.ties updated successfully`})});
      break;
  }
});
