
   









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

function checkCookie(user_cookie) {
    var user=getCookie("username");
    var name = user_cookie;
   
    if (user == name) {
        alert("Home page cookie " + user);
         document.getElementById('boldStuff').innerHTML = "dsfsdff";

    } else {
       user = $_user_username_field.val();
      
       if (user != "" && user != null) {
           setCookie("username", user, 5);
       }
    }
}


function myFunction() {

var user=getCookie("username");
    document.getElementById("demo").innerHTML = "Welcome back "+user;
}




