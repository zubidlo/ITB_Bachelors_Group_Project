$(document).ready(function() {

	function printError(status, errorMessage) {
		//console.log(status);
		//console.log(errorMessage);

		//empty output div and append error message to it
		$("#output_div").empty().append(status + ": " + errorMessage);

	}
	
	function buildUserTableHeaders() {

		var headers = "<tr>";
		headers += "<th>Id</th>";
		headers += "<th>First Name</th>";
		headers += "<th>Last Name</th>";
		headers += "<th>Username</th>";
		headers += "<th>Password</th>";
		headers += "<th>Email</th>";
		headers += "<th>Teams</th>";
		headers += "</tr>";
		return headers;
	}

	function buildUserTableRow(object) {
	
		var row = '<tr>';
		row += '<td>' + object.Id + '</td>';
		row += '<td>' + object.FirstName + '</td>';
		row += '<td>' + object.LastName + '</td>';
		row += '<td>' + object.Username + '</td>';
		row += '<td>' + object.Password + '</td>';
		row += '<td>' + object.Email + '</td>';
		row += '<td>' + object.Teams + '</td>';
		row += '</tr>';
		return row;
	}

	function putUsersInTable(data) {
		
		//console.dir(data);

		//make table with first table row with headers
		var table = '<table>';
		table += buildUserTableHeaders();
		
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
		$('#output_div').empty().append(table);

	}


	function clearUserTextFields() {

		$('#get_user_id').val(0);
		$('#get_user_username').val('');
		$('#id_input').val('');
		$('#first_name_input').val('');
		$('#last_name_input').val('');
		$('#username_input').val('');
		$('#password_input').val('');
		$('#email_input').val('');
	}

	function fillUserTextFields(object) {

		$('#get_user_id').val(object.Id);
		$('#get_user_username').val(object.Username);
		$('#id_input').val(object.Id);
		$('#first_name_input').val(object.FirstName);
		$('#last_name_input').val(object.LastName);
		$('#username_input').val(object.Username);
		$('#password_input').val(object.Password);
		$('#email_input').val(object.Email);

	}

	function readUserFromInputFields() {
		
		var user = {
			Id : $('#get_user_id').val(),
			FirstName : $('#first_name_input').val(),
			LastName : $('#last_name_input').val(),
			Username : $('#username_input').val(),
			Password : $('#password_input').val(),
			Email : $('#email_input').val()
		};

		return user;
	}


	function getAllUsers() {

		var _type = 'GET';
		var _url = 'http://fantasyhurling.azurewebsites.net/api/Users';

		$.ajax({
            type: _type,
            url: _url,
            dataType: 'json',
            success: function (data) {
            	
            	putUsersInTable(data);
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		printError(textStatus, errorThrown);
        		clearUserTextFields
        ();
        	}
		});
	}

	//get all users request
	$('#get_all_users').on('click', function(event){
		
		getAllUsers();
		clearUserTextFields
();

	});

	//get user by id request
	$('#get_user_by_id').on('click', function(event){
		
		var _type = 'GET';
		var user_id = $('#get_user_id').val();
		var _url = 'http://fantasyhurling.azurewebsites.net/api/Users/' + user_id;

		$.ajax({
            type: _type,
            url: _url,
            dataType: 'json',
            success: function (data) {
            	
            	fillUserTextFields(data);
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		printError(textStatus, errorThrown);
        		clearUserTextFields
        ();
        	}
		});

	});

	//insert new user request
	$('#post_new_user').on('click', function(event){
		
		var _type = 'POST';
		var _user = readUserFromInputFields();
		var _url = 'http://fantasyhurling.azurewebsites.net/api/Users/';

		$.ajax({
            type: _type,
            url: _url,
            data: _user,
            dataType: 'json',
            success: function (data) {
            	
            	getAllUsers();
            	clearUserTextFields
           ();
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		printError(textStatus, errorThrown);
        		clearUserTextFields
        ();
        	}
		});

	});


	//edit a user
	$('#edit_a_user').on('click', function(event){
		
		var _type = 'PUT';
		var user_id = $('#get_user_id').val();
		var _user = readUserFromInputFields();
		var _url = 'http://fantasyhurling.azurewebsites.net/api/Users/' + user_id;

		$.ajax({
            type: _type,
            url: _url,
            data: _user,
            dataType: 'json',
            success: function (data) {
            	
            	getAllUsers();
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		printError(textStatus, errorThrown);
        		clearUserTextFields
        ();
        	}
		});

	});

	//delete a user request
	$('#delete_a_user').on('click', function(event){
		
		var _type = 'DELETE';
		var user_id = $('#get_user_id').val();
		var _url = 'http://fantasyhurling.azurewebsites.net/api/Users/' + user_id;

		$.ajax({
            type: _type,
            url: _url,
            dataType: 'json',
            success: function (data) {
            	
            	getAllUsers();
            	clearUserTextFields
           ();
        	},
        	error : function (request, textStatus, errorThrown) {
        		printError(textStatus, errorThrown);
        		clearUserTextFields
        ();
        	}
		});

	});

	//get a user by username
	$('#get_a_user_username').on('click', function(event){
		
		var _type = 'GET';
		var user_name = $('#get_user_username').val();
		var _url = 'http://fantasyhurling.azurewebsites.net/api/Users/Username/' + user_name;

		$.ajax({
            type: _type,
            url: _url,
            dataType: 'json',
            success: function (data) {
            	
            	fillUserTextFields(data);
        	},
        	error : function (request, textStatus, errorThrown) {
        		printError(textStatus, errorThrown);
        		clearUserTextFields
        ();
        	}
		});

	});

});