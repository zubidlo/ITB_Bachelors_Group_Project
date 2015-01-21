
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
	var user = sessionStorage.getItem("username");
   document.getElementById("demo").innerHTML = ("You are logged in as "+user);
}




function checkSession_view_team()
{



  if(sessionStorage.getItem("username") === null)
 {

  	window.location="../index.html";

 }
	else {
		window.location="my_team.html";
		alert("checkSession ran and is ok");

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
		alert("checkSession ran and is ok");

	}	
	
}


function logout_user()
{


sessionStorage.clear();
alert("Session done");

}