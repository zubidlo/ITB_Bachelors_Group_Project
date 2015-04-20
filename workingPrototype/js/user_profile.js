function setStorage() {
    if (sessionStorage.getItem("username") === null) {
        window.location = "../index.html";
    } else {
        var user = sessionStorage.getItem("username");
        document.getElementById("demo").innerHTML = ("You are logged in as " + user);
        retrieve_details();
        set_table();
    }
}
function displayInfo() {
    $("#dialog").text("Change your current user details including password and username on this page");
    $("#dialog").dialog();
}
function displayInfo2() {
    $("#dialog").text("Your details have been updated");
    $("#dialog").dialog();
}
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

function readUserFromInputFields() {
    var id = sessionStorage.getItem("id");
    var text = document.getElementById("forum_post_area").value;
    var now = new Date();
    now = new Date().toLocaleString();
    var user = {
        Id: id,
        Text: text,
        UserId: id,
        Created: now
    };
    return user;
}
function checkSession_standings() {
    if (sessionStorage.getItem("username") === null) {
        window.location = "../index.html";
    } 
	else
	{
        window.location = "standings.html";
    }
}
function checkSession_forum() {
    if (sessionStorage.getItem("username") === null) 
	{
        window.location = "../index.html";
    }
	else
	{
        window.location = "forum.html";
    }
}
function post_message() {
    $("#table_2").find("tr:gt(0)").remove();
    $.ajax({
        type: "POST",
        url: "http://hurlingapi.azurewebsites.net/api/messages",
        data: readUserFromInputFields(),
        dataType: "json",
        success: function(data) {
            clear_text_area();
            set_table();
            document.getElementById("forum_post_area").value = "Please Enter a Message";
        },
        error: function(request, textStatus, errorThrown) {
        window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
        }
    });
}
function clear_text_area() {

    document.getElementById("forum_post_area").value = "";
    set_table();


}

function clear_text_area() {
    document.getElementById("forum_post_area").value = "";
}
function return_username(userId) {
    var _url = "http://hurlingapi.azurewebsites.net/api/users";
    event.preventDefault();
    $.ajax({
        async: false,
        url: _url + "/Id/" + userId,
        success: function(data, textStatus, request) {
        sessionStorage.setItem("temp", data.Username);
        }
    });
}
function checkSession_view_team() {
    if (sessionStorage.getItem("username") === null) {
        window.location = "../index.html";
    }
	else
	{
        window.location = "my_team.html";
    }
}
function checkSession_see_rankings() {
    if (sessionStorage.getItem("username") === null) {
        window.location = "../index.html";
    } else {
        window.location = "standings.html";
    }
}
function checkSession_home() {
    if (sessionStorage.getItem("username") === null) {
        window.location = "../index.html";
    } else {
        window.location = "home.html";
    }
}
function checkSession_transfers() {
    if (sessionStorage.getItem("username") === null) {
        window.location = "../index.html";
    } else {
        window.location = "transfers.html";
    }
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
            document.getElementById("username").innerHTML = ("Your username is: " + username);
            document.getElementById("password").innerHTML = ("Your password is: " + password);
            document.getElementById("email").innerHTML = ("Your email is: " + email);
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
    _url += "/api/users";
    event.preventDefault();
    var url = _url;
    var user = readUserFromInputFields();
    var successCallback = function(data, textStatus, request)
	{

       ajaxRequest(_url, function(data, textStatus, request) {
            _count = parseInt(data.length);
            $table_rows_count.val(_count);
            getUsers(tableCurrentPage());
        });
       
    }
	
    var type = "PUT";
    if (type === "PUT") {
        url = url + "/id/" + user.Id;
    }
    var dataType = "json";
    ajaxRequest(url, successCallback, generalErrorCallback, type, dataType, user);
		displayInfo2();
    document.getElementById("change_password").value = sessionStorage.getItem("password");
    document.getElementById("change_email").value = sessionStorage.getItem("email");
    document.getElementById("password").innerHTML = ("Your password is :" + sessionStorage.getItem("password"));
    document.getElementById("email").innerHTML = ("Your email is :" + sessionStorage.getItem("email"));


}