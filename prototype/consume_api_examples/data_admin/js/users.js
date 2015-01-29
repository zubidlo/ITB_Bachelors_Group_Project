//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//execute only after DOM is ready
var dataAdminUsersCode = function() {

	//add path to URL prefix
	_url += "/api/users";

	//set common DOM element jquery objects
	setTableDOMElements();
	
	//set specific DOM element jquery objects
	var $get_by_username_form = $("#get_by_username_form");
	var $get_username = $("#get_username");
	var $username = $("#username");
	var $password = $("#password");
	var $email = $("#email");
	
	var readUserFromInputFields = function () {
		
		return {
			Id : $id.val(),
			Username : $username.val(),
			Password : $password.val(),
			Email : $email.val()
		};
	}

	var fillUserTextFields = function (user) {

		$id.val(user.Id);
		$username.val(user.Username);
		$password.val(user.Password);
		$email.val(user.Email);
	}

	//examples:
	//.../api/users?$orderby=Username --> get all user ordered by username
	//.../api/users?$filter=Email eq 'zubidlo'gmail.com' --> get all users which Email equals 'zubidlo'gmail.com'
	//.../api/users?$top=10&$skip=30 --> get 10 users but skip first 30 (31,32.....,40)
	//injects table of top items into DOM
	//page.top : how many rows the table will have
	//page.skip: how many rows to skip
	//example: page.top=10 and page.skip=0 --> table with first 10 items
	//page.top=10 and page.skip=10 --> table with from 11 to 20 items
	//page.top=10 and page.skip=20 --> table with from 21 to 30 items
	var getUsers = function(page) {

		var url = _url + "?$top=" + page.top + "&$skip=" + page.skip;
		var successCallback = function (data, textStatus, request) {
            	
        	var counter_start = page.skip;
			var headers = [
				"Id <span>(PK)</span>",
				"User Name <span>(R)</span>",
				"Password <span>(R)</span>",
				"Email <span>(R)</span>"
			];
			var properties = [
				"Id",
				"Username",
				"Password",
				"Email"
			];
			buildTable(counter_start, headers, properties, data, $table);
    	}
		ajaxRequest(url, successCallback);
	}

	_top = $table_rows.val();

	ajaxRequest(_url, function(data, textStatus, request) {

		_count = parseInt(data.length);
		$table_rows_count.val(_count);
		getUsers(tableCurrentPage());
	});
	
	$table_rows_form.submit(function(event) {

		event.preventDefault();
		_top = $table_rows.val();
		_skip = 0;
		getUsers(tableCurrentPage());
	});

	$previous_page_form.submit(function(event) {

		event.preventDefault();
		getUsers(tablePreviousPage());
	});

	$next_page_form.submit(function(event) {

		event.preventDefault();
		getUsers(tableNextPage());
	});

	//user by id GET request
	$get_by_id_form.submit(function(event) {

		event.preventDefault();
		var url = _url + "/id/" + $get_id.val();
		var successCallback = function(data, textStatus, request) {
			
			fillUserTextFields(data);
            printOutput(textStatus, request);
		};

		var errorCallback = function(request, textStatus, errorThrown) {

			clearFormFields([$get_by_id_form, $edit_form, $get_by_username_form]);
			generalErrorCallback(request, textStatus, errorThrown);
		};

		ajaxRequest(url, successCallback, errorCallback);
	});

	//user by username GET request
	$get_by_username_form.submit(function(event) {

		event.preventDefault();
		var url = _url + "/username/" + $get_username.val();
		var successCallback = function(data, textStatus, request) {
            	
        	fillUserTextFields(data);
        	printOutput(textStatus, request);
    	};

		var errorCallback = function(request, textStatus, errorThrown) {

			clearFormFields([$get_by_id_form, $edit_form, $get_by_username_form]);
			generalErrorCallback(request, textStatus, errorThrown);
		};

		ajaxRequest(url, successCallback, errorCallback);
	});

	//POST PUT DELETE request
	$edit_form.submit(function(event){

		event.preventDefault();

		var url = _url;
		var user = readUserFromInputFields();
		var successCallback = function (data, textStatus, request) {
            
        	ajaxRequest(_url, function(data, textStatus, request) {

				_count = parseInt(data.length);
				$table_rows_count.val(_count);
				getUsers(tableCurrentPage());
			});

        	printOutput(textStatus, request);
        	clearFormFields([$get_by_id_form, $edit_form, $get_by_username_form]);
    	};

		var errorCallback = function(request, textStatus, errorThrown) {

			clearFormFields([$get_by_id_form, $edit_form, $get_by_username_form]);
			generalErrorCallback(request, textStatus, errorThrown);
		};

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
}