/*
	.
	This is the register page script , it is used to register
	a user if he clicks the register button on the login page
	It simply takes the users username, password and email
	from the form fields he has filled in and enters the new
	user into the database, the database will not accept duplicate
	user names


	 HTML files used in:
	register.html

	*/
$(document).ready(function() {

    //dom elements
    var $_user_id_field = $("#get_user_id_input");
    var $_user_username_field = $("#get_user_username_input");
    var $_user_id_edit = $("#user_id_edit");
    var $_user_username_edit = $("#user_username_edit");
    var $_user_password_edit = $("#user_password_edit");
    var $_user_email_edit = $("#user_email_edit");




    function add_user() {

        $.ajax({
            type: "POST",
            url: "http://hurlingapi.azurewebsites.net/api/users",
            data: readUserFromInputFields(),
            dataType: "json",
            success: function(data) {

                getAllUsers();
                clearUserTextFields();
                alert("New User Created");
                window.location = "../index.html";

            },
            error: function(request, textStatus, errorThrown) {


            }
        });
    }


    function clearUserTextFields() {

        $_user_id_edit.val("0");
        $_user_username_edit.val('');
        $_user_password_edit.val('');
        $_user_email_edit.val('');
    }

    function fillUserTextFields(object) {

        //$_user_id_edit.val(object.Id);
        $_user_username_edit.val(object.Username);
        $_user_password_edit.val(object.Password);
        $_user_email_edit.val(object.Email);

    }


    function readUserFromInputFields() {

        var user = {
            Id: $_user_id_edit.val(),
            Username: $_user_username_edit.val(),
            Password: $_user_password_edit.val(),
            Email: $_user_email_edit.val()
        };

        return user;
    }


    //get all users GET request
    function getAllUsers() {

        $.ajax({
            type: "GET",
            url: "http://hurlingapi.azurewebsites.net/api/users",
            dataType: "json",
            success: function(data) {

                putUsersInTable(data);
            },
            error: function(request, textStatus, errorThrown) {

                window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
                clearUserTextFields();
            }
        });
    }

    getAllUsers();




    //create new user POST request
    $("#post_new_user_button").on("click", function(event) {

        add_user();



    });



});


function displayInfo() {

    $("#dialog").text("You can register on this page if you are not a current user");
    $("#dialog").dialog();
}