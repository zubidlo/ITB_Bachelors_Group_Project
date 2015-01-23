//everything inside this function is somehow manipulating DOM (document)
//so document must be ready first for all this code to work
//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//this anonymous function (all code of this script is inside this function) is executed after DOM is ready
$(document).ready(function() {

	//url
	_url += "/api/users";

	//needed DOM elements into jquery objects
	var $_table_rows_form = $("#table_rows_form");
	var $_table_rows_input = $("#table_rows_input");
	var $_previous_page_form = $("#previous_page_form");
	var $_next_page_form = $("#next_page_form");
	var $_table_rows_count = $("#table_rows_count");
	var $_get_by_id_form = $("#get_by_id_form");
	var $_id_field = $("#get_id_input");
	var $_username_field = $("#get_username_input");
	var $_id_edit = $("#id_edit");
	var $_username_edit = $("#username_edit");
	var $_password_edit = $("#password_edit");
	var $_email_edit = $("#email_edit");
	var $_table_output = $("#table_output");
	var $_text_output = $("#text_output");
	var $_get_by_username_form = $("#get_by_username_form");
	var $_edit_form = $("#edit_form");

	//this method returns new user object build from web form fields
	var readUserFromInputFields = function () {
		
		return {
			Id : $_id_edit.val(),
			Username : $_username_edit.val(),
			Password : $_password_edit.val(),
			Email : $_email_edit.val()
		};
	}

	//fills user edit form input fields with user object properties
	var fillUserTextFields = function (user) {

		$_id_edit.val(user.Id);
		$_username_edit.val(user.Username);
		$_password_edit.val(user.Password);
		$_email_edit.val(user.Email);

	}

	//all users GET request (support oData queries)
	//examples:
	//.../api/users?$orderby=Username --> get all user ordered by username
	//.../api/users?$filter=Email eq 'zubidlo'gmail.com' --> get all users which Email equals 'zubidlo'gmail.com'
	//.../api/users?$top=10&$skip=30 --> get 10 users but skip first 30 (31,32.....,40)
	//
	//injects table of top items into DOM
	//top : how many rows the table will have
	//skip: how many rows to skip
	//example: top=10 and skip=0 --> table with first 10 items
	//top=10 and skip=10 --> table with from 11 to 20 items
	//top=10 and skip=20 --> table with from 21 to 30 items
	var getUsers = function(page) {

		var url = _url + "?$top=" + page.top + "&$skip=" + page.skip;
		var successCallback = function (data, textStatus, request) {
            	
        	var counter_start = page.skip;
			var headers = [
				"Id<span>(PK)</span>",
				"Username<span>(R)</span>",
				"Password<span>(R)</span>",
				"Email<span>(R)</span>"
			];
			var properties = [
			"Id",
				"Username",
				"Password",
				"Email"
			];
			buildTable(counter_start, headers, properties, data, $_table_output);
    	}
		ajaxRequest(url, successCallback);
	}

	//set table page rows
	_top = $_table_rows_input.val();

	//set global variable count
	ajaxRequest(_url, function(data, textStatus, request) {

		_count = parseInt(data.length);
		$_table_rows_count.val(_count);
		getUsers(tableCurrentPage());
	});
	
	$_table_rows_form.submit(function(event) {

		event.preventDefault();
		_top = $_table_rows_input.val();
		_skip = 0;
		getUsers(tableCurrentPage());
	});

	$_previous_page_form.submit(function(event) {

		event.preventDefault();
		getUsers(tablePreviousPage());
	});

	$_next_page_form.submit(function(event) {

		event.preventDefault();
		getUsers(tableNextPage());
	});

	//user by id GET request
	$_get_by_id_form.submit(function(event) {

		event.preventDefault();
		var url = _url + "/id/" + $_id_field.val();
		var successCallback = function(data, textStatus, request) {
			
			fillUserTextFields(data);
            printOutput($_text_output, textStatus, request);
		}
		var errorCallback = function (request, textStatus, errorThrown) {

    		printError($_text_output, request, textStatus, errorThrown);
       	}
		ajaxRequest(url, successCallback, errorCallback);
	});

	//user by username GET request
	$_get_by_username_form.submit(function(event) {

		event.preventDefault();
		var url = _url + "/username/" + $_username_field.val();
		var successCallback = function(data, textStatus, request) {
            	
        	fillUserTextFields(data);
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
		var user = readUserFromInputFields();
		var successCallback = function (data, textStatus, request) {
            
        	ajaxRequest(_url, function(data, textStatus, request) {

				_count = parseInt(data.length);
				$_table_rows_count.val(_count);
				getUsers(tableCurrentPage());
			});
        	printOutput($_text_output, textStatus, request);
    	}
    	var errorCallback = function (request, textStatus, errorThrown) {

    		printError($_text_output, request, textStatus, errorThrown);
       	}
		var type = $("option:checked").val();
		if (type === "PUT") {
			url = url + "/id/" + user.Id;
		}
		else if (type === "DELETE") {
			url = url + "/id/" + user.Id;
			user = "undefined";
		}
		var dataType = "json";

		ajaxRequest(url, successCallback, errorCallback, type, dataType, user);
	});
});

