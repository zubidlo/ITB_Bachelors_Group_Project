
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
            $('table').append(tr);
          
            $("#myTable").tablesorter();   
    });
  }

       
            
           
          
           
        


            }

                    
                
    });

		}




	
