
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
   document.getElementById("demo").innerHTML = localStorage.getItem("username");
}






