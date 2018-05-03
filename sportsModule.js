var MAX_PLAYERS = 10;
var Client = require('node-rest-client').Client;

var client = new Client();

var args = {
    port: '443',
    headers: { "User-Agent": "node " + process.version }
};

client.registerMethod("getNBATeams",
"https://www.mysportsfeeds.com/api/feed/pull/nba/2017-2018-regular/overall_team_standings.json", "GET");

client.registerMethod("getNBAPlayer",
"https://www.mysportsfeeds.com/api/feed/pull/nba/2017-2018-regular/cumulative_player_stats.json", "GET");

client.registerMethod("getNBAPlayers",
"https://www.mysportsfeeds.com/api/feed/pull/nba/2017-2018-regular/active_players.json", "GET");


module.exports = function (username, password) {
    args.headers["Authorization"] = "Basic " + Buffer.from(username + ':' + password).toString('base64');
}

///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
module.exports["NBA"] = {
    getNBATeams: function (teamname, fn) {
    client.methods.getNBATeams(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);
        var obj = data.overallteamstandings.teamstandingsentry;
        //obj.length = MAX_PLAYERS;
          var returnObj = undefined;
        obj.forEach(function(users){
          if(users.team){
            if(users.team.Name.toLowerCase() == teamname.toLowerCase())
            {
                  returnObj = users;
            }
          }

        });
            fn(false, returnObj);
        });
    },  checkifTeam: function (name, fn) {
      client.methods.getNBATeams(args, function (data, response) {
              if (response.statusCode !== 200) return fn(response.statusCode);
          var obj = data.overallteamstandings.teamstandingsentry;
          //obj.length = MAX_PLAYERS;
            var returnObj = false;
          obj.forEach(function(users){
            if(users.team){
              if(users.team.Name.toLowerCase() == name.toLowerCase())
              {
                    returnObj = true;
              }
            }

          });
              fn(false, returnObj);
          });
      },
     getNBAPlayer: function ( firstname,lastname,fn) {
       client.methods.getNBAPlayers(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

        var obj = data.activeplayers.playerentry;
        var returnObj = undefined;
        obj.forEach(function(users){

          if(users.player){
            if(users.player.FirstName.toLowerCase() == firstname.toLowerCase())
            {
              if(users.player.LastName.toLowerCase() == lastname.toLowerCase())
              {
                  returnObj = users;
              }
            }
          }

        });
            fn(false, returnObj);
        });
    },
    getNBAPlayerStats: function ( firstname,lastname,fn) {
       client.methods.getNBAPlayer(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

        var obj = data.cumulativeplayerstats.playerstatsentry;
        var returnObj = undefined;
        obj.forEach(function(users){

          if(users.player){
            if(users.player.FirstName.toLowerCase() == firstname.toLowerCase())
            {
              if(users.player.LastName.toLowerCase() == lastname.toLowerCase())
              {

                  returnObj = users;
              }
            }
          }

        });
            fn(false, returnObj);
        });
    },
     getNBAPlayers: function ( teamname,fn) {
       client.methods.getNBAPlayers(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);
        var obj = data.activeplayers.playerentry;
        var returnObject = [];
        obj.forEach(function(users){
          if(users.team)
          {
            if(users.team.Name.toLowerCase() == teamname.toLowerCase())
            {
                  returnObject.push(users);
            }
          }

        });
         fn(false, returnObject);
        });
    }
}
