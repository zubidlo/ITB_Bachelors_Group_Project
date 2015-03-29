
/*


 HTML files used in:
 my_team.html

*/


function checkSession_forum()
{
	if(sessionStorage.getItem("username") === null)	{
		window.location="../index.html";
	}
	else {
		window.location="forum.html";
	}	
}

function set_user()
{
  	if(sessionStorage.getItem("username") === null)	{
		window.location="../index.html";
	}
	else {
		var user = sessionStorage.getItem("username");
		document.getElementById("demo").innerHTML = ("You are logged in as "+user);
		set_table();
		set_table2();
		set_team();
	}	
}

function checkSession_home()
{
	if(sessionStorage.getItem("username") === null)	{
		window.location="../index.html";
	}
	else {
		window.location="home.html";
	}	
}

function checkSession_see_rankings()
{
	if(sessionStorage.getItem("username") === null)	{
		window.location="../index.html";
	}
	else {
		window.location="standings.html";
	}	
}

function checkSession_transfers()
{
	if(sessionStorage.getItem("username") === null)	{
		window.location="../index.html";
	}
	else {
		window.location="transfers.html";
	}	
}

function logout_user()
{
	sessionStorage.clear();
	window.location="../index.html";
}

function set_table()
{
	var i=1;
	var user_id= sessionStorage.getItem("id");
	var user= (user_id+"/players");

	var _url =  "http://hurlingapi.azurewebsites.net/api/teams/id/"+user;
	var overall_points=0;
	var week_points=0;
	var most_expensive=0;
	var overall_best =0;

	$.ajax({
		url: _url,
		async: true,

		success:function(data)
		{
			if($.isArray(data)) {
				$.each(data, function(index, object) {
					var tr;
				
					tr = $('<tr/>');
					tr.append("<td>" + object.PositionId + "</td>");
					tr.append("<td>" + object.LastName + "</td>");
					tr.append("<td>" + object.GaaTeam + "</td>");
					tr.append("<td>" + object.LastWeekPoints + "</td>");
					tr.append("<td>" + object.OverallPoints + "</td>");
					tr.append("<td>" + object.Rating + "</td>");
					tr.append("<td>" + object.Price + "</td>");

					week_points = week_points+object.LastWeekPoints;
					overall_points = overall_points+object.OverallPoints;
					$('#table_1').append(tr);
					$("#table_1").tablesorter();  
					var img = document.createElement("img");	

					img.src = "../images/jerseys/"+ object.GaaTeam+".png";
					var src = document.getElementById(""+object.PositionId);
					src.appendChild(img);
					document.getElementById("player_name"+object.PositionId).innerHTML = (""+object.LastName);

	
	
					
					

					if(object.Price>most_expensive){
					most_expensive=object.Price;
					document.getElementById("top_value_player_info_box").innerHTML = ("Most Expensive: £"+most_expensive+"  "+object.FirstName+" "+object.LastName);
					}

					if(object.OverallPoints>overall_best){
					overall_best=object.OverallPoints;
					document.getElementById("top_player_info_box").innerHTML = ("Top Player: "+overall_best+" Points "+object.FirstName+" "+object.LastName);
					}
					sessionStorage.setItem(""+object.PositionId,""+object.Id);
					i=i+1;
				});
			}
		}
	});
}


function set_team()
{
	var i=1;
	var user_id= sessionStorage.getItem("id");
	

	var _url =  "http://hurlingapi.azurewebsites.net/api/teams/id/"+user_id;


	$.ajax({
		url: _url,
		async: true,

		success:function(data)
		{
			

					document.getElementById("team_info_box").innerHTML = ("Overall Points "+data.OverAllPoints);
					document.getElementById("points_week_info_box").innerHTML = ("Week Points = "+data.LastWeekPoints);

				
		}
	});
}
		


function checkSession_user_profile()
{
	if(sessionStorage.getItem("username") === null)	{
		window.location="../index.html";
	}
	else {
		window.location="user_profile.html";
	}	
}

function get_player(position)
{
	var player_id =sessionStorage.getItem(""+position);
	display_player(""+player_id);
}

		
function display_player(player_id)
{
	var img = document.createElement("img");	
	var _url =  "http://hurlingapi.azurewebsites.net/api/players/Id/"+player_id;

	$.ajax({
		url: _url,
		success: function (data) {

			$('#player_image_box').empty();
			img.src = "../images/jerseys/"+ data.GaaTeam+".png";
			var src = document.getElementById("player_image_box");
			src.appendChild(img);
			document.getElementById("player_info_box").innerHTML = (data.FirstName+" "+data.LastName);
			document.getElementById("player_team_box").innerHTML = (" "+data.GaaTeam);
			document.getElementById("player_week_points_box").innerHTML = (" " +data.LastWeekPoints);
			document.getElementById('info_container').style.top="-100px";
			document.getElementById('info_container').style.left="450px";
		}

	});
}

function return_container()
{
	document.getElementById('info_container').style.top="60px";
	document.getElementById('info_container').style.left="760px";
}

		
function set_table2()
{
       	
	var user = sessionStorage.getItem("username");


    var _url =  "http://hurlingapi.azurewebsites.net/api/messages?$orderby=Created desc&$top=3&$skip=0";


$.ajax({
        url: _url,
        async: true,
       
        success:function(data)
        {

if($.isArray(data)) {
    $.each(data, function(index, object) {
		

		var user = return_username(object.UserId);
         var tr;
		 return_username(object.UserId);
		 var user = sessionStorage.getItem("temp");
            tr = $('<tr/>');
         
      		tr.append("<td>" + user + "</td>");
				var user = sessionStorage.getItem("temp");
            tr.append("<td>" + object.Text + "</td>");
       
        	

           sessionStorage.removeItem("temp");
            $('#table_2').append(tr);
           
    });
  }

            }

                    
                
    });

		}
		
			function readUserFromInputFields() {
			
			var id = sessionStorage.getItem("id");
			
			var text =  document.getElementById("forum_post_area").value;
			var now = new Date();
		now=new Date().toLocaleString();

			var user = {
				Id : id,
				Text : text,
				UserId : id,
				Created  : now
				
			};

			return user;
		}

function checkSession_standings()
{



  if(sessionStorage.getItem("username") === null)
 {

  	window.location="../index.html";

 }
	else {
		window.location="standings.html";
	

	}	
	
}


function checkSession_forum()
{

  if(sessionStorage.getItem("username") === null)
 {

  	window.location="../index.html";

 }
	else {
		window.location="forum.html";


	}	

}


	function post_message() {
			
				$.ajax({
	            type: "POST",
	            url: "http://hurlingapi.azurewebsites.net/api/messages",
	            data: readUserFromInputFields(),
	            dataType: "json",
	            success: function (data) {
	      
	     
	            	clear_text_area();
	            	location.reload();

	
			set_table2();

	        	},
	        	error : function (request, textStatus, errorThrown) {
	        		
	        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
	        	}
			});
		}
$( "#table_2" ).draggable({
  appendTo: "body"
});

function clear_text_area()
{

document.getElementById("forum_post_area").value = "";

set_table();

location.reload();
}

function clear_text_area()
{

document.getElementById("forum_post_area").value = "";


}



function return_username(userId)
{
	
	
var _url =  "http://hurlingapi.azurewebsites.net/api/users";

			event.preventDefault();
			$.ajax({
				async: false,
	            url: _url + "/Id/" + userId,
	            success: function (data, textStatus, request) {
	            	
			
				sessionStorage.setItem("temp",data.Username);
			
		
		

	        	}
			});
			
			

}



