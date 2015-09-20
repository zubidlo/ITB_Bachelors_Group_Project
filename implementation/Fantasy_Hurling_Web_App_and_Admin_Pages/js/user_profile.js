//stop the user logging in by pressing enter to correct issue with setting session vars
$(document).ready(function() {

    if (sessionStorage.getItem("username") == null) {
        window.location = "../index.html";

    }


    retrieve_details();
    $('#team-budget-left').text("Budget: " + sessionStorage.getItem("teamBudget"));
    $('#team-value').text("Team Value: " + sessionStorage.getItem("teamValue"));
    $('#team-name').text("" + sessionStorage.getItem("teamName"));
    var user = sessionStorage.getItem("username");
    document.getElementById("welcome-banner").innerHTML = ("Welcome " + user);
    $('#time-panel').text("" + sessionStorage.getItem("loginTime"));
    $('a').click(function() {




        if (sessionStorage.getItem("username") === null) {

        } else {
            window.location = "" + this.id + ".html";
        }

    });



});




function set_table() {

    var user = sessionStorage.getItem("username");


    var _url = "http://hurlingapi.azurewebsites.net/api/messages?$orderby=Created desc&$top=3&$skip=0";


    $.ajax({
        url: _url,
        async: true,

        success: function(data) {

            if ($.isArray(data)) {
                $.each(data, function(index, object) {


                    var user = return_username(object.UserId);
                    var tr;
                    return_username(object.UserId);
                    var user = sessionStorage.getItem("temp");
                    tr = $('<tr/>');

                    tr.append("<td>" + user + "</td>");
                    var user = sessionStorage.getItem("temp");
                    tr.append("<td>" + object.Text + "</td>");



                    sessionStorage.removeItem("temp");
                    $('table').append(tr);

                });
            }

        }



    });

}




function logout_user() {


    sessionStorage.clear();
    window.location = "../index.html";


}




function retrieve_details() {

    var user = sessionStorage.getItem("username");


    var _url = "http://hurlingapi.azurewebsites.net/api/users/username/" + user;




    $.ajax({
        url: _url,
        async: true,

        success: function(data) {


            var username = data.Username;
            var password = data.Password;
            var email = data.Email;
            var Id = data.Id;

            document.getElementById("username").innerHTML = ("" + username);

            document.getElementById("password").innerHTML = ("" + password);

            document.getElementById("email").innerHTML = ("" + email);

            document.getElementById("change_password").value = password;
            document.getElementById("change_email").value = email;




        }



    });

}


function change_details() {



    var current_mail = document.getElementById("change_email");
    var new_email = change_email.value;



    var current_password = document.getElementById("change_password");
    var new_password = change_password.value;


    sessionStorage.removeItem("email");
    sessionStorage.setItem("email", new_email);

    sessionStorage.removeItem("password");
    sessionStorage.setItem("password", new_password);



    var readUserFromInputFields = function() {

        return {
            Id: sessionStorage.getItem("id"),
            Username: sessionStorage.getItem("username"),
            Password: sessionStorage.getItem("password"),
            Email: sessionStorage.getItem("email")
        };
    }




    var _url = "http://hurlingapi.azurewebsites.net/api/users";
    //_url += "/api/users";

    event.preventDefault();

    var url = _url;
    var user = readUserFromInputFields();
    var successCallback = function(data, textStatus, request) {

        ajaxRequest(_url, function(data, textStatus, request) {

        });

    }
    var type = "PUT";
    if (type === "PUT") {
        url = url + "/id/" + user.Id;
    }

    var dataType = "json";

    ajaxRequest(url, successCallback, generalErrorCallback, type, dataType, user);


    document.getElementById("change_password").value = sessionStorage.getItem("password");
    document.getElementById("change_email").value = sessionStorage.getItem("email");
    document.getElementById("password").innerHTML = ("" + sessionStorage.getItem("password"));
    document.getElementById("email").innerHTML = ("" + sessionStorage.getItem("email"));


}
