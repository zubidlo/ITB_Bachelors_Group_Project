
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
            
            tr.append("<td>" + object.Id + "</td>");
            tr.append("<td>" + object.FirstName + "</td>");
            tr.append("<td>" + object.LastName + "</td>");
            tr.append("<td>" + object.GaaTeam + "</td>");
            tr.append("<td>" + object.LastWeekPoints + "</td>");
            tr.append("<td>" + object.OverallPoints + "</td>");
            tr.append("<td>" + object.Price + "</td>");
            tr.append("<td>" + object.Rating + "</td>");
            tr.append("<td>" + object.Injured + "</td>");
            tr.append("<td>" + object.PositionId + "</td>");

        
            $('table').append(tr);
            $("#myTable").tablesorter();  
			var img = document.createElement("img");	
			
		
			img.src = "../img/"+ object.GaaTeam+".png";
			var src = document.getElementById(""+object.PositionId);
			src.appendChild(img);
			document.getElementById("player_name"+object.PositionId).innerHTML = (""+object.LastName);
		
		
			
			i=i+1;
    });
  }

            }

                    
                
    });

		}
		



		

		
		
		