//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//execute only after DOM is ready
var dataAdminPositionsCode = function() {

	//add path to URL prefix
	_url += "/api/positions";

	//set common DOM element jquery objects
	setTableDOMElements();

	//set specific DOM element jquery objects
	var $get_by_name_form = $("#get_by_name_form");
	var $get_name = $("#get_name");
	var $id = $("#id");
	var $name = $("#name");

	var readPositionFromFields = function () {
		
		return {
			Id : $id.val(),
			Name : $name.val()
		};
	}

	var fillPositionFields = function (position) {

		$id.val(position.Id);
		$name.val(position.Name);
	}

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
				"Field Position <span>(R)</span>"
			 ];
			var properties = [
				"Id", 
				"Name"
			];
			buildTable(counter_start, headers, properties, data, $table);
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

	//position by id GET request
	$get_by_id_form.submit(function(event) {

		event.preventDefault();

		var url = _url + "/id/" + $get_id.val();
		var successCallback = function(data, textStatus, request) {
			
			fillPositionFields(data);
            printOutput(textStatus, request);
		};

		var errorCallback = function(request, textStatus, errorThrown) {

			clearFormFields([$get_by_id_form, $edit_form, $get_by_name_form]);
			generalErrorCallback(request, textStatus, errorThrown);
		};

		ajaxRequest(url, successCallback, errorCallback);
	});

	//position by name GET request
	$get_by_name_form.submit(function(event) {

		event.preventDefault();

		var url = _url + "/name/" + $get_name.val();
		var successCallback = function (data, textStatus, request) {
            	
        	fillPositionFields(data);
        	printOutput(textStatus, request);
    	};

		var errorCallback = function(request, textStatus, errorThrown) {

			clearFormFields([$get_by_id_form, $edit_form, $get_by_name_form]);
			generalErrorCallback(request, textStatus, errorThrown);
		};

		ajaxRequest(url, successCallback, errorCallback);
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
        	clearFormFields([$get_by_id_form, $edit_form, $get_by_name_form]);
    	};

		var errorCallback = function(request, textStatus, errorThrown) {

			clearFormFields([$get_by_id_form, $edit_form, $get_by_name_form]);
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

