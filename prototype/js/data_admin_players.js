//everything inside this function is somehow manipulating DOM (document)
//so document must be ready first for all this code to work
//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//this anonymous function (all code of this script is inside this function) is executed after DOM is ready
$(document).ready(function() {

	//needed DOM elements
	// var $_user_id_field = $("#get_user_id_input");
	// var $_user_username_field = $("#get_user_username_input");
	// var $_user_id_edit = $("#user_id_edit");
	// var $_user_username_edit = $("#user_username_edit");
	// var $_user_password_edit = $("#user_password_edit");
	// var $_user_email_edit = $("#user_email_edit");
	var $_table_output = $("#table_output");
	var $_text_output = $("#text_output");
	var $_previous_page_button = $("#previous_page_button");
	var $_next_page_button = $("#next_page_button");
	// var $_get_user_by_id_form = $("#get_user_by_id_form");
	// var $_get_user_by_username_form = $("#get_user_by_username_form");
	// var $_user_edit_form = $("#user_edit_form");

	//constants
	//var _url = "http://hurlingapi.azurewebsites.net/api/users";
	var _url = "http://localhost:51642/api/players";

	//global variables
	var top = 10;
	var skip = 0;
	var player_count;

	//gets player count
	var updatePlayerCount = function() {
		
		$.ajax({
			url: _url, 
			success: function(data) {
				player_count = data.length;
			}
		});
	}

	updatePlayerCount();

	//this method returns new player object build from web form fields
	// var readPlayerFromInputFields = function () {
		
	// 	var player = {
			
	// 	};
	// 	return player;
	// }

	//fills player edit form input fields with player object properties
	// var fillUserTextFields = function (player) {


	// }

	//all players GET request (support oData queries)
	//examples:
	//.../api/players?$orderby=OverallPoints --> get all players ordered by OverallPoints
	//.../api/players?$filter=PositionId eq 1 --> get all GoalKeepers
	//.../api/players??$filter=Price lt 100000 --> get all players cheaper then 100000
	//
	//injects table of top items into DOM
	//top : how many rows the table will have
	//skip: how many rows to skip
	//example: top=10 and skip=0 --> table with first 10 items
	//top=10 and skip=10 --> table with from 11 to 20 items
	//top=10 and skip=20 --> table with from 21 to 30 items
	var getPlayers = function(top, skip) {

		$.ajax({
            url: _url + "?$orderby=LastName&$top=" + top + "&$skip=" + skip,
            success: function (data) {
            	
            	var counter_start = skip;
				var headers = ["Id<span>(PK)</span>",
								 "FirstName<span>(R)</span>",
								 "LastName<span>(R)</span>",
								 "GaaTeam<span>(R)</span>",
								 "Last Week Points",
								 "OverallPoints",
								 "Price<span>(R)</span>",
								 "Rating<span>(R)</span>",
								 "Injured<span>(R)</span>",
								 "Field Position Id<span>(FK)</span>"];
				var properties = ["Id", 
								"FirstName",
								"LastName",
								"GaaTeam",
								"LastWeekPoints",
								"OverallPoints",
								"Price",
								"Rating",
								"Injured",
								"PositionId"];
				buildTable(counter_start, headers, properties, data, $_table_output);
        	}
		});
	}

	//load the table at start
	getPlayers(top, skip);

	//previous table page load
	$_previous_page_button.on("click", function(event) {
		
		if (skip > 0) {
			skip = skip - top;
			getPlayers(top, skip);
		}
	});

	//next table page load
	$_next_page_button.on("click", function(event) {

		if (skip + top <= player_count) {
			skip = skip + top;
			getPlayers(top, skip);
		}
	});

	// //user by id GET request
	// $_get_user_by_id_form.submit(function(event) {

	// 	event.preventDefault();
	// 	$.ajax({
 //            url: _url + "/id/" + $_user_id_field.val(),
 //            success: function (data, textStatus, request) {
            	
 //            	fillUserTextFields(data);
 //            	$_text_output.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
 //        	},
 //        	error : function (request, textStatus, errorThrown) {

 //        		$_text_output.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
 //           	}
	// 	});
	// });

	// //user by username GET request
	// $_get_user_by_username_form.submit(function(event) {

	// 	event.preventDefault();
	// 	$.ajax({
 //            url: _url + "/username/" + $_user_username_field.val(),
 //            success: function (data, textStatus, request) {
            	
 //            	fillUserTextFields(data);
 //            	$_text_output.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
 //        	},
 //        	error : function (request, textStatus, errorThrown) {

 //        		$_text_output.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
 //           	}
	// 	});
	// });

	// //POST PUT DELETE request
	// $_user_edit_form.submit(function(event){

	// 		event.preventDefault();
	// 		var requestMethod = $("option:checked").val();
	// 		var user = readUserFromInputFields();
	// 		var url = _url;
	// 		var resultMessage;

	// 		switch(requestMethod) {
	// 			case "PUT" :
	// 				url = url + "/id/" + user.Id;
	// 				resultMessage = "You edited the user:" + JSON.stringify(user);
	// 				break;
	// 			case "DELETE" :
	// 				url = url + "/id/" + user.Id;
	// 				resultMessage = "You deleted the user with Id:" + user.Id;
	// 				user = undefined;
	// 				break;
	// 			case "POST" : 
	// 				resultMessage = "You created new user:" + JSON.stringify(user);
	// 				break;
	// 		}

	// 		$.ajax({
	//             type: requestMethod,
	//             url: url,
	//             data: user,
	//             dataType: "json",
	//             success: function (data, textStatus, request) {
	            
	//             	getUsers(top, skip);
	//             	if (requestMethod !== "PUT") {
	//             		updateUserCount();
	//             	}
	            	
	//             	$_text_output.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
	//         	},
	//         	error : function (request, textStatus, errorThrown) {
	        		
	//         		$_text_output.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
	//         	}
	// 		});
		
	// });
});

