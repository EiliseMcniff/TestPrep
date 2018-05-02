



function logoutClicked(){
	$.get("/logout",function(data){
		window.location = data.redirect;
	});
	return false;
}

function createClicked(){
				if ($("#ident").val() == "") {
					alert("ERROR");
					return false;
				}

				$.ajax({
					url: "/create",
					type: "POST",
					data: {ident:Number($("#ident").val()), name:$("#name").val()},
					success: function(data){
						if (!data)
							alert("ERROR");
						else if(!data.ident)
						window.location = data.redirect;
						else
							alert("CREATE VALID");
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
							data: {firstname:arr[0],lastname:arr[1]},
							success: function(data){
								if (!data)
									alert("ERROR");
								else if(!data.info.player.FirstName)
								window.location = data.redirect;
								else
								$("#playerStats").empty();

				console.log(data.info);
				console.log(data.info.stats.Pts);


				 $("#playerStats").append("<li>" + data.info.player.FirstName + " " +
																					data.info.player.LastName +	 " = " +
														 							data.info.stats.Pts['#text'] + "</li>");
							} ,
							dataType: "json"
						});

}

$(document).ready(function(){

	$.get("/userInfo",function(data){
		if (data.username)
			$("#session").html("Session " + data.username);
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
