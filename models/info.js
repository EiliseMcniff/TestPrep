var mongoose = require("mongoose");

var userSchema =  mongoose.Schema({
	ident: {
		required: true,
		unique: true,
		type:String
	},
	name: String
});

var Info = mongoose.model('Info', userSchema);

module.exports = Info;
