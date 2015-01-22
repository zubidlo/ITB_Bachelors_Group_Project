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
	var $_get_by_id_form = $("#get_by_id_form");
	var $_id_field = $("#get_id_input");
	var $_username_field = $("#get_username_input");
	var $_id_edit = $("#id_edit");
	var $_username_edit = $("#username_edit");
	var $_password_edit = $("#password_edit");
	var $_email_edit = $("#email_edit");
	var $_table_output = $("#table_output");
	var $_text_output = $("#text_output");
	var $_previous_page_button = $("#previous_page_button");
	var $_next_page_button = $("#next_page_button");
	var $_get_by_username_form = $("#get_by_username_form");
	var $_edit_form = $("#edit_form");

	//this method returns new user object build from web form fields
	var readUserFromInputFields = function () {
		
		var user = {
			Id : $_id_edit.val(),
			Username : $_username_edit.val(),
			Password : $_password_edit.val(),
			Email : $_email_edit.val()
		};
		return user;
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
	var getUsers = function(top, skip) {

		$.ajax({
            url: _url + "?$orderby=Username&$top=" + top + "&$skip=" + skip,
            success: function (data) {
            	
            	var counter_start = skip;
				var headers = ["Id<span>(PK)</span>", "Username<span>(R)</span>", "Password<span>(R)</span>", "Email<span>(R)</span>"];
				var properties = ["Id", "Username", "Password", "Email"];
				buildTable(counter_start, headers, properties, data, $_table_output);
        	}
		});
	}

	//set table page rows
	_top = $_table_rows_input.val();

	//set global variable count
	updateCount(_url , function() {
		getUsers(_top, _skip);
	});
	
	$_table_rows_form.submit(function(event) {

		event.preventDefault();
		_top = $_table_rows_input.val();
		_skip = 0;
		getUsers(_top, _skip);
	});

	$_previous_page_button.on("click", function() {

		event.preventDefault();
		_skip = tablePreviousPage(_top, _skip);
		getUsers(_top, _skip);
	});

	$_next_page_button.on("click", function() {

		event.preventDefault();
		_skip = tableNextPage(_top, _skip, _count);
		getUsers(_top, _skip);
	});

	//user by id GET request
	$_get_by_id_form.submit(function(event) {

		event.preventDefault();
		$.ajax({
            url: _url + "/id/" + $_id_field.val(),
            success: function (data, textStatus, request) {
            	
            	fillUserTextFields(data);
            	$_text_output.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
        	},
        	error : function (request, textStatus, errorThrown) {

        		$_text_output.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
           	}
		});
	});

	//user by username GET request
	$_get_by_username_form.submit(function(event) {

		event.preventDefault();
		$.ajax({
            url: _url + "/username/" + $_username_field.val(),
            success: function (data, textStatus, request) {
            	
            	fillUserTextFields(data);
            	$_text_output.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
        	},
        	error : function (request, textStatus, errorThrown) {

        		$_text_output.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
           	}
		});
	});

	//POST PUT DELETE request
	$_edit_form.submit(function(event){

			event.preventDefault();
			var requestMethod = $("option:checked").val();
			var user = readUserFromInputFields();
			var url = _url;
			var resultMessage;

			switch(requestMethod) {
				case "PUT" :
					url = url + "/id/" + user.Id;
					resultMessage = "You edited the user:" + JSON.stringify(user);
					break;
				case "DELETE" :
					url = url + "/id/" + user.Id;
					resultMessage = "You deleted the user with Id:" + user.Id;
					user = undefined;
					break;
				case "POST" : 
					resultMessage = "You created new user:" + JSON.stringify(user);
					break;
			}

			$.ajax({
	            type: requestMethod,
	            url: url,
	            data: user,
	            dataType: "json",
	            success: function (data, textStatus, request) {
	            
	            	updateCount(_url , function() {
						getUsers(_top, _skip);
					});
	            	
	            	$_text_output.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
	        	},
	        	error : function (request, textStatus, errorThrown) {
	        		
	        		$_text_output.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
	        	}
			});
		
	});
});

