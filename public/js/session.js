



function logoutClicked(){
	$.get("/logout",function(data){
		window.location = data.redirect;
	});
	return false;
}

function readClicked(){
  if ($("#ident").val() == "") {
    $.ajax({
      url: "/read",
      type: "GET",
      success: function(data){
        console.log('success');
        if (!data)
            alert("ERROR data");
        else {

          $("#list").empty();

          for (let i=0;i<data.length;i++) {
             $("#list").append("<li>" + data[i].ident + " " + data[i].name + "</li>");
          }

        }
      },
      dataType: "json"
    });
  } else {
    $.ajax({
      url: "/read/" + $("#ident").val(),
      type: "GET",
      success: function(data){
        if (!data)
            alert("ERROR data");
        else
            $("#name").val(data.name);
      },
      dataType: "json"
    });
  }
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
        else
          alert("CREATE VALID");
      } ,
      dataType: "json"
    });
    return false;
}

function updateClicked(){

    if ($("#ident").val() == "") {
      alert("ERROR");
      return false;
    }
    $.ajax({
    url: "/update",
    type: "PUT",
    data: {ident:Number($("#ident").val()) , name:$("#name").val()},
    success: function(data){
        if (!data)
          alert("ERROR");
        else
          alert("UPDATE VALID");
      } ,
    dataType: "json"
  });
    return false;
}


function deleteClicked(){
    $.ajax({
      url: "/delete/" + Number($("#ident").val()),
      type: "DELETE",
      success: function(data) {
        if (!data)
          alert("NO DELETE");
        else
          alert("GOOD DELETE");
      } ,
      dataType: "json"
    });
    return false;
}


$(document).ready(function(){

	$.get("/userInfo",function(data){
		if (data.username)
			$("#session").html("Session " + data.username);
	});

	$("#logout").click(logoutClicked);

  $("#name").keydown( function( event ) {
          if ( event.which === 13 ) {
            createClicked();
            event.preventDefault();
            return false;
          }
      });

      $("#ident").keydown( function( event ) {
          if ( event.which === 13 ) {
            readClicked();
            event.preventDefault();
            return false;
          }
      });

      $("#readButton").click(readClicked);
      $("#createButton").click(createClicked);
      $("#updateButton").click(updateClicked);
      $("#deleteButton").click(deleteClicked);

});
