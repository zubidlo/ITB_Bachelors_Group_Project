$(document).ready(function() {

	//dom elements
	var $_user_id_field = $("#get_user_id_input");
	var $_user_username_field = $("#get_user_username_input");
	var $_user_id_edit = $("#user_id_edit");
	var $_user_username_edit = $("#user_username_edit");
	var $_user_password_edit = $("#user_password_edit");
	var $_user_email_edit = $("#user_email_edit");

	
	//return table row filled with headers from given array
	function buildTableHeaders(headersNamesArray) {

		var headers = '<tr>';
		for(var i = 0; i < headersNamesArray.length; headers += '<th>' + headersNamesArray[i++] + '</th>');
		headers += '</tr>';
		return headers;
	}

	function buildUserTableRow(object) {
	
		var row = '<tr>';
		row += '<td>' + object.Id + '</td>';
		row += '<td>' + object.Username + '</td>';
		row += '<td>' + object.Password + '</td>';
		row += '<td>' + object.Email + '</td>';
		row += '</tr>';
		return row;
	}

	function putUsersInTable(data) {
		
		//console.dir(data);

		//make table with first table row with headers
		var table = '<table>';
		table += buildTableHeaders(['Id', 'Username', 'Password', 'Email']);
		
		//if given data is an array:
		if($.isArray(data)) {

			//traverse the array
			$.each(data, function(index, value) {
				//console.log(index);
				//console.dir(value);

				//build each table row
				table += buildUserTableRow(value);
			});
		}
		//if response data is object:
		else {
			table += buildUserTableRow(data);
		}
		
		//close table element
		table += '</table>';

		//empty output div and append a new table to it
		$('#user_output_div').empty().append(table);

	}


	function clearUserTextFields() {

		$_user_id_edit.val("0");
		$_user_username_edit.val('');
		$_user_password_edit.val('');
		$_user_email_edit.val('');
	}

	function fillUserTextFields(object) {

		$_user_id_edit.val(object.Id);
		$_user_username_edit.val(object.Username);
		$_user_password_edit.val(object.Password);
		$_user_email_edit.val(object.Email);

	}

	//this method returns new user object build from web form fields
	//if new user is posted the user id is ignored (database server makes new id)
	//, but id still must be inclued (any value) so make sure there is some numerical value in input 
	//field when parsed to user.Id variable
	//if a user is edited id must be valid (only existing user can be edited)
	function readUserFromInputFields() {
		
		var user = {
			Id : $_user_id_edit.val(),
			Username : $_user_username_edit.val(),
			Password : $_user_password_edit.val(),
			Email : $_user_email_edit.val()
		};

		return user;
	}

	//get all users GET request
	function getAllUsers() {

		$.ajax({
            type: "GET",
            url: "http://hurlingapi.azurewebsites.net/api/users",
            dataType: "json",
            success: function (data) {

            	putUsersInTable(data);
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
        		clearUserTextFields();
           	}
		});
	}

	getAllUsers();

	//get user by id GET request
	$("#get_user_by_id_button").on("click", function(event) {

		$.ajax({
            type: "GET",
            url: "http://hurlingapi.azurewebsites.net/api/users/id/" + $_user_id_field.val(),
            dataType: "json",
            success: function (data) {
            	
            	fillUserTextFields(data);
        	},
        	error : function (request, textStatus, errorThrown) {

        		window.alert(textStatus + ": " + errorThrown);
        		clearUserTextFields();
           	}
		});
	});

	//get user by username GET request
	$("#get_user_by_username_button").on("click", function(event) {

		$.ajax({
            type: "GET",
            url: "http://hurlingapi.azurewebsites.net/api/users/username/" + $_user_username_field.val(),
            dataType: "json",
            success: function (data) {
            	
            	fillUserTextFields(data);
        	},
        	error : function (request, textStatus, errorThrown) {

        		window.alert(textStatus + ": " + errorThrown);
        		clearUserTextFields();
           	}
		});
	});



	//create new user POST request
	$("#post_new_user_button").on("click", function(event){
		
		$.ajax({
            type: "POST",
            url: "http://hurlingapi.azurewebsites.net/api/users",
            data: readUserFromInputFields(),
            dataType: "json",
            success: function (data) {
            	
            	getAllUsers();
            	clearUserTextFields();
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
        	}
		});
	});
});
