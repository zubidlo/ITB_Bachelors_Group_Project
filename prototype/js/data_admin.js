$(document).ready(function() {

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
		row += '<td>';
		for (var i = 0; i< object.Teams.length; i++) {
			row += object.Teams[i].Name + '<br>';
		}
		row += '</td>';
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
		$('#user_output_div').empty().append(table);

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

		$.ajax({
            type: 'GET',
            url: 'http://fantasyhurling.azurewebsites.net/api/Users',
            dataType: 'json',
            success: function (data) {
            	
            	putUsersInTable(data);
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
           	}
		});
	}

	//get all users request
	getAllUsers();

	//get user by id request
	$('#get_user_by_id').on('click', function(event) {
		
		$.ajax({
            type: 'GET',
            url: 'http://fantasyhurling.azurewebsites.net/api/Users/' + $('#get_user_id').val(),
            dataType: 'json',
            success: function (data) {
            	
            	fillUserTextFields(data);
        	},
        	error : function (request, textStatus, errorThrown) {

        		window.alert(textStatus + ": " + errorThrown);
           	}
		});

	});

	//insert new user request
	$('#post_new_user').on('click', function(event){
		
		$.ajax({
            type: 'POST',
            url: 'http://fantasyhurling.azurewebsites.net/api/Users',
            data: readUserFromInputFields(),
            dataType: 'json',
            success: function (data) {
            	
            	getAllUsers();
            	clearUserTextFields();
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
        	}
		});

	});


	//edit a user request
	$('#edit_a_user').on('click', function(event){
		
		$.ajax({
            type: 'PUT',
            url: 'http://fantasyhurling.azurewebsites.net/api/Users/' + $('#get_user_id').val(),
            data: readUserFromInputFields(),
            dataType: 'json',
            success: function (data) {
            	
            	getAllUsers();
            	clearUserTextFields();
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
        	}
		});

	});

	//delete a user request
	$('#delete_a_user').on('click', function(event){
		
		$.ajax({
            type: 'DELETE',
            url: 'http://fantasyhurling.azurewebsites.net/api/Users/' + $('#get_user_id').val(),
            dataType: 'json',
            success: function (data) {
            	
            	getAllUsers();
            	clearUserTextFields();
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
        	}
		});

	});

	//get a user by username
	$('#get_a_user_username').on('click', function(event){
		
		$.ajax({
            type: 'GET',
            url: 'http://fantasyhurling.azurewebsites.net/api/Users/Username/' + $('#get_user_username').val(),
            dataType: 'json',
            success: function (data) {
            	
            	fillUserTextFields(data);
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
        	}
		});

	});

	function buildTeamTableHeaders() {

		var headers = "<tr>";
		headers += "<th>Id</th>";
		headers += "<th>Name</th>";
		headers += "<th>User Id</th>";
		headers += "<th>Usename</th>";
		headers += "<th>Players in team</th>";
		headers += "</tr>";
		return headers;
	}

	function buildTeamTableRow(object) {
	
		var row = '<tr>';
		row += '<td>' + object.Id + '</td>';
		row += '<td>' + object.Name + '</td>';
		row += '<td>' + object.UserId + '</td>';
		row += '<td>' + object.User.Username + '</td>';
		row += '<td>';
		for (var i = 0; i< object.PlayerInTeams.length; i++) {
			row += object.PlayerInTeams[i].Name + '<br>';
		}
		row += '</td>';
		row += '</tr>';
		return row;
	}

	function readTeamFromInputFields() {

		var team = {
			Id : $('#get_team_id').val(),
			Name : $('#team_name_input').val(),
			UserId : $('#team_user_id_input').val()
		};

		return team;
	}

	function putTeamsInTable(data) {
		
		var table = '<table>';
		table += buildTeamTableHeaders();
		if($.isArray(data)) {

			$.each(data, function(index, value) {
				
				//console.dir(value);
				table += buildTeamTableRow(value);
			});
		}
		else {
			table += buildTeamTableRow(data);
		}
		
		table += '</table>';
		$('#team_output_div').empty().append(table);
	}

	function clearTeamTextFields() {

		$('#get_team_id').val(0);
		$('#team_name_input').val('');
		$('#team_user_id_input').val(0);
	}

	function fillTeamTextFields(object) {

		$('#get_team_id').val(object.Id);
		$('#team_name_input').val(object.Name);
		$('#team_user_id_input').val(object.UserId);
	}

	function getAllTeams() {

		$.ajax({
            type: 'GET',
            url: 'http://fantasyhurling.azurewebsites.net/api/Teams',
            dataType: 'json',
            success: function (data) {
            	
            	putTeamsInTable(data);
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
           	}
		});
	}

	//get all teams request
	getAllTeams();

	//insert new team request
	$('#post_new_team').on('click', function(event){
		
		$.ajax({
            type: 'POST',
            url: 'http://fantasyhurling.azurewebsites.net/api/Teams',
            data: readTeamFromInputFields(),
            dataType: 'json',
            success: function (data) {
            	
            	getAllTeams();
            	getAllUsers();
            	clearTeamTextFields();
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
        	}
		});

	});

	//get team by id request
	$('#get_team_by_id').on('click', function(event) {
		
		$.ajax({
            type: 'GET',
            url: 'http://fantasyhurling.azurewebsites.net/api/Teams/' + $('#get_team_id').val(),
            dataType: 'json',
            success: function (data) {
            	
            	fillTeamTextFields(data);
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
           	}
		});

	});

	//delete a team request
	$('#delete_a_team').on('click', function(event){
		
		$.ajax({
            type: 'DELETE',
            url: 'http://fantasyhurling.azurewebsites.net/api/Teams/' + $('#get_team_id').val(),
            dataType: 'json',
            success: function (data) {
            	
            	getAllTeams();
            	getAllUsers();
            	clearUserTextFields();
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
        	}	
		});

	});


	//edit a team request
	$('#edit_a_team').on('click', function(event){
		
		$.ajax({
            type: 'PUT',
            url: 'http://fantasyhurling.azurewebsites.net/api/Teams/' + $('#get_team_id').val(),
            data: readTeamFromInputFields(),
            dataType: 'json',
            success: function (data) {
            	
            	getAllTeams();
            	getAllUsers();
            	clearTeamTextFields();
        	},
        	error : function (request, textStatus, errorThrown) {

        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
        	}
		});

	});

});