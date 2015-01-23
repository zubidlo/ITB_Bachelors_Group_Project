//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//this anonymous function (all code of this script is inside this function) is executed after DOM is ready
$(document).ready(function() {

	_url += "/api/positions";

	setTableDOMElements();

	var $_get_by_id_form = $("#get_by_id_form");
	var $_id_field = $("#get_id_input");
	var $_get_by_name_form = $("#get_by_name_form");
	var $_name_field = $("#get_name_input");
	var $_id_edit = $("#id_edit");
	var $_name_edit = $("#name_edit");
	var $_edit_form = $("#edit_form");

	var readPositionFromFields = function () {
		
		return {
			Id : $_id_edit.val(),
			Name : $_name_edit.val()
		};
	}

	var fillPositionFields = function (position) {

		$_id_edit.val(position.Id);
		$_name_edit.val(position.Name);
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
				"Id<span>(PK)</span>",
				"Field Position<span>(R)</span>"
			 ];
			var properties = [
				"Id", 
				"Name"
			];
			buildTable(counter_start, headers, properties, data, $_table_output);
    	}
		ajaxRequest(url, successCallback);
	}

	_top = $_table_rows_input.val();

	ajaxRequest(_url, function(data, textStatus, request) {

		_count = parseInt(data.length);
		$_table_rows_count.val(_count);
		getPositions(tableCurrentPage());
	});

	$_table_rows_form.submit(function(event) {

		event.preventDefault();
		_top = $_table_rows_input.val();
		_skip = 0;
		getPositions(tableCurrentPage());
	});

	$_previous_page_form.submit(function(event) {

		event.preventDefault();
		getPositions(tablePreviousPage());
	});

	$_next_page_form.submit(function(event) {

		event.preventDefault();
		getPositions(tableNextPage());
	});

	//position by id GET request
	$_get_by_id_form.submit(function(event) {

		event.preventDefault();
		var url = _url + "/id/" + $_id_field.val();
		var successCallback = function(data, textStatus, request) {
			
			fillPositionFields(data);
            printOutput($_text_output, textStatus, request);
		}
		var errorCallback = function (request, textStatus, errorThrown) {

    		printError($_text_output, request, textStatus, errorThrown);
       	}
		ajaxRequest(url, successCallback, errorCallback);
	});

	//position by name GET request
	$_get_by_name_form.submit(function(event) {

		event.preventDefault();
		var url = _url + "/name/" + $_name_field.val();
		var successCallback = function (data, textStatus, request) {
            	
        	fillPositionFields(data);
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
		var position = readPositionFromFields();
		var successCallback = function (data, textStatus, request) {
            
        	ajaxRequest(_url, function(data, textStatus, request) {

				_count = parseInt(data.length);
				$_table_rows_count.val(_count);
				getPositions(tableCurrentPage());
			});
        	printOutput($_text_output, textStatus, request);
    	}
    	var errorCallback = function (request, textStatus, errorThrown) {

    		printError($_text_output, request, textStatus, errorThrown);
       	}
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
});

