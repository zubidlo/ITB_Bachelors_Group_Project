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
	var $_previous_page_form = $("#previous_page_form");
	var $_next_page_form = $("#next_page_form");
	var $_table_rows_count = $("#table_rows_count");
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
	var readPlayerFromInputFields = function () {
		
		return {
			Id : $_id_edit.val(),
			FirstName : $_firstname_edit.val(),
			LastName : $_lastname_edit.val(),
			GaaTeam : $_gaateam_edit.val(),
			LastWeekPoints : $_lastweekpoints_edit.val(),
			OverallPoints : $_overallpoints_edit.val(),
			Price : $_price_edit.val(),
			Rating : $_rating_edit.val(),
			Injured : $_injured_checkbox.val("checked") === "checked" ? "true" : "false",
			PositionId : $_position_id_edit.val()
		};
	}

	//fills player edit form input fields with player object properties
	var fillPlayerTextFields = function (player) {

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
	var getPlayers = function(page) {

		var url = _url + "?$top=" + page.top + "&$skip=" + page.skip;
		var successCallback = function (data, textStatus, request) {
            	
	    	var counter_start = page.skip;
			var headers = [
				"Id<span>(PK)</span>",
				"FirstName<span>(R)</span>",
				"LastName<span>(R)</span>",
				"GaaTeam<span>(R)</span>",
				"Last Week Points<span>(R)</span>",
				"OverallPoints<span>(R)</span>",
				"Price<span>(R)</span>",
				"Rating<span>(R)</span>",
				"Injured<span>(R)</span>",
				"Position Id<span>(FK)</span>"
			];
			var properties = [
				"Id",
				"FirstName",
				"LastName",
				"GaaTeam",
				"LastWeekPoints",
				"OverallPoints",
				"Price", "Rating",
				"Injured",
				"PositionId"
			];
			buildTable(counter_start, headers, properties, data, $_table_output);
		}
		ajaxRequest(url, successCallback);
	}

	_top = $_table_rows_input.val();

	ajaxRequest(_url, function(data, textStatus, request) {

		_count = parseInt(data.length);
		$_table_rows_count.val(_count);
		getPlayers(tableCurrentPage());
	});

	$_table_rows_form.submit(function(event) {

		event.preventDefault();
		_top = $_table_rows_input.val();
		_skip = 0;
		getPlayers(tableCurrentPage());
	});

	$_previous_page_form.submit(function(event) {

		event.preventDefault();
		getPlayers(tablePreviousPage());
	});

	$_next_page_form.submit(function(event) {

		event.preventDefault();
		getPlayers(tableNextPage());
	});

	//user by id GET request
	$_get_by_id_form.submit(function(event) {

		event.preventDefault();
		var url = _url + "/id/" + $_id_field.val();
		var successCallback = function(data, textStatus, request) {
			
			fillPlayerTextFields(data);
            printOutput($_text_output, textStatus, request);
		}
		var errorCallback = function (request, textStatus, errorThrown) {

    		printError($_text_output, request, textStatus, errorThrown);
       	}

		ajaxRequest(url, successCallback, errorCallback);
	});

	//POST PUT DELETE request
	$_edit_form.submit(function(event){

		event.preventDefault();

		var url = _url;
		var player = readPlayerFromInputFields();
		var successCallback = function (data, textStatus, request) {
            
        	ajaxRequest(_url, function(data, textStatus, request) {

				_count = parseInt(data.length);
				$_table_rows_count.val(_count);
				getPlayers(tableCurrentPage());
			});
        	printOutput($_text_output, textStatus, request);
    	}
    	var errorCallback = function (request, textStatus, errorThrown) {

    		printError($_text_output, request, textStatus, errorThrown);
       	}
		var type = $("option:checked").val();
		if (type === "PUT") {
			url = url + "/id/" + player.Id;
		}
		else if (type === "DELETE") {
			url = url + "/id/" + player.Id;
			player = "undefined";
		}
		var dataType = "json";

		ajaxRequest(url, successCallback, errorCallback, type, dataType, player );
	});
});

