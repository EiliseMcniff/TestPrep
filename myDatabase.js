var mongoose = require('mongoose');
var Team = require("./models/teamname.js");

let myDatabase = function() {
	this.infoList = [];
}

myDatabase.prototype.getArraySize = function() {
	return this.infoList.length;
}

myDatabase.prototype.getAllObjects = function(res) {
	Team.find({},function(error,info) {
		if (error) {
			res.json(null);
		} else {
			let objs = [];
			for (let i=0;i<info.length;i++) {
			  objs.push({username:info[i].username,location:info[i].location,name:info[i].name});
			}
			res.json(objs);
		}
	});
}
myDatabase.prototype.getAllObjectsofUser = function(res,username) {
	Team.find({},function(error,info) {
		if (error) {
			res.json(null);
		} else {
			let objs = [];
			for (let i=0;i<info.length;i++) {
				if(info[i].username == username)
			  objs.push({username:info[i].username,
									location:info[i].location,
									name:info[i].name,
									lable:info[i].lable});
			}
			res.json(objs);
		}
	});
}

myDatabase.prototype.getObjectWithID = function(res,ident) {
	Team.find({ident:ident},function(error,info) {
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
	console.log("in database");
	Team.create(obj,function(error,info) {
			if (error) {
					 res.json(null);
			}

			res.json(obj);
	});
}


//add or modify.  Complete changeObject function.
myDatabase.prototype.changeObject = function(res,username,name) {
	Team.findOneAndUpdate({username:username},{name:name},function(error,info) {
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
	Team.remove({username:username},function(error,removed) {
			if (error) {
					 res.json(null);
			}
			 res.json(removed.result);
	});
}


module.exports = myDatabase;
