var express = require("express");
var passport = require("passport");
var path = require("path");
var sports = require('./sportsModule');
sports('mvhscs1', 'Asdfghjk!1');
var User = require("./models/user");

var router = express.Router();
const myDatabase = require('./myDatabase');

let db = new myDatabase();

//function ensureAuthenticated(req, res, next) {
//  if (req.isAuthenticated()) {
//    next();
//  } else {
//    req.flash("info", "You must be logged in to see this page.");
//    res.redirect("/login");
//  }
//}

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});






router.get("/successroot", function(req, res) {
console.log("get successroot");
	res.json({redirect:"/"});
});

router.get("/failroot", function(req, res) {
console.log("get failroot");
	res.json({redirect:"/login"});
});

router.get("/successsignup", function(req, res) {
console.log("get successsignup");
	res.json({redirect:"/session"});
});

router.get("/failsignup", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/login"});
});

router.get("/successlogin", function(req, res) {
console.log("get successsignup");
	res.json({redirect:"/session"});
});
router.get("/faillogin", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/login"});

});



router.get("/", function(req, res, next) {
console.log("1");
	let thePath = path.resolve(__dirname,"public/views/login.html");
	res.sendFile(thePath);

 // User.find()
 // .sort({ createdAt: "descending" })
 // .exec(function(err, users) {
 //   if (err) { return next(err); }
 //   res.render("index", { users: users });
 // });
});


router.get("/signup", function(req, res) {
console.log("get signup");

	let thePath = path.resolve(__dirname,"public/views/signup.html");
	res.sendFile(thePath);

});

router.get("/login", function(req, res) {
console.log("get login");

	let thePath = path.resolve(__dirname,"public/views/login.html");
	res.sendFile(thePath);

});
//////////////////////////////////////////////////////////
router.post('/create', function(req, res){
  if(req.isAuthenticated())
  {
  	if (req.body.username == "") {
  		res.json(null);
  		return;
  	}
    db.addObject(res,{username:req.body.username,
                      location:req.body.location,
                      name:req.body.name,
                      lable:req.body.lable});
  }else {
    req.logout();
    res.json({redirect:"/login"});
  }


});
router.get("/requestNBA", function(req, res, next) {
  if(req.isAuthenticated())
  {
	sports.NBA.getNBAPlayers( req.query.teamname,function (err, obj) {
    		if (err) {
        		return console.log('Error occurred active_players: ' + err);
    		}

		res.json({"info":obj});
	});
}else {
  req.logout();
  res.json({redirect:"/login"});
}
});
////////////////////////////////////////////////
router.get("/session", function(req, res) {
  console.log("get session");
  if (req.isAuthenticated()) {
	let thePath = path.resolve(__dirname,"public/views/session.html");
	res.sendFile(thePath);
  } else {
  	let thePath = path.resolve(__dirname,"public/views/login.html");
	res.sendFile(thePath);
  }
});

router.get("/userInfo",function(req,res){
     if (req.isAuthenticated()) {
		res.json({username:req.user.username});
	}
	else {
		res.json(null);
	}
});
router.post("/userTeamname",function(req,res){
  console.log(req.body.username);
     if (req.isAuthenticated()) {
       db.getAllObjectsofUser(res,req.body.username);

	}
	else {
		res.json(null);
	}
});




router.get("/logout", function(req, res) {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect("/successroot");
  } else {
    res.redirect("/failroot");
  }
});

router.post("/signup", function(req, res, next) {
console.log("post signup");

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/failsignup");
    }
console.log("post signup1");

    var newUser = new User({
      username: username,
      password: password
    });
console.log("post signup2");

    newUser.save(next);    //this line has to be called.
console.log("post signup done");

  });


}, passport.authenticate("login", {
  successRedirect: "/successsignup",
  failureRedirect: "/failsignup",
  failureFlash: true
}));




router.post("/login", passport.authenticate("login", {
  successRedirect: "/successlogin",
  failureRedirect: "/faillogin",
  failureFlash: true
}));

module.exports = router;
