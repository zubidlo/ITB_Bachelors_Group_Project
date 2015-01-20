





function retrieve_username() {
    var user_cookie = document.getElementById('get_user_username_input').value;
    if (user_cookie !=null) {
        alert("Value retireved to home page from index " +user_cookie);
        getCookie(user_cookie);
     
       
    }
   
}




function getCookie(cname) {
document.getElementById("p1").innerHTML = "New text!";

    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            	
        }
    }
    return "";
}




