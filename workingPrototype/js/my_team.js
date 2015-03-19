
/*


 HTML files used in:
 my_team.html

*/


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



function set_user()
{


	  if(sessionStorage.getItem("username") === null)
 {

  	window.location="../index.html";

 }
	else {
			var user = sessionStorage.getItem("username");
	

   document.getElementById("demo").innerHTML = ("You are logged in as "+user);
     

 set_table();
	}	
 





}




function checkSession_home()
{



  if(sessionStorage.getItem("username") === null)
 {

  	window.location="../index.html";

 }
	else {
		window.location="home.html";
	

	}	
	
}





function checkSession_see_rankings()
{



  if(sessionStorage.getItem("username") === null)
 {

  	window.location="../index.html";

 }
	else {
		window.location="standings.html";
	

	}	
	
}

function checkSession_transfers()
{

  if(sessionStorage.getItem("username") === null)
 {

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
            $('table').append(tr);
            $("#myTable").tablesorter();  
			var img = document.createElement("img");	
			
		
			img.src = "../images/jerseys/"+ object.GaaTeam+".png";
			var src = document.getElementById(""+object.PositionId);
			src.appendChild(img);
			document.getElementById("player_name"+object.PositionId).innerHTML = (""+object.LastName);
			
			document.getElementById("team_info_box").innerHTML = ("Overall Points "+overall_points);
			document.getElementById("points_week_info_box").innerHTML = ("Week Points = "+week_points);
		
			sessionStorage.setItem(""+i,""+object.Id);
			var item = sessionStorage.getItem(""+i);
	
			if(object.Price>most_expensive)
			{
				most_expensive=object.Price;
			    document.getElementById("top_value_player_info_box").innerHTML = ("Most Expensive: £"+most_expensive+"  "+object.FirstName+" "+object.LastName);
			}
			
			if(object.OverallPoints>overall_best)
			{
				overall_best=object.OverallPoints;
				document.getElementById("top_player_info_box").innerHTML = ("Top Player: "+overall_best+" Points "+object.FirstName+" "+object.LastName);
			}
			
	
		
			i=i+1;
			
    });
  }

            }

                    
                
    });

		}
		


function checkSession_user_profile()
{

  if(sessionStorage.getItem("username") === null)
 {

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

