


var username;
function logoutClicked(){
	$.get("/logout",function(data){
		window.location = data.redirect;
	});
	return false;
}

function createClicked(){
				var str = $("#name").val();
				var arr = [];
				arr = str.split('-');
				$.ajax({
					url: "/create",
					type: "POST",
					data: {username:username,location:arr[0], name:arr[1],lable:str},
					success: function(data){
						if (!data)
							alert("ERROR");
						else if(!data.name)
						window.location = data.redirect;
						else
						{
							alert("CREATE VALID");
								$("#player").append("<option>" + data.lable +  "</option>");
							}
					} ,
					dataType: "json"
				});
				return false;
		}
function displayClicked(){

var str = $("#player").val();
var arr = [];
arr = str.split('-');
						$.ajax({
							url: "/requestNBA",
							type: "GET",
							data: {teamname:arr[1]},
							success: function(data){
								if (!data)
									alert("ERROR");
								else if(!data.info)
								window.location = data.redirect;
								else
								$("#playerStats").empty();





				for (let i=0;i<data.info.length;i++) {
						console.log(data.info[i]);
						if(data.info[i].player.Height)
						{
							if(data.info[i].player.IsRookie == "true")
							{
								$("#playerStats").append("<li>"  + data.info[i].player.FirstName  +
																 " " + data.info[i].player.LastName  +
																 " " + data.info[i].player.Height + " R " +"</li>");
							}
							else {
								$("#playerStats").append("<li>"  + data.info[i].player.FirstName  +
																 " " + data.info[i].player.LastName  +
																 " " + data.info[i].player.Height + "</li>");
							}

						}
        }
							} ,
							dataType: "json"
						});

}

$(document).ready(function(){
var username1;
	$.get("/userInfo",function(data){
		if (data.username)
			$("#session").html("Session " + data.username);
			username = data.username;
			$.post("/userTeamname",{username:data.username},function(data){
				  $("#player").empty();
				for (let i=0;i<data.length;i++) {
						console.log(data[i].lable);
						$("#player").append("<option>" + data[i].lable +  "</option>");
				}


			});
	});

	$("#name").keydown( function( event ) {
					if ( event.which === 13 ) {
						createClicked();
						event.preventDefault();
						return false;
					}
			});
  $("#createButton").click(createClicked);
	$("#displayButton").click(displayClicked);
	$("#logout").click(logoutClicked);

});
