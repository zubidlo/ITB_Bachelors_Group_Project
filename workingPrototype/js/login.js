/*
	.
	This file is for the login page
	The user enters a username and password,
	a function checks the username exists,
	if it does, then it checks to see you have 
	the corresponding password.
	If you do, the session storage is set and you 
	are taken to the home page, you are logged in. 

	 HTML files used in:
	login.html

	*/
$(document).ready(function() {

    //needed DOM elements
    var $_user_id_field = $("#get_user_id_input");
    var $_user_username_field = $("#get_user_username_input");
    var $_user_id_edit = $("#user_id_edit");
    var $_user_username_edit = $("#user_username_edit");
    var $_user_password_edit = $("#user_password_edit");
    var $_user_email_edit = $("#user_email_edit");
    var $_table_output = $("#table_output");
    var $_text_output = $("#text_output");
    var $_previous_page_button = $("#previous_page_button");
    var $_next_page_button = $("#next_page_button");
    var $_get_user_by_id_form = $("#get_user_by_id_form");
    var $_get_user_by_username_form = $("#get_user_by_username_form");
    var $_user_edit_form = $("#user_edit_form");

    //constants
    var _url = "http://hurlingapi.azurewebsites.net/api/users";
    //var _url = "http://localhost:51642/api/users";

    //global variables
    var top = 10;
    var skip = 0;
    var user_count;

    //this method returns new user object build from web form fields
    var readUserFromInputFields = function() {

        var user = {
            Id: $_user_id_edit.val(),
            Username: $_user_username_edit.val(),
            Password: $_user_password_edit.val(),
            Email: $_user_email_edit.val()
        };
        return user;
    }

    var getUsers = function(top, skip) {

        $.ajax({
            url: _url + "?$orderby=Username&$top=" + top + "&$skip=" + skip,
            success: function(data) {

                var counter_start = skip;
                var headers = ['id', 'username', 'password', 'e-mail'];
                var properties = ['Id', 'Username', 'Password', 'Email'];
                buildTable(counter_start, headers, properties, data, $_table_output);
            }
        });
    }

    //user by username GET request
    $_get_user_by_username_form.submit(function(event) {

        event.preventDefault();
        $.ajax({
            url: _url + "/username/" + $_user_username_field.val(),
            success: function(data, textStatus, request) {


                if ($_user_password_edit.val() == data.Password) {



                    var pass = data.Password;
                    sessionStorage.setItem("password", pass);
                    var email = data.Email;
                    sessionStorage.setItem("email", email);
                    var id = data.Id;
                    sessionStorage.setItem("id", id);


                    window.location = "html/home.html";
                    setStorage();
                } else {
                    alert("Wrong password");
                }

            },
            error: function(request, textStatus, errorThrown) {

                $alert("Not found");
            }
        });
    });

    function setStorage() {
        var user = $("#get_user_username_input").val();
        sessionStorage.setItem("username", user);
    }
});
function displayInfo() {

    $("#dialog").text("sdjf");
    $("#dialog").dialog();
}