//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//execute only after DOM is ready
var dataAdminLeaguesCode = function() {

	//add path to URL prefix
	_url += "/api/leagues";

	//set common DOM element jquery objects
	setTableDOMElements();
	
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

	var fillLeagueTextFields = function (tableRowData) {

		$id.val(tableRowData[1]);
		$name.val(tableRowData[2]);
		$nextfixtures.val(tableRowData[3]);
		$week.val(tableRowData[4]);
	}

	var rowClickCallback = function() {

		var data = [];
		$.each($(this).children(), function(key, value) {
			data.push(value.textContent);
		});
		
		fillLeagueTextFields(data);
	};

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

			buildTable(counter_start, headers, properties, data, $table, rowClickCallback);
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

			clearFormFields([$edit_form]);
        	printOutput(textStatus, request);
    	};

    	var errorCallback = function(request, textStatus, errorThrown) {

			clearFormFields([$edit_form]);
			generalErrorCallback(request, textStatus, errorThrown);
		};

		var type = $("option:checked").val();

		if (type === "PUT") {

			url = url + "/id/" + league.Id;
		}
		else if (type === "DELETE") {
			
			url = url + "/id/" + league.Id;
			league = "undefined";
		}

		var dataType = "json";

		ajaxRequest(url, successCallback, errorCallback, type, dataType, league);
	});
}

