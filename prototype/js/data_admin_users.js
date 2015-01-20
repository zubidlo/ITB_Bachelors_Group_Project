//everything inside this function is somehow manipulating DOM (document)
//so document must be ready first for all this code to work
//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//this anonymous function (all code of this script is inside this function) is executed after DOM is ready
$(document).ready(function() {

	//needed DOM elements
	var $_user_id_field = $("#get_user_id_input");
	var $_user_username_field = $("#get_user_username_input");
	var $_user_id_edit = $("#user_id_edit");
	var $_user_username_edit = $("#user_username_edit");
	var $_user_password_edit = $("#user_password_edit");
	var $_user_email_edit = $("#user_email_edit");
	var $_table_output = $("#table_output");
	var $_text_output = $("#text_output");
	var $_previous_page_button = $("#previous_page_button");
	var $_next_page_button = $("#next_page_button");
	var $_get_user_by_id_form = $("#get_user_by_id_form");
	var $_get_user_by_username_form = $("#get_user_by_username_form");
	var $_user_edit_form = $("#user_edit_form");

	//constants
	var _url = "http://hurlingapi.azurewebsites.net/api/users";
	//var _url = "http://localhost:51642/api/users";

	//global variables
	var top = 10;
	var skip = 0;
	var user_count;

	//gets user count
	var updateUserCount = function() {
		
		$.ajax({
			url: _url, 
			success: function(data) {
				user_count = data.length;
			}
		});
	}

	updateUserCount();

	//this method returns new user object build from web form fields
	var readUserFromInputFields = function () {
		
		var user = {
			Id : $_user_id_edit.val(),
			Username : $_user_username_edit.val(),
			Password : $_user_password_edit.val(),
			Email : $_user_email_edit.val()
		};
		return user;
	}

	//fills user edit form input fields with user object properties
	var fillUserTextFields = function (user) {

		$_user_id_edit.val(user.Id);
		$_user_username_edit.val(user.Username);
		$_user_password_edit.val(user.Password);
		$_user_email_edit.val(user.Email);

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
				var headers = ['id', 'username', 'password', 'e-mail'];
				var properties = ['Id', 'Username', 'Password', 'Email'];
				buildTable(counter_start, headers, properties, data, $_table_output);
        	}
		});
	}

	//load the table at start
	getUsers(top, skip);

	//previous table page load
	$_previous_page_button.on("click", function(event) {
		
		if (skip > 0) {
			skip = skip - top;
			getUsers(top, skip);
		}
	});

	//next table page load
	$_next_page_button.on("click", function(event) {

		if (skip + top <= user_count) {
			skip = skip + top;
			getUsers(top, skip);
		}
	});

	//user by id GET request
	$_get_user_by_id_form.submit(function(event) {

		event.preventDefault();
		$.ajax({
            url: _url + "/id/" + $_user_id_field.val(),
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
	$_get_user_by_username_form.submit(function(event) {

		event.preventDefault();
		$.ajax({
            url: _url + "/username/" + $_user_username_field.val(),
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
	$_user_edit_form.submit(function(event){

			event.preventDefault();
			var requestMethod = $("option:checked").val();
			var user = readUserFromInputFields();
			var url = _url;
			var resultMessage;

			switch(requestMethod) {
				case "PUT" :
					resultMessage = "You edited the user:" + JSON.stringify(user);
					url = url + "/id/" + user.Id;
					break;
				case "DELETE" :
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
	            
	            	getUsers(top, skip);
	            	if (requestMethod !== "PUT") {
	            		updateUserCount();
	            	}
	            	
	            	$_text_output.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
	        	},
	        	error : function (request, textStatus, errorThrown) {
	        		
	        		$_text_output.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
	        	}
			});
		
	});
});

