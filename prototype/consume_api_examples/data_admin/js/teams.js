//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//execute only after DOM is ready
var dataAdminTeamsCode = function() {

	//add path to URL prefix
	_url += "/api/teams";

	//set common DOM element jquery objects
	setTableDOMElements();

	var $name = $("#name");
	var $overallpoints = $("#overallpoints");
	var $lastweekpoints = $("#lastweekpoints");
	var $budget = $("#budget");
	var $league_id = $("#league_id");
	var $user_id = $("#user_id");
	var $player_to_team_div = $("#player_to_team_div");
	var $players_in_team_table_div = $("#players_in_team_table_div");
	var $player_id = $("#player_id");
	var $team_name_span = $(".team_name_span");
	var $player_to_team_form = $("#player_to_team_form");

	var readTeamFromInputFields = function () {

		return {

			Id : $id.val(),
			Name : $name.val(),
			OverAllPoints : $overallpoints.val(),
			LastWeekPoints : $lastweekpoints.val(),
			Budget : $budget.val(),
			LeagueId : $league_id.val(),
			UserId : $user_id.val()
		};
	}

	var fillTeamFields = function (tableRowData) {

		$id.val(tableRowData[1]);
		$name.val(tableRowData[2]);
		$overallpoints.val(tableRowData[3]);
		$lastweekpoints.val(tableRowData[4]);
		$budget.val(tableRowData[5]);
		$league_id.val(tableRowData[6]);
		$user_id.val(tableRowData[7]);
	}

	var rowClickCallback = function() {

		var data = [];
		$.each($(this).children(), function(key, value) {
			data.push(value.textContent);
		});
		
		fillTeamFields(data);
		$player_to_team_div.show();
		getPlayersInTeam(data[1]);
	};

	//examples:
	//.../api/teams?$orderby=OverallPoints --> get all teams ordered by OverallPoints
	//injects table of top items into DOM
	//page.top : how many rows the table will have
	//page.skip: how many rows to skip
	//example: page.top=10 and page.skip=0 --> table with first 10 items
	//page.top=10 and page.skip=10 --> table with from 11 to 20 items
	//page.top=10 and page.skip=20 --> table with from 21 to 30 items
	var getTeams = function(page) {

		var url = _url + "?$top=" + page.top + "&$skip=" + page.skip;

		var successCallback = function (data, textStatus, request) {
            	
	    	var counter_start = page.skip;

			var headers = [
				"Id <span>(PK)</span>",
				"Name <span>(R)</span>",
				"Last Week Points <span>(R)</span>",
				"Overall Points <span>(R)</span>",
				"Budget <span>(R)</span>",
				"League Id <span>(FK)</span>",
				"User Id <span>(FK)</span>"
			];

			var properties = [
				"Id",
				"Name",
				"LastWeekPoints",
				"OverAllPoints",
				"Budget",
				"LeagueId",
				"UserId"
			];

			buildTable(counter_start, headers, properties, data, $table, rowClickCallback);
		}

		ajaxRequest(url, successCallback);
	}

	var getPlayersInTeam = function(teamId) {

		var url = _url + "/id/" + teamId + "/players";

		var successCallback = function (data, textStatus, request) {
            	
	    	var counter_start = 0;

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

			buildTable(counter_start, headers, properties, data, $players_in_team_table_div);
		}

		ajaxRequest(url, successCallback);
	}

	$player_to_team_form.hide();

	_top = $table_rows.val();

	ajaxRequest(_url, function(data, textStatus, request) {

		_count = parseInt(data.length);
		$table_rows_count.val(_count);
		getTeams(tableCurrentPage());
	});

	$table_rows_form.submit(function(event) {

		event.preventDefault();
		_top = $table_rows.val();
		_skip = 0;
		getTeams(tableCurrentPage());
	});

	$previous_page_form.submit(function(event) {

		event.preventDefault();
		getTeams(tablePreviousPage());
	});

	$next_page_form.submit(function(event) {

		event.preventDefault();
		getTeams(tableNextPage());
	});

	//POST PUT DELETE request
	$edit_form.submit(function(event){

		event.preventDefault();

		var url = _url;
		var team = readTeamFromInputFields();
		var successCallback = function (data, textStatus, request) {
            
        	ajaxRequest(_url, function(data, textStatus, request) {

				_count = parseInt(data.length);
				$table_rows_count.val(_count);
				getTeams(tableCurrentPage());
			});

        	clearFormFields([$edit_form]);
        	$players_in_team_table_div.empty();
        	$player_to_team_form.hide();
        	printOutput(textStatus, request);
    	};

		var errorCallback = function(request, textStatus, errorThrown) {

			clearFormFields([$edit_form]);
			$players_in_team_table_div.empty();
        	$player_to_team_form.hide();
			generalErrorCallback(request, textStatus, errorThrown);
		};

		var type = $("#request option:checked").val();
		if (type === "PUT") {
			url = url + "/id/" + team.Id;
		}
		else if (type === "DELETE") {
			url = url + "/id/" + team.Id;
			team = "undefined";
		}

		var dataType = "json";

		ajaxRequest(url, successCallback, errorCallback, type, dataType, team );
	});



	//POST DELETE player to team request
	$player_to_team_form.submit(function(event){

		event.preventDefault();

		var url = _url + "/id/" + $id.val() + "/player/id/" + $player_id.val();

		var successCallback = function (data, textStatus, request) {

			ajaxRequest(_url, function(data, textStatus, request) {

				_count = parseInt(data.length);
				$table_rows_count.val(_count);
				getTeams(tableCurrentPage());
			});
            
        	ajaxRequest(_url, function(data, textStatus, request) {

				_count = parseInt(data.length);
				$table_rows_count.val(_count);
				getPlayersInTeam($id.val());
			});

        	printOutput(textStatus, request);
    	};

		var errorCallback = function(request, textStatus, errorThrown) {

			clearFormFields([$edit_form]);
			$players_in_team_table_div.empty();
        	$player_to_team_div.hide();
			generalErrorCallback(request, textStatus, errorThrown);
		};

		var type = $("#player_to_team_request option:checked").val();

		ajaxRequest(url, successCallback, generalErrorCallback, type);
	});
}