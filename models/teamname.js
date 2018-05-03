var mongoose = require("mongoose");

var userSchema =  mongoose.Schema({
	username: {
		required: true,
		unique: false,
		type:String
	},
	location : String,
	name: {
		required: true,
		unique: true,
		type:String
	},
	lable:String
});

var Teamname = mongoose.model('Teamname', userSchema);

module.exports = Teamname;
