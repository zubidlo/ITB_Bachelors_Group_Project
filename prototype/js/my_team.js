
/*


 HTML files used in:
 my_team.html

*/







function set_user()
{


	
	 
	var user = sessionStorage.getItem("username");
	document.getElementById("demo").innerHTML = ("You are logged in as "+user);

}




function checkSession_home()
{



  if(sessionStorage.getItem("username") === null)
 {

  	window.location="../index.html";

 }
	else {
		window.location="home.html";
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