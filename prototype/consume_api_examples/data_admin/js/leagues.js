//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//execute only after DOM is ready
var dataAdminLeaguesCode = function() {

	//add path to URL prefix
	_url += "/api/leagues";

	//set common DOM element jquery objects
	setTableDOMElements();
	
	var $edit_form = $("#edit_form");
	var $id = $("#id");
	var $name = $("#name");
	var $nextfixtures = $("#nextfixtures");
	var $week = $("#week");

	var readLeagueFromInputFields = function () {
		
		return {
			Id : $id.val(),
			Name : $name.val(),
			NextFixtures : $nextfixtures.val(),
			Week : $week.val()
		};
	}

	var fillLeagueTextFields = function (league) {
		console.dir(league);
		$id.val(league.Id);
		$name.val(league.Name);
		$nextfixtures.val(league.NextFixtures);
		$week.val(league.Week);
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
				"Id <span>(PK)</span>",
				"Name <span>(R)</span>",
				"Next Fixtures <span>(R)</span>",
				"Week<span> (R)</span>"
			];
			var properties = [
				"Id",
				"Name",
				"NextFixtures",
				"Week"
			];
			buildTable(counter_start, headers, properties, data, $table);
    	}
		ajaxRequest(url, successCallback);
	}

	_top = $table_rows.val();

	ajaxRequest(_url, function(data, textStatus, request) {

		_count = parseInt(data.length);
		$table_rows_count.val(_count);
		getLeagues(tableCurrentPage());
	});
	
	$table_rows_form.submit(function(event) {

		event.preventDefault();
		_top = $table_rows.val();
		_skip = 0;
		getLeagues(tableCurrentPage());
	});

	$previous_page_form.submit(function(event) {

		event.preventDefault();
		getLeagues(tablePreviousPage());
	});

	$next_page_form.submit(function(event) {

		event.preventDefault();
		getLeagues(tableNextPage());
	});

	//user by id GET request
	$get_by_id_form.submit(function(event) {

		event.preventDefault();
		var url = _url + "/id/" + $get_id.val();
		console.log(url);
		var successCallback = function(data, textStatus, request) {
			
			console.log(data);
			fillLeagueTextFields(data);
            printOutput(textStatus, request);
		}
		ajaxRequest(url, successCallback, generalErrorCallback);
	});

	//POST PUT DELETE request
	$edit_form.submit(function(event){

		event.preventDefault();

		var url = _url;
		var league = readLeagueFromInputFields();
		var successCallback = function (data, textStatus, request) {
            
        	ajaxRequest(_url, function(data, textStatus, request) {

				_count = parseInt(data.length);
				$table_rows_count.val(_count);
				getLeagues(tableCurrentPage());
			});

			clearFormFields([$get_by_id_form, $edit_form, $get_by_name_form]);
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

