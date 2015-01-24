
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


	set_table(1);
	 
	var user = sessionStorage.getItem("username");
	document.getElementById("demo").innerHTML = ("You are logged in as "+user);
	

}


function checkSession_transfers()
{

  if(sessionStorage.getItem("username") === null)
 {

  	window.location="../index.html";

 }
	else {
		window.location="transfers.html";
		alert("checkSession ran and is ok");

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
		alert("checkSession ran and is ok");

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
		alert("checkSession ran and is ok");

	}	
	
}





function logout_user()
{

sessionStorage.clear();
alert("Session done");

}



function set_table(i)
{

  var _url = "http://hurlingapi.azurewebsites.net/api/users";

$.ajax({
        url: _url + "/Id/" + i,
        async: true,
       
        success:function(data)
        {



   
              var tr;
       
            tr = $('<tr/>');
            tr.append("<td>" + data.Id + "</td>");
            tr.append("<td>" + data.Username + "</td>");
             tr.append("<td>" + data.Username + "</td>");
              tr.append("<td>" + data.Username + "</td>");
               tr.append("<td>" + data.Username + "</td>");
        
            $('table').append(tr);
        
                         	 i++;

                         	 if(i <4)
                         	 {
                          set_table(i);
}
        $("#myTable").tablesorter(); 	
            
           
          
           
        


            }

                    
                
    });

		}




	
