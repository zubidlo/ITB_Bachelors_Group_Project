//everything inside this function is somehow manipulating DOM (document)
//so document must be ready first for all this code to work
//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//this anonymous function (all code of this script is inside this function) is executed after DOM is ready
$(document).ready(function() {

	//url
	_url += "/api/positions";

	//needed DOM elements into jquery objects
	var $_table_rows_form = $("#table_rows_form");
	var $_table_rows_input = $("#table_rows_input");
	var $_table_output = $("#table_output");
	var $_text_output = $("#text_output");
	var $_previous_page_form = $("#previous_page_form");
	var $_next_page_form = $("#next_page_form");
	var $_table_rows_count = $("#table_rows_count");
	var $_id_field = $("#get_id_input");
	var $_name_field = $("#get_name_input");
	var $_id_edit = $("#id_edit");
	var $_name_edit = $("#name_edit");
	var $_get_by_id_form = $("#get_by_id_form");
	var $_get_by_name_form = $("#get_by_name_form");
	var $_edit_form = $("#edit_form");

	//this method returns new position object build from web form fields
	var readPositionFromFields = function () {
		
		return {
			Id : $_id_edit.val(),
			Name : $_name_edit.val()
		};
	}

	//fills user edit form input fields with user object properties
	var fillPositionFields = function (position) {

		$_id_edit.val(position.Id);
		$_name_edit.val(position.Name);
	}

	//all positions GET request (support oData queries)
	//examples:
	//.../api/positions?$orderby=Name --> get all position ordered by name
	//
	//injects table of top items into DOM
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

