//everything inside this function is somehow manipulating DOM (document)
//so document must be ready first for all this code to work
//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//this anonymous function (all code of this script is inside this function) is executed after DOM is ready
$(document).ready(function() {

	//url
	_url += "/api/players";

	//needed DOM elements into jquery objets
	var $_table_rows_form = $("#table_rows_form");
	var $_table_rows_input = $("#table_rows_input");
	var $_table_output = $("#table_output");
	var $_text_output = $("#text_output");
	var $_previous_page_button = $("#previous_page_button");
	var $_next_page_button = $("#next_page_button");
	var $_get_by_id_form = $("#get_by_id_form");
	var $_id_field = $("#get_id_input");
	var $_edit_form = $("#edit_form");
	var $_id_edit = $("#id_edit");
	var $_firstname_edit = $("#firstname_edit");
	var $_lastname_edit = $("#lastname_edit");
	var $_gaateam_edit = $("#gaateam_edit");
	var $_lastweekpoints_edit = $("#lastweekpoints_edit");
	var $_overallpoints_edit = $("#overallpoints_edit");
	var $_price_edit = $("#price_edit");
	var $_rating_edit = $("#rating_edit");
	var $_injured_checkbox = $(":checkbox");
	var $_position_id_edit = $("#position_id_edit");

	//this method returns new player object build from web form fields
	// var readPlayerFromInputFields = function () {
		
	// 	var player = {
			
	// 	};
	// 	return player;
	// }

	//fills player edit form input fields with player object properties
	var fillPlayerTextFields = function (player) {

		console.dir(player);
		$_id_edit.val(player.Id);
		$_firstname_edit.val(player.FirstName);
		$_lastname_edit.val(player.LastName);
		$_gaateam_edit.val(player.GaaTeam);
		$_lastweekpoints_edit.val(player.LastWeekPoints);
		$_overallpoints_edit.val(player.OverallPoints);
		$_price_edit.val(player.Price);
		$_rating_edit.val(player.Rating);
		
		if (player.Injured === "true") {
			$_injured_checkbox.val("checked", "checked");
		} else {
			$_injured_checkbox.removeAttr("checked");
		}
		
		$_position_id_edit.val(player.PositionId);
	}

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

		// console.log(top);
		// console.log(skip);
		// console.log(_count);
		$.ajax({
            url: _url + "?$orderby=LastName&$top=" + top + "&$skip=" + skip,
            success: function (data) {
            	
            	var counter_start = skip;
				var headers = ["Id<span>(PK)</span>",
								 "FirstName<span>(R)</span>",
								 "LastName<span>(R)</span>",
								 "GaaTeam<span>(R)</span>",
								 "Last Week Points<span>(R)</span>",
								 "OverallPoints<span>(R)</span>",
								 "Price<span>(R)</span>",
								 "Rating<span>(R)</span>",
								 "Injured<span>(R)</span>",
								 "Position Id<span>(FK)</span>"];
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

	_top = $_table_rows_input.val();

	//set global variable count and load table
	updateCount(_url, function() {
		getPlayers(_top, _skip);
	});

	$_table_rows_form.submit(function(event) {

		event.preventDefault();
		_top = $_table_rows_input.val();
		_skip = 0;
		getPlayers(_top, _skip);
	});

	$_previous_page_button.on("click", function() {

		event.preventDefault();
		_skip = tablePreviousPage(_top, _skip);
		getPlayers(_top, _skip);
	});

	$_next_page_button.on("click", function() {

		event.preventDefault();
		_skip = tableNextPage(_top, _skip, _count);
		getPlayers(_top, _skip);
	});

	// //user by id GET request
	$_get_by_id_form.submit(function(event) {

		event.preventDefault();
		$.ajax({
            url: _url + "/id/" + $_id_field.val(),
            success: function (data, textStatus, request) {

            	console.log("success");
            	fillPlayerTextFields(data);
            	$_text_output.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
        	},
        	error : function (request, textStatus, errorThrown) {

        		$_text_output.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
           	}
		});
	});

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
	            
	//             	updateCount(_url, function() {
	//					getPlayers(_top, _skip);
	//				});
	//             	$_text_output.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
	//         	},
	//         	error : function (request, textStatus, errorThrown) {
	        		
	//         		$_text_output.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
	//         	}
	// 		});
		
	// });
});

