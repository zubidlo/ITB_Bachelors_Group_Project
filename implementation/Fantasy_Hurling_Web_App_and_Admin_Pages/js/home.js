var playerPositions = ["Never Used", "Goalkeeper", "Corner-Back", "Full-Back", "Half-Back", "Midfielder", "Half-Forward", "Corner-Forward", "Full-Forward"];




$(window).load(function() {

    setStorage();
    getTeam();

    getAllPLayersFromDatabase();
    getTopPlayers();
    getAllTeamsCount();
    getUserNames();
    populateTopPlayersTable();



});


//stop the user logging in by pressing enter to correct issue with setting session vars

$(document).ready(function() {


    if (sessionStorage.getItem("username") === null) {
        window.location = "../index.html";

    }




    sessionStorage.setItem("showTransferPanel", "showInfoContainer");
    $('a').click(function() {



        if (sessionStorage.getItem("username") === null) {
            window.location = "../index.html";
        } else {

            if(this.id === "gaa")
            {
            console.log("Navigating to External site");
            }
             else if(this.id === "rte")
            {
             console.log("Navigating to External site");
            }

               else  if(this.id === "fixtures")
            {
                     console.log("Navigating to External site");
            }
               else if(this.id === "records")
            {
                  console.log("Navigating to External site");   
            }
                 else if(this.id === "logo")
            {
                  console.log("Navigating to External site"); 

            }


            else
            {
                  window.location = "" + this.id + ".html";
            }
          
        }

    });



    $('#time-panel').text("" + sessionStorage.getItem("loginTime"));


});


function setStorage() {

    if (sessionStorage.getItem("username") === null) {

        window.location = "../index.html";

    } else {
        var user = sessionStorage.getItem("username");


        document.getElementById("welcome-banner").innerHTML = ("Welcome " + user);


    }



}




function logout_user() {


    sessionStorage.clear();
    window.location = "../index.html";


}



function getAllPLayersFromDatabase() {



    var _url = "http://hurlingapi.azurewebsites.net/api/players";

    var highestId = 0;
    var i = 0;


    $.ajax({
        url: _url,
        async: true,

        success: function(data) {

            if ($.isArray(data)) {
                $.each(data, function(index, object) {
                    i++;
                    highestId = object.Id;
                    //store entire player database in session storage
                    //each player is one seesion storage entry 
                    sessionStorage.setItem("playerInDatabaseDetails" + object.Id, object.Id + "-" + object.FirstName + "-" + object.LastName + "-" + object.GaaTeam + "-" + object.LastWeekPoints + "-" + object.OverallPoints + "-" + object.Price + "-" + object.PositionId);




                });
            }
            sessionStorage.setItem("playerInDatabaseCount", i);
            sessionStorage.setItem("playerWithHighestId", highestId);

        }




    });


}


function setMyTeamStorage(user_id) {

    var user = (user_id + "/players");
    var count = 0;
    var _url = "http://hurlingapi.azurewebsites.net/api/teams/id/" + user + "?$orderby=PositionId";
    var totalTeamValue = 0;


    $.ajax({
        url: _url,
        async: true,

        success: function(data) {
            if ($.isArray(data)) {
                $.each(data, function(index, object) {
                    count++;
                    sessionStorage.setItem("" + playerPositions[object.PositionId], "" + object.Id);
                    sessionStorage.setItem(playerPositions[object.PositionId] + "Jersey", "" + object.GaaTeam);
                    sessionStorage.setItem(playerPositions[object.PositionId] + "Name", "" + object.LastName);
                    sessionStorage.setItem(playerPositions[object.PositionId] + "Price", "" + object.Price);
                    sessionStorage.setItem(playerPositions[object.PositionId] + "Points", "" + object.OverallPoints);

                    sessionStorage.setItem("myplayercount", "" + count);

                    sessionStorage.setItem("PlayerPositionWithID" + object.Id, "" + object.PositionId);

                    totalTeamValue = totalTeamValue + object.Price;


                });



            }
            sessionStorage.setItem("teamValue", totalTeamValue);
            $('#team-value').text("Team Value: " + sessionStorage.getItem("teamValue"));
        }


    });

}


function getTopPlayers() {

    var i = 1;

    var _url = "http://hurlingapi.azurewebsites.net/api/players?$orderby=LastWeekPoints";


    $.ajax({
        url: _url,
        async: true,

        success: function(data) {

            if ($.isArray(data)) {
                $.each(data, function(index, object) {
                    var tr;

                    if (i < 6) {
                        tr = $('<tr/>');
                        tr.append("<td>" + object.FirstName + object.LastName + "</td>");
                        tr.append("<td>" + object.LastWeekPoints + "</td>");

                    }

                    i++;
                    $('#topPlayersTable').append(tr);


                });
            }


        }



    });

}


function getAllTeamsCount() {



    var _url = "http://hurlingapi.azurewebsites.net/api/teams";


    var i = 0;


    $.ajax({
        url: _url,
        async: true,

        success: function(data) {

            if ($.isArray(data)) {
                $.each(data, function(index, object) {
                    i++;
                    //store entire player database in session storage
                    //each player is one seesion storage entry 




                });
            }
            sessionStorage.setItem("teamsInDatabaseCount", i);

        }




    });


}

function getUserNames() {



    var _url = "http://hurlingapi.azurewebsites.net/api/users";




    var request = $.ajax({
        url: _url,
        async: true,

        success: function(data) {

            if ($.isArray(data)) {
                $.each(data, function(index, object) {




                    sessionStorage.setItem("userWIthId" + object.Id, object.Username);



                });



            }

        }




    });




}


function populateTopPlayersTable() {

    var i = 1;
    var skip = 0;

    var _url = "http://hurlingapi.azurewebsites.net/api/players?$orderby=OverallPoints desc&$top=10&$skip=" + skip + "  ";


    $.ajax({
        url: _url,
        async: true,

        success: function(data) {

            if ($.isArray(data)) {
                $.each(data, function(index, object) {
                    var tr;
                    var img = document.createElement("img");
                    img.src = "../images/jerseys/" + object.GaaTeam + ".png";
                    img.style.width = "30px";



                    if (i < 11) {
                        tr = $('<tr/>');
                        tr.append("<td>" + i + "</td>");
                        tr.append("<td>" + object.LastName + "</td>");
                        tr.append("<td>" + "<img src='../images/jerseys/" + object.GaaTeam + ".png' class='img-rounded' alt='Cinque Terre' width='20' height='20'>" + "</td>");
                        tr.append("<td>" + object.OverallPoints + "</td>");
                        //tr.appendChild(img);

                    }

                    i++;
                    $('#top-players-table').append(tr);


                });
            }


        }



    });

}




function getTeam() {

    var user = sessionStorage.getItem("id");


    var _url = "http://hurlingapi.azurewebsites.net/api/teams?$orderby=OverAllPoints desc";


    var myTeamPosition = 0;

    var request = $.ajax({
        url: _url,
        async: true,

        success: function(data) {

            if ($.isArray(data)) {
                $.each(data, function(index, object) {

                    myTeamPosition++;
                    if (object.UserId == user) {

                        sessionStorage.setItem("teamid", "" + object.Id);
                        sessionStorage.setItem("teamBudget", object.Budget);
                        sessionStorage.setItem("teamWeekPoints", "" + object.LastWeekPoints);
                        sessionStorage.setItem("overallPoints", "" + object.OverAllPoints);
                        $('#team-week-points-panel-home').text("" + object.LastWeekPoints + "");
                        $('#team-overall-points-panel').text("" + object.OverAllPoints + "");
                        sessionStorage.setItem("teamName", "" + object.Name);


                        setMyTeamStorage(sessionStorage.getItem("teamid"));
                        $('#team-overall-position-panel').text("" + myTeamPosition);
                        sessionStorage.setItem("TeamPosition", "" + myTeamPosition);
                        request.abort();


                    }




                });

                $('#team-budget-left').text("Budget: " + sessionStorage.getItem("teamBudget"));

                $('#team-name').text("" + sessionStorage.getItem("teamName"));

            }

        }




    });




}
