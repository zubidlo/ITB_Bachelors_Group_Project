
/*

Standings will first load up the username 
It will show up the top 10 users based on points
It will check each time a user tries to navigate away that a session
is stored in session storage
If it is not, it brings you back to the login page

 HTML files used in:
 standings.html

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
show_team();
set_table2();
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



function logout_user()
{

sessionStorage.clear();
  window.location="../index.html";

}


function set_table()
{

    var i=1;
  //  var _url = "http://hurlingapi.azurewebsites.net/api/teams?$orderby=LastWeekPoints";
    var _url =  "http://hurlingapi.azurewebsites.net/api/teams?$orderby=OverAllPoints desc&$top=10&$skip=0";


$.ajax({
        url: _url,
        async: true,
       
        success:function(data)
        {

if($.isArray(data)) {
    $.each(data, function(index, object) {
         var tr;
       
            tr = $('<tr/>');
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + object.Name + "</td>");
            tr.append("<td>" + object.LastWeekPoints + "</td>");
            tr.append("<td>" + object.OverAllPoints + "</td>");
        

            i++;
            $('#table_1').append(tr);
          
            $("#table_1").tablesorter();   
    });
  }


            }

                    
                
    });

		}



function show_team()
{
var user_id= sessionStorage.getItem("id");
var i =0;

  var _url =  "http://hurlingapi.azurewebsites.net/api/teams?$orderby=OverAllPoints desc&$top=10&$skip=0";

 


$.ajax({
        url: _url,
        async: true,
       
        success:function(data)
        {
if($.isArray(data)) {
    $.each(data, function(index, object) {
		
         var tr;
			i++;
			
			if(object.UserId==user_id)
			{
				
				var my_position=i;
		
				document.getElementById("team_position").innerHTML = ("Your Position "+my_position);
			
			}
			
				
			
       
           

          
         
		
		
		
		
			
    });
  }




            }

                    
                
    });

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
			

	        	},
	        	error : function (request, textStatus, errorThrown) {
	        		
	        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
	        	}
			});
		}


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


	
