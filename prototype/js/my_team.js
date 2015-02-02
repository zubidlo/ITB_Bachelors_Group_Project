
/*


 HTML files used in:
 my_team.html

*/







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
            tr.append("<td>" + object.FirstName + "</td>");
            tr.append("<td>" + object.LastName + "</td>");
            tr.append("<td>" + object.GaaTeam + "</td>");
            tr.append("<td>" + object.LastWeekPoints + "</td>");
            tr.append("<td>" + object.OverallPoints + "</td>");
			tr.append("<td>" + object.Rating + "</td>");
            tr.append("<td>" + object.Price + "</td>");

          
            

        
            $('table').append(tr);
            $("#myTable").tablesorter();  
			var img = document.createElement("img");	
			
		
			img.src = "../img/"+ object.GaaTeam+".png";
			var src = document.getElementById(""+object.PositionId);
			src.appendChild(img);
			document.getElementById("player_name"+object.PositionId).innerHTML = (""+object.LastName);
	
		
		
			sessionStorage.setItem(""+i,""+object.Id);
			var item = sessionStorage.getItem(""+i);
			//item 1 will be the player id in that position
			//item 2 player id in that position...so on
		
			i=i+1;
			
    });
  }

            }

                    
                
    });

		}
		


		function get_player(position)
		{
			var player_id =sessionStorage.getItem(""+position);
		
			display_player(""+player_id);
		
		
		
		}

		
function display_player(player_id)
{
	

   $('#player_image_box').empty();


	var img = document.createElement("img");	
	
    var _url =  "http://hurlingapi.azurewebsites.net/api/players/Id/"+player_id;

				
			$.ajax({
	            url: _url,
	            success: function (data) {
				        
			
		
			img.src = "../img/user_image.png";
			var src = document.getElementById("player_image_box");
			
			src.appendChild(img);
			
		    document.getElementById("player_info_box").innerHTML = (data.FirstName+" "+data.LastName);
			document.getElementById("player_team_box").innerHTML = (" "+data.GaaTeam);
			document.getElementById("player_week_points_box").innerHTML = (" " +data.LastWeekPoints);
			
	        	}
	        	
			});
	        

}
	