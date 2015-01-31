//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//execute only after DOM is ready
var dataAdminPlayersCode = function() {

	//add path to URL prefix
	_url += "/api/players";

	//set common DOM element jquery objects
	setTableDOMElements();

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

	var fillPlayerTextFields = function (tableRowData) {

		$id.val(tableRowData[1]);
		$firstname.val(tableRowData[2]);
		$lastname.val(tableRowData[3]);
		$gaateam.val(tableRowData[4]);
		$lastweekpoints.val(tableRowData[5]);
		$overallpoints.val(tableRowData[6]);
		$price.val(tableRowData[7]);
		$rating.val(tableRowData[8]);
		if (tableRowData[9] === "true") {
			$injured_checkbox.attr("checked", "checked");
		} else {
			$injured_checkbox.removeAttr("checked");
		}
		$position_id.val(tableRowData[10]);
	}

	var rowClickCallback = function() {

		var data = [];
		$.each($(this).children(), function(key, value) {
			data.push(value.textContent);
		});
		
		fillPlayerTextFields(data);
	};


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

			var headers = 
			[
				"Id <span>(PK)</span>",
				"First Name",
				"Last Name",
				"GAA Team",
				"Last Week Points",
				"Overall Points",
				"Price",
				"Rating",
				"Injured",
				"Position Id <span>(FK)</span>"
			];

			var properties = 
			[
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

			buildTable(counter_start, headers, properties, data, $table, rowClickCallback);
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
        	clearFormFields([$edit_form]);
    	};

    	var errorCallback = function(request, textStatus, errorThrown) {

			clearFormFields([$edit_form]);
			generalErrorCallback(request, textStatus, errorThrown);
		};
		
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
}

