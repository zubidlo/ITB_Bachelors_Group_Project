
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
	
	get_team();
	
		
		get_players();

	
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


function checkSession_view_team()
{



  if(sessionStorage.getItem("username") === null)
 {

  	window.location="../index.html";

 }
	else {
		window.location="my_team.html";


	}	
	
}

function combo()
{
    var element = document.getElementById("combo");
    var ob = element.options[element.selectedIndex].value;
	var selected;


	if(ob == "All")
	{
	
		
				selected=0;
	}
	
	else if(ob == "Attackers")
	{


	
				selected=6;
	}
	
	else if(ob == "Midfielders")
	{
		
		
				selected=5;
	}
		else if(ob == "Defenders")
	{

				selected=2;
		  
	}

		else
	{
	
				selected=1;
	}
$("#table_3").find("tr:gt(0)").remove();
 get_players(selected);
 if(selected==6)
 {
	 get_players(selected+1);
	 get_players(selected+2);
 }
  if(selected==2)
 {
	 get_players(selected+1);
	 get_players(selected+2);
 }
 if(selected==0)
 {
	 get_players(selected+1);
	 get_players(selected+2);
	  get_players(selected+3);
	 get_players(selected+4);
	  get_players(selected+5);
	 get_players(selected+6);
	  get_players(selected+7);
	 get_players(selected+8);
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
	var user_id= sessionStorage.getItem("teamid");
	var user= (user_id+"/players");

	var _url =  "http://hurlingapi.azurewebsites.net/api/teams/id/"+user;
	var overall_points=0;
	var week_points=0;
	var most_expensive=0;
	var overall_best =0;
	var overall_cost=0;
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
				
					overall_cost= overall_cost+object.Price;
					week_points = week_points+object.LastWeekPoints;
					overall_points = overall_points+object.OverallPoints;
					$('#table_1').append(tr);
				
					var img = document.createElement("img");	

					img.src = "../images/jerseys/"+ object.GaaTeam+".png";
					var src = document.getElementById(""+object.PositionId);
					src.appendChild(img);
					document.getElementById("player_name"+object.PositionId).innerHTML = (""+object.LastName);
				var budget_left = 100000-overall_cost;
			
				document.getElementById("details").innerHTML = ("Budget Left: $"+budget_left+" Team Value: $ "+overall_cost);
				

				
					sessionStorage.setItem(""+object.PositionId,""+object.Id);
				

			

					i=i+1;
				});
			}
									if( i <9)
		{
			
			displayInfo2();
			
		}
		}
	});
}
		
		
	
function displayInfo()
{
	
	$("#dialog").text("Click a player to remove from your team, then add a new player in from the table on the right!");
	  $( "#dialog" ).dialog();
}
function displayInfo2()
{
	
	$("#dialog").text("You need to fill the vacant spots!!");
	  $( "#dialog" ).dialog();
}
function displayInfo3()
{
	
	$("#dialog").text("Cannot add player to team");
	  $( "#dialog" ).dialog();
}
function displayInfo4()
{
	
	$("#dialog").text("Player added to team");
	  $( "#dialog" ).dialog();
}
function displayInfo5()
{
	
	$("#dialog").text("Player deleted from the team");
	  $( "#dialog" ).dialog();
}
function get_players(selected)
{

	
var element = document.getElementById("combo");
    var ob = element.options[element.selectedIndex].value;
var element = document.getElementById("amount");
    var oz = element.options[element.selectedIndex].value;

	
	var _url =  "http://hurlingapi.azurewebsites.net/api/players";
	    

	


	$.ajax({
		url: _url,
		async: true,

		success:function(data)
		{
			
			if($.isArray(data)) {
				$.each(data, function(index, object) {
				if(object.PositionId ==selected && object.GaaTeam ==oz)
				{
					var tr;
				var removeRow=document.createElement("BUTTON");
				 
					tr = $('<tr/>');
					tr.append("<td>" + object.PositionId + "</td>");
					tr.append("<td >" + object.LastName + "</td>");
					tr.append("<td>" + object.GaaTeam + "</td>");
					tr.append("<td>" + object.LastWeekPoints + "</td>");
					tr.append("<td>" + object.OverallPoints + "</td>");
					tr.append("<td>" + object.Rating + "</td>");
					tr.append("<td>" + object.Price + "</td>");

 var id = object.Id;
					removeRow.innerHTML = "Add";
					$('#table_3').append(tr);
					tr.append(removeRow);
					    $('#table_3').tablesorter;
					
			
removeRow.setAttribute('onclick', 'button("'+id+'")');
		
			
			removeRow.className = "button";

				}
				



	 
				});
			}
			
		}
		
			
	});
	 
}


function button(id)
{
var type = "PUT";
var user_id= sessionStorage.getItem("teamid");

		

	var _url = "http://hurlingapi.azurewebsites.net/api/teams/id/"+user_id+"/player/id/"+id;
	
		
		$.ajax({
		type: type,
		url: _url,
		async: true,

		success:function(data)
		{
			   displayInfo4();
			setTimeout(function() { location.reload() },600);
		},
   error: function() {
           displayInfo4();
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
		
			function readUserFromInputFields2() {
			
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




	function post_message() {
			$("#table_2").find("tr:gt(0)").remove();
				$.ajax({
	            type: "POST",
	            url: "http://hurlingapi.azurewebsites.net/api/messages",
	            data: readUserFromInputFields2(),
	            dataType: "json",
	            success: function (data) {
	            	
	            	
	            	 	clear_text_area();
	            	set_table2();
			

	        	},
	        	error : function (request, textStatus, errorThrown) {
	        	
	        	}
			});
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


function show_message(player_postion_id)
{
	
	delete_player(player_postion_id);
}

function delete_player(player_postion_id)
{
	


var type = "DELETE";
var user_id= sessionStorage.getItem("teamid");


		var item = sessionStorage.getItem(""+player_postion_id);
		

	var _url = "http://hurlingapi.azurewebsites.net/api/teams/id/"+user_id+"/player/id/"+item;
	
		
		$.ajax({
		type: type,
		url: _url,
		async: true,

		success:function(data)
		{
		
			sessionStorage.removeItem(""+player_postion_id);
			   displayInfo5();
			setTimeout(function() { location.reload() },600);
		}
	});
}


	function put_new_team() {
				
			
		
	
				$.ajax({
	            type: "POST",
	            url: "http://hurlingapi.azurewebsites.net/api/teams",
	            data: readUserFromInputFields(),
	            dataType: "json",
	            success: function (data) {
	            	
	            alert("created new team");
				location.reload();
					

	        	},
	        	error : function (request, textStatus, errorThrown) {
	        		
	        	
	        	}
			});
		}

				function readUserFromInputFields() {
			var name = sessionStorage.getItem("username");
			var name2 = name+''+sessionStorage.getItem("id"); 
			var user = {
				Id : sessionStorage.getItem("id"),
				Name : name2,
				OverAllPoints : 0,
				LastWeekPoints : 0,
				Budget : 100000,
				LeagueId : 1,
				UserId : sessionStorage.getItem("id")
			};

			return user;
		}

function get_team()
{
	
var user = sessionStorage.getItem("id");
	
	 var _url =  "http://hurlingapi.azurewebsites.net/api/teams";

	
var i=0;

	$.ajax({
		url: _url,
		async: true,

		success:function(data)
		{
			
			if($.isArray(data)) {
				$.each(data, function(index, object) {
		
		
			if(object.UserId == user)
			{
				
				sessionStorage.setItem("teamid",""+object.Id);
						set_table2();
						set_table();
						i++;
			}
			
			else if (object.UserId != user){
				if(sessionStorage.getItem("teamid") ==null)
				{
					
					
				
				}
			}
		
				
			


	 
				});
			}
			
		}
		
		
		
		
			
	});
	 if(i ==0)
		{
			put_new_team();
		}
}