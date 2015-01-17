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

// 	//edit a user request
// 	$('#edit_a_user').on('click', function(event){
		
// 		$.ajax({
//             type: 'PUT',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Users/' + $('#user_id_input').val(),
//             data: readUserFromInputFields(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllUsers();
//             	clearUserTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	//delete a user request
// 	$('#delete_a_user').on('click', function(event){
		
// 		$.ajax({
//             type: 'DELETE',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Users/' + $('#user_id_input').val(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllUsers();
//             	clearUserTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	//get a user by username
// 	$('#get_a_user_username').on('click', function(event){
		
// 		$.ajax({
//             type: 'GET',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Users/Username/' + $('#get_user_username').val(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	fillUserTextFields(data);
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	function buildTeamTableRow(object) {
	
// 		//console.dir(object);
// 		var row = '<tr>';
// 		row += '<td>' + object.Id + '</td>';
// 		row += '<td>' + object.Name + '</td>';
// 		row += '<td>' + object.UserId + '</td>';
// 		row += '<td>' + object.User.Username + '</td>';
// 		row += '<td>';
// 		for (var i = 0; i< object.PlayerInTeams.length; row += object.PlayerInTeams[i++].Player.LastName + '<br>');
// 		row += '</td>';
// 		row += '</tr>';
// 		return row;
// 	}

// 	function readTeamFromInputFields() {

// 		var team = {
// 			Id : $('#get_team_id').val(),
// 			Name : $('#team_name_input').val(),
// 			UserId : $('#team_user_id_input').val()
// 		};
// 		return team;
// 	}

// 	function putTeamsInTable(data) {
		
// 		var table = '<table>';
// 		table += buildTableHeaders(['Id', 'Name', 'User Id', 'Username', 'Players in this Team']);
// 		if($.isArray(data)) {

// 			$.each(data, function(index, value) {
				
// 				//console.dir(value);
// 				table += buildTeamTableRow(value);
// 			});
// 		}
// 		else {
// 			table += buildTeamTableRow(data);
// 		}
		
// 		table += '</table>';
// 		$('#team_output_div').empty().append(table);
// 	}

// 	function clearTeamTextFields() {

// 		$('#get_team_id').val(0);
// 		$('#team_name_input').val('');
// 		$('#team_user_id_input').val(0);
// 	}

// 	function fillTeamTextFields(object) {

// 		$('#get_team_id').val(object.Id);
// 		$('#team_name_input').val(object.Name);
// 		$('#team_user_id_input').val(object.UserId);
// 	}

// 	function getAllTeams() {

// 		$.ajax({
//             type: 'GET',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Teams',
//             dataType: 'json',
//             success: function (data) {
            	
//             	putTeamsInTable(data);
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//            	}
// 		});
// 	}

// 	getAllTeams();

// 	$('#post_new_team').on('click', function(event){
		
// 		$.ajax({
//             type: 'POST',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Teams',
//             data: readTeamFromInputFields(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllTeams();
//             	getAllUsers();
//             	clearTeamTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	//get team by id request
// 	$('#get_team_by_id').on('click', function(event) {
		
// 		$.ajax({
//             type: 'GET',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Teams/' + $('#get_team_id').val(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	fillTeamTextFields(data);
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//            	}
// 		});
// 	});

// 	//delete a team request
// 	$('#delete_a_team').on('click', function(event){
		
// 		$.ajax({
//             type: 'DELETE',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Teams/' + $('#get_team_id').val(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllTeams();
//             	getAllUsers();
//             	clearUserTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}	
// 		});
// 	});


// 	//edit a team request
// 	$('#edit_a_team').on('click', function(event){
		
// 		$.ajax({
//             type: 'PUT',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Teams/' + $('#get_team_id').val(),
//             data: readTeamFromInputFields(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllTeams();
//             	getAllUsers();
//             	clearTeamTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {

//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	function buildPlayerTypeTableRow(object) {

// 		//console.dir(object);
// 		var row = '<tr>';
// 		row += '<td>' + object.Id + '</td>';
// 		row += '<td>' + object.Name + '</td>';
// 		row += '<td>';
// 		for (var i = 0; i < object.Players.length; row += object.Players[i++].LastName + '<br>');
// 		row += '</td>';
// 		row += '</tr>';
// 		return row;
// 	}

// 	function putPlayerTypesInTable(data) {

// 		//console.dir(data);
// 		var table = '<table>';
// 		table += buildTableHeaders(['Id', 'Name', 'Players of this Type']);
// 		if($.isArray(data)) {

// 			$.each(data, function(index, value) {
				
// 				//console.dir(value);
// 				table += buildPlayerTypeTableRow(value);
// 			});
// 		}
// 		else {
// 			table += buildPlayerTypeTableRow(value);
// 		}
		
// 		table += '</table>';
// 		$('#player_type_output_div').empty().append(table);
// 	}

// 	function getAllPlayerTypes() {

// 		$.ajax({
//             type: 'GET',
//             url: 'http://fantasyhurling.azurewebsites.net/api/PlayerTypes',
//             dataType: 'json',
//             success: function (data) {
            	
//             	putPlayerTypesInTable(data);
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//            	}
// 		});
// 	}

// 	getAllPlayerTypes();

// 	function readPlayerTypeFromInputFields() {

// 		var playerType = {
// 			Id : $('#get_player_type_id').val(),
// 			Name : $('#player_type_name_input').val(),
// 		};
// 		return playerType;
// 	}

// 	function clearPlayerTypesTextFields() {

// 		$('#get_player_type_id').val(0);
// 		$('#player_type_name_input').val('');
// 	}

// 	$('#post_new_player_type').on('click', function(event){
		
// 		$.ajax({
//             type: 'POST',
//             url: 'http://fantasyhurling.azurewebsites.net/api/PlayerTypes',
//             data: readPlayerTypeFromInputFields(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllPlayerTypes();
//             	clearPlayerTypesTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	function fillPlayerTypesTextFields(object) {

// 		$('#get_player_type_id').val(object.Id);
// 		$('#player_type_name_input').val(object.Name);
// 	}

// 	$('#get_player_type_by_id').on('click', function(event) {
		
// 		$.ajax({
//             type: 'GET',
//             url: 'http://fantasyhurling.azurewebsites.net/api/PlayerTypes/' + $('#get_player_type_id').val(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	fillPlayerTypesTextFields(data);
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//            	}
// 		});
// 	});

// 	$('#delete_a_player_type').on('click', function(event){
		
// 		$.ajax({
//             type: 'DELETE',
//             url: 'http://fantasyhurling.azurewebsites.net/api/PlayerTypes/' + $('#get_player_type_id').val(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllPlayerTypes();
//             	clearPlayerTypesTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}	
// 		});
// 	});

// 	$('#edit_a_player_type').on('click', function(event){
		
// 		$.ajax({
//             type: 'PUT',
//             url: 'http://fantasyhurling.azurewebsites.net/api/PlayerTypes/' + $('#get_player_type_id').val(),
//             data: readPlayerTypeFromInputFields(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllPlayerTypes();
//             	clearPlayerTypesTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {

//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	function buildStatisticsTableRow(object) {

// 		//console.dir(object);
// 		var row = '<tr>';
// 		row += '<td>' + object.Id + '</td>';
// 		row += '<td>' + object.Goals + '</td>';
// 		row += '<td>' + object.Assists + '</td>';
// 		row += '<td>';
// 		for (var i = 0; i < object.Players.length; row += object.Players[i++].LastName + '<br>');
// 		row += '</td>';
// 		row += '</tr>';
// 		return row;
// 	}

// 	function putStatisticsInTable(data) {

// 		//console.dir(data);
// 		var table = '<table>';
// 		table += buildTableHeaders(['Id', 'Goals', 'Assists', 'Players Name']);
// 		if($.isArray(data)) {

// 			$.each(data, function(index, value) {
				
// 				//console.dir(value);
// 				table += buildStatisticsTableRow(value);
// 			});
// 		}
// 		else {
// 			table += buildStatisticsTableRow(value);
// 		}
		
// 		table += '</table>';
// 		$('#statistics_output_div').empty().append(table);
// 	}

// 	function getAllStatistics() {

// 		$.ajax({
//             type: 'GET',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Statistics',
//             dataType: 'json',
//             success: function (data) {
            	
//             	putStatisticsInTable(data);
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//            	}
// 		});
// 	}

// 	getAllStatistics();

// 	function readStatisticsFromInputFields() {

// 		var statistics = {
// 			Id : $('#get_statistics_id').val(),
// 			Goals : $('#statistics_goals_input').val(),
// 			Assists : $('#statistics_assists_input').val()
// 		};
// 		return statistics;
// 	}


// 	function clearStatisticsTextFields() {

// 		$('#get_statistics_id').val(0);
// 		$('#statistics_goals_input').val(0);
// 		$('#statistics_assists_input').val('');
// 	}

// 	$('#post_new_statistics').on('click', function(event){
		
// 		$.ajax({
//             type: 'POST',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Statistics',
//             data: readStatisticsFromInputFields(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllStatistics();
//             	clearStatisticsTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	function fillStatisticsTextFields(object) {

// 		$('#get_statistics_id').val(object.Id);
// 		$('#statistics_goals_input').val(object.Goals);
// 		$('#statistics_assists_input').val(object.Assists);
// 	}

// 	$('#get_statistics_by_id').on('click', function(event) {
		
// 		$.ajax({
//             type: 'GET',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Statistics/' + $('#get_statistics_id').val(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	fillStatisticsTextFields(data);
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//            	}
// 		});
// 	});

// 	$('#delete_a_statistics').on('click', function(event){
		
// 		$.ajax({
//             type: 'DELETE',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Statistics/' + $('#get_statistics_id').val(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllStatistics();
//             	clearStatisticsTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}	
// 		});
// 	});

// 	$('#edit_a_statistics').on('click', function(event){
		
// 		$.ajax({
//             type: 'PUT',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Statistics/' + $('#get_statistics_id').val(),
//             data: readStatisticsFromInputFields(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllStatistics();
//             	clearStatisticsTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {

//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	function buildPlayersTableRow(object) {

// 		var row = '<tr>';
// 		row += '<td>' + object.Id + '</td>';
// 		row += '<td>' + object.FirstName + '</td>';
// 		row += '<td>' + object.LastName + '</td>';
// 		row += '<td>' + object.Agility + '</td>';
// 		row += '<td>' + object.Speed + '</td>';
// 		row += '<td>' + object.Perception + '</td>';
// 		row += '<td>' + object.PlayerType.Name + '</td>';
// 		row += '<td>' + object.Statistic.Goals + '</td>';
// 		row += '<td>' + object.Statistic.Assists + '</td>';
// 		row += '</tr>';
// 		return row;
// 	}

// 	function putPlayersInTable(data) {

// 		var table = '<table>';
// 		table += buildTableHeaders(['Id', 'First Name', 'Last Name', 'Agility', 'Speed', 'Perception', 'Player Type', 'Goals', 'Assists']);
// 		if($.isArray(data)) {

// 			$.each(data, function(index, value) {
				
// 				table += buildPlayersTableRow(value);
// 			});
// 		}
// 		else {
// 			table += buildPlayersTableRow(value);
// 		}
		
// 		table += '</table>';
// 		$('#players_output_div').empty().append(table);
// 	}

// 	function getAllPlayers() {

// 		$.ajax({
//             type: 'GET',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Players',
//             dataType: 'json',
//             success: function (data) {
            	
//             	putPlayersInTable(data);
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//            	}
// 		});
// 	}

// 	getAllPlayers();

// 	function readPlayerFromInputFields() {

// 		var player = {
// 			Id : $('#get_player_id').val(),
// 			FirstName : $('#player_first_name_input').val(),
// 			LastName : $('#player_last_name_input').val(),
// 			Agility : $('#player_agility_input').val(),
// 			Speed : $('#player_speed_input').val(),
// 			Perception : $('#player_perception_input').val(),
// 			PlayerTypeId : $('#player_player_type_id_input').val(),
// 			StatisticId : $('#player_statistics_id_input').val()
// 		};
// 		return player;
// 	}

// 	function clearPlayersTextFields() {

// 		$('#get_player_id').val(0);
// 		$('#player_first_name_input').val('');
// 		$('#player_last_name_input').val('');
// 		$('#player_agility_input').val(0);
// 		$('#player_speed_input').val(0);
// 		$('#player_perception_input').val(0);
// 		$('#player_player_type_id_input').val(0);
// 		$('#player_statistics_id_input').val(0);
// 	}

// 	$('#post_new_player').on('click', function(event){
		
// 		$.ajax({
//             type: 'POST',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Players',
//             data: readPlayerFromInputFields(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllPlayers();
//             	getAllTeams();
//             	getAllPlayerTypes();
//             	getAllStatistics();
//             	getAllPlayerInTeam();
//             	clearPlayersTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	function fillPlayersTextFields(object) {

// 		$('#get_player_id').val(object.Id);
// 		$('#player_first_name_input').val(object.FirstName);
// 		$('#player_last_name_input').val(object.LastName);
// 		$('#player_agility_input').val(object.Agility);
// 		$('#player_speed_input').val(object.Speed);
// 		$('#player_perception_input').val(object.Perception);
// 		$('#player_player_type_id_input').val(object.PlayerTypeId);
// 		$('#player_statistics_id_input').val(object.StatisticId);
// 	}

// 	$('#get_player_by_id').on('click', function(event) {
		
// 		$.ajax({
//             type: 'GET',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Players/' + $('#get_player_id').val(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	fillPlayersTextFields(data);
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//            	}
// 		});
// 	});

// 	$('#edit_a_player').on('click', function(event){
		
// 		$.ajax({
//             type: 'PUT',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Players/' + $('#get_player_id').val(),
//             data: readPlayerFromInputFields(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllPlayers();
//             	getAllTeams();
//             	getAllPlayerTypes();
//             	getAllStatistics();
//             	getAllPlayerInTeam();
//             	clearStatisticsTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {

//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	$('#delete_a_player').on('click', function(event){
		
// 		$.ajax({
//             type: 'DELETE',
//             url: 'http://fantasyhurling.azurewebsites.net/api/Players/' + $('#get_player_id').val(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllPlayers();
//             	getAllTeams();
//             	getAllPlayerTypes();
//             	getAllStatistics();
//             	getAllPlayerInTeam();
//             	clearStatisticsTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}	
// 		});
// 	});

// 	function buildPlayerInTeamRow(object) {

// 		var row = '<tr>';
// 		row += '<td>' + object.Id + '</td>';
// 		row += '<td>' + object.PlayerId + '</td>';
// 		row += '<td>' + object.Player.LastName + '</td>';
// 		row += '<td>' + object.TeamId + '</td>';
// 		row += '<td>' + object.Team.Name + '</td>';
// 		row += '</tr>';
// 		return row;
// 	}

// 	function putPlayerInTeamInTable(data) {

// 		var table = '<table>';
// 		table += buildTableHeaders(['Id', 'Player Id','Player Last Name', 'Team Id','Team Name']);
// 		if($.isArray(data)) {

// 			$.each(data, function(index, value) {
				
// 				table += buildPlayerInTeamRow(value);
// 			});
// 		}
// 		else {
// 			table += buildPlayerInTeamRow(value);
// 		}
		
// 		table += '</table>';
// 		$('#playerInTeam_output_div').empty().append(table);
// 	}

// 	function getAllPlayerInTeam() {

// 		$.ajax({
//             type: 'GET',
//             url: 'http://fantasyhurling.azurewebsites.net/api/PlayerInTeams',
//             dataType: 'json',
//             success: function (data) {
            	
//             	putPlayerInTeamInTable(data);
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//            	}
// 		});
// 	}

// 	getAllPlayerInTeam();

// 	function readPlayerInTeamFromInputFields() {

// 		var playerInTeam = {
// 			Id : $('#get_playerInTeam_id').val(),
// 			PlayerId : $('#playerId_input').val(),
// 			TeamId : $('#teamId_input').val()
// 		}
// 		return playerInTeam;
// 	}

// 	function clearPlayerInTeamTextFields() {

// 		$('#get_playerInTeam_id').val(0);
// 		$('#playerId_input').val(0);
// 		$('#teamId_input').val(0);
// 	}

// 	$('#post_new_playerInTeam').on('click', function(event){
		
// 		$.ajax({
//             type: 'POST',
//             url: 'http://fantasyhurling.azurewebsites.net/api/PlayerInTeams',
//             data: readPlayerInTeamFromInputFields(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllPlayerInTeam();
//             	getAllPlayers();
//             	getAllTeams();
//             	clearPlayerInTeamTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	function fillPlayerInTeamTextFields(object) {

// 		$('#get_playerInTeam_id').val(object.Id);
// 		$('#playerId_input').val(object.PlayerId);
// 		$('#teamId_input').val(object.TeamId);
// 	}

// 	$('#get_playerInTeam_by_id').on('click', function(event) {
		
// 		$.ajax({
//             type: 'GET',
//             url: 'http://fantasyhurling.azurewebsites.net/api/PlayerInTeams/' + $('#get_playerInTeam_id').val(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	fillPlayerInTeamTextFields(data);
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//            	}
// 		});
// 	});

// 	$('#edit_a_playerInTeam').on('click', function(event){
		
// 		$.ajax({
//             type: 'PUT',
//             url: 'http://fantasyhurling.azurewebsites.net/api/PlayerInTeams/' + $('#get_playerInTeam_id').val(),
//             data: readPlayerInTeamFromInputFields(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllPlayerInTeam();
//             	getAllPlayers();
//             	getAllTeams();
//             	clearPlayerInTeamTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {

//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}
// 		});
// 	});

// 	$('#delete_a_playerInTeam').on('click', function(event){
		
// 		$.ajax({
//             type: 'DELETE',
//             url: 'http://fantasyhurling.azurewebsites.net/api/PlayerInTeams/' + $('#get_playerInTeam_id').val(),
//             dataType: 'json',
//             success: function (data) {
            	
//             	getAllPlayerInTeam();
//             	getAllPlayers();
//             	getAllTeams();
//             	clearPlayerInTeamTextFields();
//         	},
//         	error : function (request, textStatus, errorThrown) {
        		
//         		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
//         	}	
// 		});
// 	});
// });