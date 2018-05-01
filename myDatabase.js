var mongoose = require('mongoose');
var User = require('./models/Info.js');
mongoose.connect('mongodb://localhost/mongooseExample');

let myDatabase = function() {
	this.infoList = [];
}

myDatabase.prototype.getArraySize = function() {
	return this.infoList.length;
}

//add or modify.  Complete getAllObjects function.
myDatabase.prototype.getAllObjects = function(res) {
	User.find({},function(error,info) {
		if (error) {
			res.json(null);
		} else {
			let objs = [];
			for (let i=0;i<info.length;i++) {
			  objs.push({ident:info[i].ident,name:info[i].name});
			}
			res.json(objs);
		}
	});
}

myDatabase.prototype.getObjectWithID = function(res,ident) {
	User.find({ident:ident},function(error,info) {
			if (error) {
					res.json (null);
			}
			else if (info == null) {
					res.json (null);
			}
			if (info.length == 1)
			{
				res.json({ name: info[0].name });
			}
			else
			{
					res.json (null);
			}
	 });

}

myDatabase.prototype.addObject = function(res,obj) {
	User.create(obj,function(error,info) {
			if (error) {
					 res.json(null);
			}

			res.json(info);
	});
}


//add or modify.  Complete changeObject function.
myDatabase.prototype.changeObject = function(res,ident,name) {
	User.findOneAndUpdate({ident:ident},{name:name},function(error,info) {
	          if (error) {
	               res.json(null);
	          }
	          else if (info == null) {
	               res.json(null);
	          }
	           res.json(info);
	      });
}


//add or modify.  Complete deleteObjectWithID function.
myDatabase.prototype.deleteObjectWithID = function(res,ident) {
	User.remove({ident:ident},function(error,removed) {
			if (error) {
					 res.json(null);
			}
			 res.json(removed.result);
	});
}


module.exports = myDatabase;
