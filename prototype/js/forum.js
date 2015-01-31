


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



function clear_text_area()
{

document.getElementById("forum_post_area").value = "";

set_table();

location.reload();
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

	var user = sessionStorage.getItem("username");


    var _url =  "http://hurlingapi.azurewebsites.net/api/messages?$orderby=Created desc";


$.ajax({
        url: _url,
        async: true,
       
        success:function(data)
        {

if($.isArray(data)) {
    $.each(data, function(index, object) {
         var tr;
       
            tr = $('<tr/>');
         
      		tr.append("<td>" + object.UserId + "</td>");
            tr.append("<td>" + object.Text + "</td>");
            tr.append("<td>" + object.Created + "</td>");
        	

           
            $('table').append(tr);
           
    });
  }

            }

                    
                
    });

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


function clear_text_area()
{

document.getElementById("forum_post_area").value = "";

}