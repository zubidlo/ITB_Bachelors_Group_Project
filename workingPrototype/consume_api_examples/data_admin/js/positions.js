//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//execute only after DOM is ready
var dataAdminPositionsCode = function() {

	//add path to URL prefix
	_url += "/api/positions";

	//set common DOM element jquery objects
	setTableDOMElements();

	//set specific DOM element jquery objects
	var $name = $("#name");

	var readPositionFromFields = function () {
		
		return {

			Id : $id.val(),
			Name : $name.val()
		};
	}

	var fillPositionFields = function (tableRowData) {

		$id.val(tableRowData[1]);
		$name.val(tableRowData[2]);
	}

	var rowClickCallback = function() {

		var data = [];
		$.each($(this).children(), function(key, value) {
			data.push(value.textContent);
		});
		
		fillPositionFields(data);
	};

	//examples:
	//.../api/positions?$orderby=Name --> get all position ordered by name
	//injects table of top items into DOM
	//page.top : how many rows the table will have
	//page.skip: how many rows to skip
	//example: page.top=10 and page.skip=0 --> table with first 10 items
	//page.top=10 and page.skip=10 --> table with from 11 to 20 items
	//page.top=10 and page.skip=20 --> table with from 21 to 30 items
	var getPositions = function(page) {

		var url = _url + "?$top=" + page.top + "&$skip=" + page.skip;

		var successCallback = function (data, textStatus, request) {
            	
        	var counter_start = page.skip;

			var headers = [
				"Id <span>(PK)</span>",
				"Position Name"
			 ];

			var properties = [
				"Id", 
				"Name"
			];

			buildTable(counter_start, headers, properties, data, $table, rowClickCallback);
    	}

		ajaxRequest(url, successCallback);
	}

	_top = $table_rows.val();

	ajaxRequest(_url, function(data, textStatus, request) {

		_count = parseInt(data.length);
		$table_rows_count.val(_count);
		getPositions(tableCurrentPage());
	});

	$table_rows_form.submit(function(event) {

		event.preventDefault();
		_top = $table_rows.val();
		_skip = 0;
		getPositions(tableCurrentPage());
	});

	$previous_page_form.submit(function(event) {

		event.preventDefault();
		getPositions(tablePreviousPage());
	});

	$next_page_form.submit(function(event) {

		event.preventDefault();
		getPositions(tableNextPage());
	});

	//POST PUT DELETE request
	$edit_form.submit(function(event){

		event.preventDefault();

		var url = _url;

		var position = readPositionFromFields();

		var successCallback = function (data, textStatus, request) {
            
        	ajaxRequest(_url, function(data, textStatus, request) {

				_count = parseInt(data.length);
				$table_rows_count.val(_count);
				getPositions(tableCurrentPage());
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
			url = url + "/id/" + position.Id;
		}
		else if (type === "DELETE") {
			url = url + "/id/" + position.Id;
			position = "undefined";
		}

		var dataType = "json";

		ajaxRequest(url, successCallback, errorCallback, type, dataType, position);
	});
}