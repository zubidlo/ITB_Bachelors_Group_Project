$(document).ready(function() {

	

	


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

	//get all users request
	function getAllUsers() {

		$.ajax({
            type: 'GET',
            url: 'http://hurlingapi.azurewebsites.net/api/users',
            dataType: 'json',
            success: function (data) {
            	
            	putUsersInTable(data);
        	},
        	error : function (request, textStatus, errorThrown) {
        		
        		window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
           	}
		});
	}

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
            url: 'http://hurlingapi.azurewebsites.net/api/users',
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

	
	
	

});