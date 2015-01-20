





function retrieve_username() {
    var user_cookie = document.getElementById('get_user_username_input').value;
    if (user_cookie !=null) {
        alert("Value retireved to home page from index " +user_cookie);
        checkCookie();
     
       
    }
   
}



function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {


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

function checkCookie() {
    var user=getCookie("username");
  
   
    if (user != "") {
        alert("Home page cookie " + user);


    } else {
       user = $_user_username_field.val();
      
       if (user != "" && user != null) {
           setCookie("username", user, 5);
       }
    }
}




