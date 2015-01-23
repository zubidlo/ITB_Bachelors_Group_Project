//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//execute only after DOM is ready
var dataAdminLeaguesCode = function() {

	_url += "/api/leagues";

	setTableDOMElements();
	
	var $_get_by_id_form = $("#get_by_id_form");
	var $_id_field = $("#get_id_input");
	var $_edit_form = $("#edit_form");
	var $_id_edit = $("#id_edit");
	var $_name_edit = $("#name_edit");
	var $_nextfixtures_edit = $("#nextfixtures_edit");
	var $_week_edit = $("#week_edit");

	var readLeagueFromInputFields = function () {
		
		return {
			Id : $_id_edit.val(),
			Name : $_name_edit.val(),
			NextFixtures : $_nextfixtures_edit.val(),
			Week : $_week_edit.val()
		};
	}

	var fillLeagueTextFields = function (league) {

		$_id_edit.val(league.Id);
		$_name_edit.val(league.Name);
		$_nextfixtures_edit.val(league.NextFixtures);
		$_week_edit.val(league.Week);
	}

	//examples:
	//.../api/leagues?$orderby=Name --> get all leagues ordered by username
	//injects table of top items into DOM
	//page.top : how many rows the table will have
	//page.skip: how many rows to skip
	//example: page.top=10 and page.skip=0 --> table with first 10 items
	//page.top=10 and page.skip=10 --> table with from 11 to 20 items
	//page.top=10 and page.skip=20 --> table with from 21 to 30 items
	var getLeagues = function(page) {

		var url = _url + "?$top=" + page.top + "&$skip=" + page.skip;
		var successCallback = function (data, textStatus, request) {
            	
        	var counter_start = page.skip;
			var headers = [
				"Id<span>(PK)</span>",
				"Name<span>(R)</span>",
				"NextFixtures<span>(R)</span>",
				"Week<span>(R)</span>"
			];
			var properties = [
				"Id",
				"Name",
				"NextFixtures",
				"Week"
			];
			buildTable(counter_start, headers, properties, data);
    	}
		ajaxRequest(url, successCallback);
	}

	_top = $_table_rows_input.val();

	ajaxRequest(_url, function(data, textStatus, request) {

		_count = parseInt(data.length);
		$_table_rows_count.val(_count);
		getLeagues(tableCurrentPage());
	});
	
	$_table_rows_form.submit(function(event) {

		event.preventDefault();
		_top = $_table_rows_input.val();
		_skip = 0;
		getLeagues(tableCurrentPage());
	});

	$_previous_page_form.submit(function(event) {

		event.preventDefault();
		getLeagues(tablePreviousPage());
	});

	$_next_page_form.submit(function(event) {

		event.preventDefault();
		getLeagues(tableNextPage());
	});

	//user by id GET request
	$_get_by_id_form.submit(function(event) {

		event.preventDefault();
		var url = _url + "/id/" + $_id_field.val();
		var successCallback = function(data, textStatus, request) {
			
			fillLeagueTextFields(data);
            printOutput(textStatus, request);
		}
		ajaxRequest(url, successCallback, generalErrorCallback);
	});

	//POST PUT DELETE request
	$_edit_form.submit(function(event){

		event.preventDefault();

		var url = _url;
		var league = readLeagueFromInputFields();
		var successCallback = function (data, textStatus, request) {
            
        	ajaxRequest(_url, function(data, textStatus, request) {

				_count = parseInt(data.length);
				$_table_rows_count.val(_count);
				getLeagues(tableCurrentPage());
			});
        	printOutput(textStatus, request);
    	}
		var type = $("option:checked").val();
		if (type === "PUT") {
			url = url + "/id/" + league.Id;
		}
		else if (type === "DELETE") {
			url = url + "/id/" + league.Id;
			league = "undefined";
		}
		var dataType = "json";

		ajaxRequest(url, successCallback, generalErrorCallback, type, dataType, league);
	});
}

