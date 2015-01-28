
/*
 This file is for the home page Initially it gets the items in storage
 It also checks to see if the session still exists every time the user tries to 
 navigate away from here to another page.
 If it does not, user is sent to the login (index.html) page to log back in.

 HTML files used in:
 home.html

*/

function setStorage() 
{

  if(sessionStorage.getItem("username") === null)
 {

  	window.location="../index.html";

 }
	else {
			var user = sessionStorage.getItem("username");
	

   document.getElementById("demo").innerHTML = ("You are logged in as "+user);
	

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

function jump_to_user_page()
{

  	window.location="user_profile.html";
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