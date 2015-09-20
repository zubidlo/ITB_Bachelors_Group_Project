$(document).ready(function() {

    //dom elements
    var $_user_id_field = $("#get_user_id_input");
    var $_user_username_field = $("#get_user_username_input");
    var $_user_id_edit = $("#user_id_edit");
    var $_user_username_edit = $("#user_username_edit");
    var $_user_password_edit = $("#user_password_edit");
    var $_user_email_edit = $("#user_email_edit");
    var $_user_team_edit = $("#user_team_edit");




    function add_user(user, password, email, team) {

        var user = {
            Id: $_user_id_edit.val(),
            Username: $_user_username_edit.val(),
            Password: $_user_password_edit.val(),
            Email: $_user_email_edit.val()
        };

        $.ajax({
            type: "POST",
            url: "http://hurlingapi.azurewebsites.net/api/users",
            data: user,
            dataType: "json",
            success: function(data) {


                getUserID(user.Username, user.Password, user.Email, team);



            },
            error: function(request, textStatus, errorThrown) {


            }
        });
    }



    function fillUserTextFields(object) {

        //$_user_id_edit.val(object.Id);
        $_user_username_edit.val(object.Username);
        $_user_password_edit.val(object.Password);
        $_user_email_edit.val(object.Email);

    }




    //create new user POST request
    $("#post_new_user_button").on("click", function(event) {


        var user = $_user_username_edit.val();
        var password = $_user_password_edit.val();
        var email = $_user_email_edit.val();
        var team = $_user_team_edit.val();


        add_user(user, password, email, team);

    });



});



function createNewTeam(user, password, email, team, userID) {

    var name = $("#user_username_edit").val();
    var team = $("#user_team_edit").val();
    var userWithTeam = {
        Id: 11,
        Name: team,
        OverAllPoints: 0,
        LastWeekPoints: 0,
        Budget: 100000,
        LeagueId: 1,
        UserId: userID
    };




    $.ajax({
        type: "POST",
        url: "http://hurlingapi.azurewebsites.net/api/teams",
        data: userWithTeam,
        dataType: "json",
        success: function(data) {


            alert("Team Created");
            window.location = "../index.html";
        },
        error: function(request, textStatus, errorThrown) {


        }
    });




}

function getUserID(user, password, email, team) {




    var _url = "http://hurlingapi.azurewebsites.net/api/users";



    var request = $.ajax({
        url: _url,
        async: true,

        success: function(data) {

            if ($.isArray(data)) {
                $.each(data, function(index, object) {


                    if (object.Username === user) {


                        createNewTeam(user, password, email, team, object.Id);
                        sessionStorage.setItem("tempID", object.Id);


                    } else {

                    }




                });



            }

        }




    });




}
