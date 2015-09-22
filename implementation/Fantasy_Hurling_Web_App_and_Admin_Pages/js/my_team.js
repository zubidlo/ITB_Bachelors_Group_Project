var playerPositions = ["Never Used", "Goalkeeper", "Corner-Back", "Full-Back", "Half-Back", "Midfielder", "Half-Forward", "Corner-Forward", "Full-Forward"];
var myPosition = sessionStorage.getItem("TeamPosition");
var teamsInDatabaseCount = sessionStorage.getItem("teamsInDatabaseCount");


var percentile = myPosition / teamsInDatabaseCount * 100;
percentile =Math.round(percentile * 100) / 100;
var GoalkeeperPoints = sessionStorage.getItem("GoalkeeperPoints");
var GoalkeeperName = sessionStorage.getItem("GoalkeeperName");
var CornerBackPoints = sessionStorage.getItem("Corner-BackPoints");
var CornerBackName = sessionStorage.getItem("Corner-BackName");
var FullBackPoints = sessionStorage.getItem("Full-BackPoints");
var FullBackName = sessionStorage.getItem("Full-BackName");
var HalfBackPoints = sessionStorage.getItem("Half-BackPoints");
var HalfBackName = sessionStorage.getItem("Half-BackName");
var MidfielderPoints = sessionStorage.getItem("MidfielderPoints");
var MidfielderName = sessionStorage.getItem("MidfielderName");
var HalfForwardPoints = sessionStorage.getItem("Half-ForwardPoints");
var HalfForwardName = sessionStorage.getItem("Half-ForwardName");
var CornerForwardPoints = sessionStorage.getItem("Corner-ForwardPoints");
var CornerForwardName = sessionStorage.getItem("Corner-ForwardName");
var FullForwardPoints = sessionStorage.getItem("Full-ForwardPoints");
var FullForwardName = sessionStorage.getItem("Full-ForwardName");

function loadChartData() {


    var pieData = [{
            value: GoalkeeperPoints,
            color: "pink",
            highlight: "#FF5A5E",
            label: GoalkeeperName
        }, {
            value: CornerBackPoints,
            color: "purple",
            highlight: "#5AD3D1",
            label: CornerBackName
        }, {
            value: FullBackPoints,
            color: "gray",
            highlight: "#FF5A5E",
            label: FullBackName
        }, {
            value: HalfBackPoints,
            color: "black",
            highlight: "#5AD3D1",
            label: HalfBackName
        }, {


            value: MidfielderPoints,
            color: "orange",
            highlight: "#5AD3D1",
            label: MidfielderName
        },

        {
            value: HalfForwardPoints,
            color: "yellow",
            highlight: "#FF5A5E",
            label: HalfForwardName
        }, {
            value: CornerForwardPoints,
            color: "blue",
            highlight: "#5AD3D1",
            label: CornerForwardName
        }, {


            value: FullForwardPoints,
            color: "green",
            highlight: "#5AD3D1",
            label: FullForwardName
        },




    ];


    var pieData2 = [{
            value: percentile,
            color: "#3366CC",
            highlight: "#85A3E0",
            label: "Behind %"
        }, {
            value: 100 - percentile,
            color: "#85A3E0",
            highlight: "#3366CC",
            label: "Ahead of %"
        }


    ];




    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myPie = new Chart(ctx).Pie(pieData);

    var ctx2 = document.getElementById("chart-area2").getContext("2d");
    window.myPie = new Chart(ctx2).Doughnut(pieData2);




}




$(document).ready(function() {




    if (sessionStorage.getItem("username") === null) {
        window.location = "../index.html";

    }
    var user = sessionStorage.getItem("username");
    document.getElementById("welcome-banner").innerHTML = ("Welcome " + user);
    $('#time-panel').text("" + sessionStorage.getItem("loginTime"));
    setMyTeamTable();
    setMyTeamDetails();


    $('#team-budget-left').text("Budget: " + sessionStorage.getItem("teamBudget"));
    $('#team-value').text("Team Value: " + sessionStorage.getItem("teamValue"));
    $('#team-name').text("" + sessionStorage.getItem("teamName"));

    loadChartData();
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




    //add an onclick function to each player
    for (var count = 1; count < 9; count++) {
        $("#player" + count).click(function() {

            var player = $(this).attr('id');

            populateContentPopoverForPlayer(player);

        });


    }




});


function populateContentPopoverForPlayer(playerID) {


    for (var count = 1; count < 9; count++) {

        if (playerID == "player" + count) {

            $("#player-info").empty();
            //count is now player position id

            var playerName = sessionStorage.getItem("" + playerPositions[count] + "Name");
            var playerTeam = sessionStorage.getItem("" + playerPositions[count] + "Jersey");
            var playerPoints = sessionStorage.getItem("" + playerPositions[count] + "Points");
            $("#dialog").dialog("open");


            //set dialog title to player name
            $("#dialog").dialog({
                title: "" + playerName
            });
            //set up an image and append to dialog body div
            var img = document.createElement("img");
            img.src = "../images/hurler" + count + ".png";
            img.style.width = "90px";
            var src = document.getElementById("player-info");
            src.appendChild(img);
            $("#player-team").html("Team: " + playerTeam);
            $("#player-points").html("Week Points: " + playerPoints);
        }



    }




}

function setMyTeamTable() {
    var i = 1;
    var user_id = sessionStorage.getItem("teamid");
    var user = (user_id + "/players");

    var _url = "http://hurlingapi.azurewebsites.net/api/teams/id/" + user + "?$orderby=PositionId";
    var overall_points = 0;
    var week_points = 0;
    var most_expensive = 0;



    $.ajax({
        url: _url,
        async: true,

        success: function(data) {
            if ($.isArray(data)) {
                $.each(data, function(index, object) {
                    var tr;




                    //  var img = document.createElement("img");

                    // img.src = "../images/icons/hurling.png";
                    // img.style.width = "45px";

                    tr = $("<tr class='black' onclick='showPlayerInfo(" + object.Id + "    )''>");



                    //tr.append("<td>" + object.PositionId + "</td>");
                    tr.append("<td>" + playerPositions[object.PositionId] + "</td>");
                    tr.append("<td>" + object.LastName + "</td>");
                    tr.append("<td>" + object.GaaTeam + "</td>");
                    tr.append("<td>" + object.LastWeekPoints + "</td>");
                    tr.append("<td>" + object.OverallPoints + "</td>");
                    tr.append("<td class='visible-lg '>" + object.Rating + "</td>");
                    tr.append("<td>" + object.Price + "</td>");


                    var src = document.getElementById("player" + object.PositionId);
                    //  src.appendChild(img);
                    //all player divs set to hidden by default , remove hidden from all players
                    //where a player exists in the team, leave all others hidden
                    $('#player' + object.PositionId + '-text').removeClass("hidden");
                    //set text of last name under jersey icon 
                    $('#player' + object.PositionId + '-text').text(object.LastName);
                    //set css on this text
                    $('#player' + object.PositionId + '-text').css({
                        'color': 'black',
                        'font-size': '60%'
                    });


                    $('#player' + object.PositionId + '-points').removeClass("hidden");
                    //set text of last name under jersey icon 
                    $('#player' + object.PositionId + '-points').text(object.LastWeekPoints);
                    //set css on this text
                    $('#player' + object.PositionId + '-points').css({
                        'color': 'black',
                        'font-size': '100%'
                    });



                    $('#my-team-table').append(tr);

                    sessionStorage.setItem("" + playerPositions[object.PositionId] + "Points", "" + object.OverallPoints);
                    i = i + 1;


                });

            }

        }


    });


}

function showPlayerInfo(id) {
    //alert("Player ID : "+id);
    var sessionForPop = sessionStorage.getItem("PlayerPositionWithID" + id);

    var forPopulate = "player" + sessionForPop;

    populateContentPopoverForPlayer(forPopulate);

}

function setMyTeamDetails() {
    var i = 1;
    var team_id = sessionStorage.getItem("teamid");


    var _url = "http://hurlingapi.azurewebsites.net/api/teams/id/" + team_id;


    $.ajax({
        url: _url,
        async: true,

        success: function(data) {


            $("#team-name-panel").html("" + data.Name);
            $("#team-points-panel").html("" + data.OverAllPoints);
            $("#team-week-points-panel").html("" + data.LastWeekPoints);
            $("#team-budget-panel").html("" + data.Budget);
        }


    });
}


$(function() {
    $("#dialog").dialog({
        resizable: false,
        autoOpen: false,
        show: {
            resizable: false,
            duration: 300,
            my: "center",
            at: "center",
            of: window
        },
        hide: {

            duration: 300
        }
    });


});


function logout_user() {


    sessionStorage.clear();
    window.location = "../index.html";


}
