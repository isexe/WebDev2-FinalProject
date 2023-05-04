const mongoose = require('mongoose')

const { Schema, model } = mongoose;

const usersSchema = new Schema({
	name: String,
	password: String,
	wins: Number,
	losses: Number, 
	ties: Number,
	createDate: Date,
});

module.exports = model("Users", usersSchema);
