var whatToSkip = 0;
var totalTeamsAmount = sessionStorage.getItem("teamsInDatabaseCount");
//stop the user logging in by pressing enter to correct issue with setting session vars

$(document).ready(function() {



    var user = sessionStorage.getItem("username");
    document.getElementById("welcome-banner").innerHTML = ("Welcome " + user);
    $('#time-panel').text("" + sessionStorage.getItem("loginTime"));

    $("#previous-ten-standings").on("click", function(event) {



        if (whatToSkip > 9) {
            whatToSkip -= 10;
            setStandingsTable(whatToSkip);

        } else {
            alert("Nobody");
        }



    });

    $("#next-ten-standings").on("click", function(event) {


        if (whatToSkip < totalTeamsAmount - 10) {
            whatToSkip += 10;

            setStandingsTable(whatToSkip);
        } else {
            alert("Nobody");
        }




    });


    if (sessionStorage.getItem("username") == null) {
        window.location = "../index.html";

    }
    set_user();

    $('#team-budget-left').text("Budget: " + sessionStorage.getItem("teamBudget"));
    $('#team-value').text("Team Value: " + sessionStorage.getItem("teamValue"));
    $('#team-name').text("" + sessionStorage.getItem("teamName"));
    $('a').click(function() {




        if (sessionStorage.getItem("username") == null) {
            alert("null");
        } else {
            window.location = "" + this.id + ".html";
        }

    });



});


function set_user() {




    if (sessionStorage.getItem("username") == null) {

        window.location = "../index.html";

    } else {
        var user = sessionStorage.getItem("username");




        setStandingsTable(0);


    }




}




function logout_user() {

    sessionStorage.clear();
    window.location = "../index.html";

}


function setStandingsTable(skip) {

    var i = 1;
    $("#table_1").find("tr:gt(0)").remove();

    var _url = "http://hurlingapi.azurewebsites.net/api/teams?$orderby=OverAllPoints desc&$top=10&$skip=" + skip + "  ";

    var userPosition = i + skip;
    $.ajax({
        url: _url,
        async: true,

        success: function(data) {

            if ($.isArray(data)) {
                $.each(data, function(index, object) {
                    var tr;




                    tr = $('<tr/>');
                    tr.append("<td id=" + object.Id + " onclick='getUserTeam(" + object.Id + ")' >" + userPosition + "</td>");
                    tr.append("<td id=" + object.Id + " onclick='getUserTeam(" + object.Id + ")'>" + object.Name + "</td>");
                    tr.append("<td id=" + object.Id + " onclick='getUserTeam(" + object.Id + ")'>" + object.LastWeekPoints + "</td>");
                    tr.append("<td id=" + object.Id + " onclick='getUserTeam(" + object.Id + ")'>" + object.OverAllPoints + "</td>");



                    userPosition++;
                    $('#table_1').append(tr);


                });
            }


        }



    });

}




function getUserTeam(id) {




    var _url = "http://hurlingapi.azurewebsites.net/api/teams/id/" + id;


    $.ajax({
        url: _url,
        async: true,

        success: function(data) {




            $('#team-name-holder').text("" + data.Name);


            populateUserPlayersTable(data.UserId);




        }



    });




}


function populateUserPlayersTable(userID) {

    var _url = "http://hurlingapi.azurewebsites.net/api/teams/id/" + userID + "/players";
    $("#user-players").find("tr:gt(0)").remove();

    $.ajax({
        url: _url,
        async: true,

        success: function(data) {

            if ($.isArray(data)) {
                $.each(data, function(index, object) {
                    var tr;



                    tr = $('<tr/>');
                    tr.append("<td  style='background:white; color:black;'>" + object.FirstName + " " + object.LastName + "</td>");
                    tr.append("<td style='background:white; color:black;'>" + object.LastWeekPoints + "</td>");
                    tr.append("<td style='background:white; color:black;'>" + object.OverallPoints + "</td>");




                    $('#user-players').append(tr);



                });
            }


        },
        error: function(jqXHR, textStatus, ex) {
            console.log("User has no players to show");
            alert("User has no players?!");
        }




    });



}
