//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//execute only after DOM is ready
var dataAdminTeamsCode = function() {

	//add path to URL prefix
	_url += "/api/teams";

	//set common DOM element jquery objects
	setTableDOMElements();

	var $get_by_name_form = $("#get_by_name_form");
	var $get_name = $("#get_name");
	var $id = $("#id");
	var $name = $("#name");
	var $overallpoints = $("#overallpoints");
	var $lastweekpoints = $("#lastweekpoints");
	var $budget = $("#budget");
	var $league_id = $("#league_id");
	var $user_id = $("#user_id");

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

	var fillTeamTextFields = function (team) {

		$id.val(team.Id);
		$name.val(team.Name);
		$overallpoints.val(team.OverAllPoints);
		$lastweekpoints.val(team.LastWeekPoints);
		$budget.val(team.Budget);
		$league_id.val(team.LeagueId);
		$user_id.val(team.UserId);
	}

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
			buildTable(counter_start, headers, properties, data);
		}
		ajaxRequest(url, successCallback);
	}

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

	//user by id GET request
	$get_by_id_form.submit(function(event) {

		event.preventDefault();
		var url = _url + "/id/" + $get_id.val();
		var successCallback = function(data, textStatus, request) {
			
			fillTeamTextFields(data);
            printOutput(textStatus, request);
		}
		ajaxRequest(url, successCallback, generalErrorCallback);
	});

	//team by name GET request
	$get_by_name_form.submit(function(event) {

		event.preventDefault();
		var url = _url + "/name/" + $get_name.val();
		var successCallback = function(data, textStatus, request) {
            	
        	fillTeamTextFields(data);
        	printOutput(textStatus, request);
    	}
		ajaxRequest(url, successCallback, generalErrorCallback);
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
        	printOutput(textStatus, request);
    	}
		var type = $("option:checked").val();
		if (type === "PUT") {
			url = url + "/id/" + team.Id;
		}
		else if (type === "DELETE") {
			url = url + "/id/" + team.Id;
			team = "undefined";
		}
		var dataType = "json";

		ajaxRequest(url, successCallback, generalErrorCallback, type, dataType, team );
	});
}

