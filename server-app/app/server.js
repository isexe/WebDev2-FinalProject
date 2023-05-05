// creates express webapp on port 3000
const express = require("express");
const bcrypt = require("bcrypt");
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

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE, OPTIONS"
	);
	console.log("Middleware");
	next();
});

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
	console.log(req.body);
	if (req.body == undefined || req.body == null) {
		res.status(400).json({ message: "Body message was undefined" });
		return;
	}
	var user = await UserModel.findOne({ name: req.body.name }).exec();

	if (user != null) {
		bcrypt.compare(
			req.body.password,
			user.password,
			function (err, result) {
				if (result) {
					res.status(200).json({ message: "Login successful", status: 200 });
				} else {
					res.status(409).json({
						message: "Username or password is not correct.",
					});
				}
			}
		);
		return;
	}

	bcrypt.hash(req.body.password, 10, function (err, hash) {
		const newUser = new UserModel({
			name: req.body.name,
			password: hash,
			wins: 0,
			losses: 0,
			ties: 0,
			createDate: Date.now(),
		});

		UserModel.create(newUser).then(() => {
			res.status(200).json({
				message: `User ${newUser.name} created successfully`,
				status: 200
			});
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
			UserModel.updateOne(
				{ name: username },
				{
					$inc: {
						wins: value,
					},
				}
			).then(() => {
				res.status(201).json({
					message: `${username}.wins updated successfully`,
				});
			});
			break;
		case "losses":
			UserModel.updateOne(
				{ name: username },
				{
					$inc: {
						losses: value,
					},
				}
			).then(() => {
				res.status(201).json({
					message: `${username}.losses updated successfully`,
				});
			});
			break;
		case "ties":
			UserModel.updateOne(
				{ name: username },
				{
					$inc: {
						ties: value,
					},
				}
			).then(() => {
				res.status(201).json({
					message: `${username}.ties updated successfully`,
				});
			});
			break;
	}
});
