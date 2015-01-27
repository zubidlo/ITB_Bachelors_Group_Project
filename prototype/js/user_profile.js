

function setStorage() 
{
	var user = sessionStorage.getItem("username");
   document.getElementById("demo").innerHTML = ("You are logged in as "+user);
   retrieve_details();

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





function retrieve_details()
{

var user = sessionStorage.getItem("username");


  var _url =  "http://hurlingapi.azurewebsites.net/api/users/username/" +user;

 


$.ajax({
        url: _url,
        async: true,
       
        success:function(data)
        {

        	var username = data.Username;
       		var password = data.Password;
            var email = data.Email;
            var Id = data.Id;
           
           document.getElementById("username").innerHTML = ("Your username is: "+username);
          
            document.getElementById("password").innerHTML = ("Your password is: "+password);
        
 document.getElementById("email").innerHTML = ("Your email is: "+email);

 document.getElementById("change_password").value = password;
 document.getElementById("change_email").value = email;




            }

                    
                
    });

		}


		function change_details()
		{

 			   var current_mail = document.getElementById("change_email");
   				var new_email = change_email.value;
			


 			   var current_password = document.getElementById("change_password");
   				var new_password = change_password.value;


   				alert(""+new_password);
   				alert(""+new_email);

          sessionStorage.removeItem("email");
          sessionStorage.setItem("email", new_email);

            sessionStorage.removeItem("password");
          sessionStorage.setItem("password", new_password);

      
       


}






