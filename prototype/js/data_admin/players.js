//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//execute only after DOM is ready
var dataAdminPlayersCode = function() {

	//add path to URL prefix
	_url += "/api/players";

	//set common DOM element jquery objects
	setTableDOMElements();

	var $id = $("#id");
	var $firstname = $("#firstname");
	var $lastname = $("#lastname");
	var $gaateam = $("#gaateam");
	var $lastweekpoints = $("#lastweekpoints");
	var $overallpoints = $("#overallpoints");
	var $price = $("#price");
	var $rating = $("#rating");
	var $injured_checkbox = $("#injured");
	var $position_id = $("#position_id");

	var readPlayerFromInputFields = function () {

		return {
			Id : $id.val(),
			FirstName : $firstname.val(),
			LastName : $lastname.val(),
			GaaTeam : $gaateam.val(),
			LastWeekPoints : $lastweekpoints.val(),
			OverallPoints : $overallpoints.val(),
			Price : $price.val(),
			Rating : $rating.val(),
			Injured : $injured_checkbox.attr("checked") === "checked" ? "true" : "false",
			PositionId : $position_id.val()
		};
	}

	var fillPlayerTextFields = function (player) {

		$id.val(player.Id);
		$firstname.val(player.FirstName);
		$lastname.val(player.LastName);
		$gaateam.val(player.GaaTeam);
		$lastweekpoints.val(player.LastWeekPoints);
		$overallpoints.val(player.OverallPoints);
		$price.val(player.Price);
		$rating.val(player.Rating);
		if (player.Injured === "true") {
			$injured_checkbox.attr("checked", "checked");
		} else {
			$injured_checkbox.removeAttr("checked");
		}
		$position_id.val(player.PositionId);
	}

	//examples:
	//.../api/players?$orderby=OverallPoints --> get all players ordered by OverallPoints
	//.../api/players?$filter=PositionId eq 1 --> get all GoalKeepers
	//.../api/players??$filter=Price lt 100000 --> get all players cheaper then 100000
	//injects table of top items into DOM
	//page.top : how many rows the table will have
	//page.skip: how many rows to skip
	//example: page.top=10 and page.skip=0 --> table with first 10 items
	//page.top=10 and page.skip=10 --> table with from 11 to 20 items
	//page.top=10 and page.skip=20 --> table with from 21 to 30 items
	var getPlayers = function(page) {

		var url = _url + "?$top=" + page.top + "&$skip=" + page.skip;
		var successCallback = function (data, textStatus, request) {
            	
	    	var counter_start = page.skip;
			var headers = [
				"Id <span>(PK)</span>",
				"First Name <span>(R)</span>",
				"Last Name <span>(R)</span>",
				"GAA Team <span>(R)</span>",
				"Last Week Points <span>(R)</span>",
				"Overall Points <span>(R)</span>",
				"Price <span>(R)</span>",
				"Rating <span>(R)</span>",
				"Injured <span>(R)</span>",
				"Position Id <span>(FK)</span>"
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
			buildTable(counter_start, headers, properties, data);
		}
		ajaxRequest(url, successCallback);
	}

	_top = $table_rows.val();

	ajaxRequest(_url, function(data, textStatus, request) {

		_count = parseInt(data.length);
		$table_rows_count.val(_count);
		getPlayers(tableCurrentPage());
	});

	$table_rows_form.submit(function(event) {

		event.preventDefault();
		_top = $table_rows.val();
		_skip = 0;
		getPlayers(tableCurrentPage());
	});

	$previous_page_form.submit(function(event) {

		event.preventDefault();
		getPlayers(tablePreviousPage());
	});

	$next_page_form.submit(function(event) {

		event.preventDefault();
		getPlayers(tableNextPage());
	});

	//user by id GET request
	$get_by_id_form.submit(function(event) {

		event.preventDefault();
		var url = _url + "/id/" + $id_field.val();
		var successCallback = function(data, textStatus, request) {
			
			fillPlayerTextFields(data);
            printOutput(textStatus, request);
		}
		ajaxRequest(url, successCallback, generalErrorCallback);
	});

	//POST PUT DELETE request
	$edit_form.submit(function(event){

		event.preventDefault();

		var url = _url;
		var player = readPlayerFromInputFields();
		var successCallback = function (data, textStatus, request) {
            
        	ajaxRequest(_url, function(data, textStatus, request) {

				_count = parseInt(data.length);
				$table_rows_count.val(_count);
				getPlayers(tableCurrentPage());
			});
        	printOutput(textStatus, request);
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

		ajaxRequest(url, successCallback, generalErrorCallback, type, dataType, player );
	});
}

