//everything inside this function is somehow manipulating DOM (document)
//so document must be ready first for all this code to work
//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//this anonymous function (all code of this script is inside this function) is executed after DOM is ready
$(document).ready(function() {

	//url
	_url += "/api/positions";

	//needed DOM elements into jquery objects
	var $_id_field = $("#get_id_input");
	var $_name_field = $("#get_name_input");
	var $_id_edit = $("#id_edit");
	var $_name_edit = $("#name_edit");
	var $_table_output = $("#table_output");
	var $_text_output = $("#text_output");
	var $_get_by_id_form = $("#get_by_id_form");
	var $_get_by_name_form = $("#get_by_name_form");
	var $_edit_form = $("#edit_form");

	//this method returns new position object build from web form fields
	var readPositionFromFields = function () {
		
		var position = {
			Id : $_id_edit.val(),
			Name : $_name_edit.val()
		};
		return position;
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
	var getAllPositions = function() {

		$.ajax({
            url: _url + "?$orderby=Name",
            success: function (data) {
            	
            	var counter_start = 1;
				var headers = ["Id<span>PK</span>", "Field Position<span>R</span>"];
				var properties = ["Id", "Name"];
				buildTable(counter_start, headers, properties, data, $_table_output);
        	}
		});
	}

	//laod table at start
	getAllPositions();

	//position by id GET request
	$_get_by_id_form.submit(function(event) {

		event.preventDefault();
		$.ajax({
            url: _url + "/id/" + $_id_field.val(),
            success: function (data, textStatus, request) {
            	
            	fillPositionFields(data);
            	$_text_output.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
        	},
        	error : function (request, textStatus, errorThrown) {

        		$_text_output.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
           	}
		});
	});


	//position by name GET request
	$_get_by_name_form.submit(function(event) {

		event.preventDefault();
		$.ajax({
            url: _url + "/name/" + $_name_field.val(),
            success: function (data, textStatus, request) {
            	
            	fillPositionFields(data);
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
			var position = readPositionFromFields();
			var url = _url;
			var resultMessage;

			switch(requestMethod) {
				case "PUT" :
					url = url + "/id/" + position.Id;
					resultMessage = "You edited the position:" + JSON.stringify(position);
					break;
				case "DELETE" :
					url = url + "/id/" + position.Id;
					resultMessage = "You deleted the position with Id:" + position.Id;
					position = undefined;
					break;
				case "POST" : 
					resultMessage = "You created new position:" + JSON.stringify(position);
					break;
			}

			$.ajax({
	            type: requestMethod,
	            url: url,
	            data: position,
	            dataType: "json",
	            success: function (data, textStatus, request) {
	            
	            	getAllPositions();
	            	$_text_output.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
	        	},
	        	error : function (request, textStatus, errorThrown) {
	        		
	        		$_text_output.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
	        	}
			});
		
	});
	
});

