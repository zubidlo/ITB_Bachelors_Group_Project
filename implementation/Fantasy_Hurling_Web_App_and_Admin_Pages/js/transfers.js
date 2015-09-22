var playerPositions = ["Never Used", "Goalkeeper", "Corner-Back", "Full-Back", "Half-Back", "Midfielder", "Half-Forward", "Corner-Forward", "Full-Forward"];
var playerIdToBuy = null;
var playerPositionToBuy = null;
var playerNameToBuy = null;
var playerTeamToBuy = null;
var playerPointsToBuy = null;
var playerPriceToBuy = null;
var playerPositionToBuyInt = null;
var whatToSkip = 0;
var bestPlayer = 0;
var removedPlayers = [];

var totalPlayersInDatabase = sessionStorage.getItem("playerInDatabaseCount");
var highestIdInDatabase = sessionStorage.getItem("playerWithHighestId");
var playersInMyTeam = sessionStorage.getItem("myplayercount");
var teamBudget = sessionStorage.getItem("teamBudget");
var teamValue = sessionStorage.getItem("teamValue");
var loginTime = sessionStorage.getItem("loginTime");

sessionStorage.setItem("amountSkippedDatabasePlayers", 5);




function setUserTeamPlayersPitch() {

    var playerJersey = null;


    for (var count = 1; count < playersInMyTeam + 1; count++) {

        //if this storage exists the player exists if not id doesnt
        if (sessionStorage.getItem(playerPositions[count] + "Jersey") != null) {
            // set jersey to whatever his jersey is set in storage
            var playerJersey = sessionStorage.getItem(playerPositions[count] + "Jersey") + ".png";
            //set his name also 
            $("#" + playerPositions[count] + "-Name").text(sessionStorage.getItem(playerPositions[count] + "Name"));

            $("#" + playerPositions[count]).prepend('<img class="player-droppable-image" src="../images/jerseys/' + playerJersey + '" />');

        }

        //this is if he does not exist, example we have no keeper
        else {



        }


    }




}

function setPlayerInfoPanels() {
    var player = "";
    var topPlayer = 0;
    var worstPlayer = 0;
    var prevTopPlayer = 0;
    $("#best-player-panel").text("");

    $("#best-player-panel").text("");
    var playerTotal = sessionStorage.getItem("myplayercount");
    $("#free-positions-panel").text(8 - playerTotal);

    for (var count = 1; count <= 8; count++) {

        topPlayer = sessionStorage.getItem(playerPositions[count] + "Points");

        if (topPlayer != null) {

            if (topPlayer >= bestPlayer) {
                bestPlayer = topPlayer;
                player = sessionStorage.getItem(playerPositions[count] + "Name");
                $("#best-player-panel").text("" + player);

                $("#best-player-panel").text("" + player + " " + topPlayer);


            }

        }




    }


}


function logout_user() {


    sessionStorage.clear();
    window.location = "../index.html";


}

//stop the user logging in by pressing enter to correct issue with setting session vars

$(document).ready(function() {
    $('#time-panel').text("" + sessionStorage.getItem("loginTime"));
    $('#welcome-banner').text("Welcome " + sessionStorage.getItem("username"));
    $("#previous-ten-transfers").on("click", function(event) {



        if (whatToSkip > 4) {

            var currentDisplayed = sessionStorage.getItem("amountSkippedDatabasePlayers");
            currentDisplayed = currentDisplayed - 5;

            sessionStorage.setItem("amountSkippedDatabasePlayers", currentDisplayed);

            fillAllPlayersTable(currentDisplayed);

        } else {
            alert("Nobody");
        }




    });


    $("#next-ten-transfers").on("click", function(event) {

        if (whatToSkip < totalPlayersInDatabase - 5) {


            var currentDisplayed = sessionStorage.getItem("amountSkippedDatabasePlayers");
            currentDisplayed = currentDisplayed - currentDisplayed - currentDisplayed - 5;
            var convertedCurrentDisplayed = Math.abs(currentDisplayed);




            sessionStorage.setItem("amountSkippedDatabasePlayers", convertedCurrentDisplayed);

            fillAllPlayersTable(convertedCurrentDisplayed);

        } else {
            alert("Nobody");
        }




    });




    $("#table-view").on("click", function(event) {


        //$( "view-destination" ).empty();
        $("#compact").addClass("hidden");
        $("#table-view-container").removeClass("hidden");
        $("#table-view-container").appendTo("#view-destination").hide().fadeIn();




    });

    $("#compact-view").on("click", function(event) {



        $("#table-view-container").addClass("hidden");
        $("#compact").removeClass("hidden");
        $("#compact").appendTo("#view-destination").hide().fadeIn();




    });




    for (var count = 1; count < 9; count++) {
        $("#" + playerPositions[count]).on("click", function(event) {

            var playerID = sessionStorage.getItem("" + this.id);

            var playerSellingName = sessionStorage.getItem("" + this.id + "Name");



            // we want to remove this player so add his ID to the array
            //Arrays.asList(removedPlayers).contains(playerID);


            if ($.inArray(playerID, removedPlayers) == -1) {




                removedPlayers.push("" + playerID);

                console.log("Player Added to transfer pool with id: " + playerID);
                // ui.draggable.draggable('option', 'revert', true);
                // $('#' + ui.draggable.attr("id")).hide();

            } else {

                console.log("Already Removing That Player");
            }


            getAllRemovedPlayers();
            makeChanges();


        });
    }



    $('#Goalkeepers-select-box').on('change', function() {



        var playerInId = $("#Goalkeepers-select-box option:selected").attr('id');
        var outputPlayerInfo = sessionStorage.getItem("playerInDatabaseDetails" + playerInId);

        loadPlayerInInformation(outputPlayerInfo);

    });
    $('#Defenders-select-box').on('change', function() {
        var playerInId = $("#Defenders-select-box option:selected").attr('id');
        var outputPlayerInfo = sessionStorage.getItem("playerInDatabaseDetails" + playerInId);

        loadPlayerInInformation(outputPlayerInfo);
    });

    $('#Attackers-select-box').on('change', function() {
        var playerInId = $("#Attackers-select-box option:selected").attr('id');
        var outputPlayerInfo = sessionStorage.getItem("playerInDatabaseDetails" + playerInId);

        loadPlayerInInformation(outputPlayerInfo);
    });

    $('#Midfielders-select-box').on('change', function() {

        var playerInId = $("#Midfielders-select-box option:selected").attr('id');
        var outputPlayerInfo = sessionStorage.getItem("playerInDatabaseDetails" + playerInId);

        loadPlayerInInformation(outputPlayerInfo);
    });




    if (sessionStorage.getItem("username") == null) {
        window.location = "../index.html";

    }

    $('#confirm-transfers-button').click(function() {

        makeChanges();


    });

    $('#confirm-buy-button').click(function() {


        if (playerIdToBuy != null) {

            buyPlayer(this.id);
        } else {
            alert("Select a player first");
        }

    });

    $('#cancel-transfers-button').click(function() {
        alert("cancelling");
        resetAllChanges();


    });

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




    setUserTeamPlayersPitch();
    getAllDatabasePlayersFromStorage();
    $('#team-budget-left').text("Budget: " + teamBudget);
    $('#team-value').text("Team Value: " + teamValue);
    $('#team-name').text("" + sessionStorage.getItem("teamName"));
    fillAllPlayersTable(5);
    $("#best-player-panel").text("");
    setPlayerInfoPanels();


});




//set the text/att of each div to values in session storage
// then when we drop, we can get those to populate middle


//function iterates thorugh our removed players array and alerts
function getAllRemovedPlayers() {
    for (var count = 0; count < removedPlayers.length; count++) {

        console.log("Transfer Pool now contains this player ID " + removedPlayers[count]);
    }
}


function resetAllChanges() {
    removedPlayers = [];
    location.reload();

    console.log("CLeared Transfer Pool Array");
}


function makeChanges() {
    for (var count = 0; count < removedPlayers.length; count++) {

        console.log("Removing this player" + removedPlayers[count]);
    }

    deleteAllInTransferPool();
}



function deleteAllInTransferPool() {


    var playerPositionID = "";
    var type = "DELETE";
    var user_id = sessionStorage.getItem("teamid");

    for (var count = 0; count < 1; count++) {

        //get players position ID 
        playerPositionID = sessionStorage.getItem("PlayerPositionWithID" + removedPlayers[count]);
        playerPrice = sessionStorage.getItem("" + playerPositions[playerPositionID] + "Price");




        // id of player we want to delete
        var playerToDelete = removedPlayers[count];

        console.log("Now deleting player with ID " + playerToDelete);

        var _url = "http://hurlingapi.azurewebsites.net/api/teams/id/" + user_id + "/player/id/" + playerToDelete;

        $.ajax({
            type: type,
            url: _url,
            async: true,

            success: function(data) {


            }


        });

        clearSessionStorageForPlayer(playerPositionID, playerPrice);
        clearSoldPlayerPosition(playerPositionID, playerPrice);

        setPlayerInfoPanels();
        bestPlayer = 0;


    }


    $('#player-transfer-droppable-area').empty();

    removedPlayers = [];
}

function clearSoldPlayerPosition(playerPositionID, playerPrice) {

    //$("#"+playerPositions[playerPositionID]+"-Name").hide();
    $("#" + playerPositions[playerPositionID] + "-Name").text("kkk");
    $("#" + playerPositions[playerPositionID]).empty();




}

function clearSessionStorageForPlayer(playerPositionID, playerPrice) {



    var teamValue = sessionStorage.getItem("teamValue");
    var newTeamValue = teamValue - playerPrice;

    // issue with adding session value and our player value
    //solution seems to be to take budget from budget from budget to get minus
    // our budget, now minus player value from that
    //we have the exact opposite of what we need, for example it should
    //be 56 k , but its -56k, we use math.abs to make negative positive
    var teamBudget = sessionStorage.getItem("teamBudget");
    var newTeamBudget = teamBudget - teamBudget - teamBudget - playerPrice;

    var convertedTeamBudget = Math.abs(newTeamBudget);


    sessionStorage.removeItem("" + playerPositions[playerPositionID]);
    sessionStorage.removeItem("" + playerPositions[playerPositionID] + "Name");
    sessionStorage.removeItem("" + playerPositions[playerPositionID] + "Jersey");
    sessionStorage.removeItem("" + playerPositions[playerPositionID] + "Points");
    sessionStorage.removeItem("" + playerPositions[playerPositionID] + "Price");
    sessionStorage.removeItem("PlayerPositionWithID" + playerPositions[playerPositionID]);


    sessionStorage.setItem("teamValue", newTeamValue);
    sessionStorage.setItem("teamBudget", convertedTeamBudget);


    $('#team-value').text("Team Value: " + newTeamValue);
    $('#team-budget-left').text("Budget: " + convertedTeamBudget);
    var totalPlayers = 0;
    totalPlayers = sessionStorage.getItem("myplayercount");
    totalPlayers--;
    sessionStorage.setItem("myplayercount", totalPlayers);
    $("#free-positions-panel").text(8 - totalPlayers);
}


//gets all players from session storage and populates select boxes
//adds an id to each player so when clicked stuff can be done with it
function getAllDatabasePlayersFromStorage() {

    var $select = $('#Goalkeepers-select-box');
    var $selectDefenders = $('#Defenders-select-box');
    var $selectMidfielders = $('#Midfielders-select-box');
    var $selectAttackers = $('#Attackers-select-box');

    for (var i = 1; i < highestIdInDatabase; i++) {



        var playerDetails = sessionStorage.getItem("playerInDatabaseDetails" + i);

        if (playerDetails != null)

        {
            var split = playerDetails.split('-');
            var id = split[0];
            var name = split[1];
            var surname = split[2];
            var team = split[3];
            var weekPoints = split[4];
            var overallPoints = split[5];
            var price = split[6];
            var positionID = split[7];

            if (positionID == 1) {

                $("<option id =" + id + " >" + name + " " + surname + " | " + team + " | " + playerPositions[positionID] + " | " + overallPoints + " | " + price + "</option>").appendTo($select);
            } else if (positionID == 2 || positionID == 3 || positionID == 4) {

                $("<option id =" + id + " >" + name + " " + surname + " |  " + team + " | " + playerPositions[positionID] + " | " + overallPoints + " | " + price + "</option>").appendTo($selectDefenders);

            } else if (positionID == 5 || positionID == 6 || positionID == 7) {
                $("<option id =" + id + " >" + name + " " + surname + " | " + team + " | " + playerPositions[positionID] + " | " + overallPoints + " | " + price + "</option>").appendTo($selectMidfielders);
            } else {
                $("<option id =" + id + " >" + name + " " + surname + " | " + team + " | " + playerPositions[positionID] + " | " + overallPoints + " | " + price + "</option>").appendTo($selectAttackers);



            }
        }

    }


}



function loadPlayerInInformation(outputPlayerInfo) {

    $("#player-in-jersey-info").empty();

    var split = outputPlayerInfo.split('-');
    var id = split[0];
    var name = split[1];
    var surname = split[2];
    var team = split[3];
    var weekPoints = split[4];
    var overallPoints = split[5];
    var price = split[6];
    var positionID = split[7];
    $('#player-in-name-info').text("" + name + " " + surname);
    $('#player-in-team-info').text(team);
    $('#player-in-price').text(price);

    var img = document.createElement("img");
    img.src = "../images/jerseys/" + team + ".png";
    img.style.width = "30px";
    var src = document.getElementById("player-in-jersey-info");
    src.appendChild(img);

    playerIdToBuy = id;
    playerPositionToBuy = playerPositions[positionID];
    playerNameToBuy = surname;
    playerPointsToBuy = overallPoints;
    playerTeamToBuy = team;
    playerPriceToBuy = price;
    playerPositionToBuyInt = positionID;


}



function buyPlayer(id) {


    var type = "PUT";
    var teamID = sessionStorage.getItem("teamid");

    var totalPlayers = 0;

    var _url = "http://hurlingapi.azurewebsites.net/api/teams/id/" + teamID + "/player/id/" + playerIdToBuy;


    $.ajax({
        type: type,
        url: _url,
        async: true,

        success: function(data) {




            sessionStorage.setItem("" + playerPositionToBuy, playerIdToBuy);
            sessionStorage.setItem(playerPositionToBuy + "Name", playerNameToBuy);
            sessionStorage.setItem(playerPositionToBuy + "Jersey", playerTeamToBuy);
            sessionStorage.setItem(playerPositionToBuy + "Price", playerPriceToBuy);
            sessionStorage.setItem(playerPositionToBuy + "Points", playerPointsToBuy);
            sessionStorage.setItem("PlayerPositionWithID" + playerIdToBuy, playerPositionToBuyInt);




            var teamValue = sessionStorage.getItem("teamValue");
            var newTeamValue = teamValue - teamValue - teamValue - playerPriceToBuy;
            var convertedTeamValue = Math.abs(newTeamValue);

            // issue with adding session value and our player value
            //solution seems to be to take budget from budget from budget to get minus
            // our budget, now minus player value from that
            //we have the exact opposite of what we need, for example it should
            //be 56 k , but its -56k, we use math.abs to make negative positive
            var teamBudget = sessionStorage.getItem("teamBudget");
            var newTeamBudget = teamBudget - playerPriceToBuy;


            sessionStorage.setItem("teamValue", convertedTeamValue);
            sessionStorage.setItem("teamBudget", newTeamBudget);



            $('#team-value').text("Team Value: " + convertedTeamValue);
            $('#team-budget-left').text("Budget: " + newTeamBudget);



            totalPlayers = sessionStorage.getItem("myplayercount");
            totalPlayers++;
            sessionStorage.setItem("myplayercount", totalPlayers);
            $("#free-positions-panel").text(8 - totalPlayers);
            setPlayerInfoPanels();


            clearTeamPanel();
        },

        error: function() {

            alert("You cannot add " + playerNameToBuy + " to your team");
            console.log("Cannot add player");

        }


    });



}

function clearTeamPanel() {
    // set jersey to whatever his jersey is set in storage
    var playerJersey = playerTeamToBuy + ".png";
    //set his name also  




    $("#" + playerPositionToBuy).append('<img class="player-droppable-image" src="../images/jerseys/' + playerJersey + '" />' + "<br>");

    $("#" + playerPositionToBuy).append(playerNameToBuy);
    $('#' + playerPositionToBuy).show();




    clearPlayerInformationPanel();

}

function clearPlayerInformationPanel() {
    $('#player-in-name-info').text("");
    $('#player-in-team-info').text("");
    $('#player-in-price').text("");
    $('#player-in-jersey-info').empty();
    playerIdToBuy = null;
}

function fillAllPlayersTable(currentDisplayed) {

    whatToSkip = currentDisplayed - 5;
    $("#player-list-table").find("tr:gt(0)").remove();
    var found = 0;

    while (found < 5) {
        for (var count = 0; count <= currentDisplayed; count++)

        {
            var playerDetails = sessionStorage.getItem("playerInDatabaseDetails" + count);

            if (playerDetails != null && count > whatToSkip && found < 5)

            {
                var split = playerDetails.split('-');
                var id = split[0];
                var name = split[1];
                var surname = split[2];
                var team = split[3];
                var weekPoints = split[4];
                var overallPoints = split[5];
                var price = split[6];
                var positionID = split[7];
                $('#player-list-table').append('<tr id =' + id + ' onclick="getPlayerInfo(' + id + '     )"  ><td>' + playerPositions[positionID] + '</td><td>' + name + " " + surname + '</td><td>' + team + '</td><td>' + weekPoints + '</td><td>' + overallPoints + '</td><td>' + price + '</td></tr>');
                found++;

            }




        }

    }

}

function getPlayerInfo(id) {

    var outputPlayerInfo = sessionStorage.getItem("playerInDatabaseDetails" + id);

    loadPlayerInInformation(outputPlayerInfo);


}
