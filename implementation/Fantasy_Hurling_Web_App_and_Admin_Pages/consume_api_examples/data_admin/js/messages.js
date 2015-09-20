//this code uses jquery so that must be already loaded
//this code uses functions from "data_admin_functions.js" so that must be already loaded

//execute only after DOM is ready
var dataAdminMessagesCode = function() {

	//add path to URL prefix
	_url += "/api/messages";

	//set common DOM element jquery objects
	setTableDOMElements();

	var $message_text = $("#message_text");
	var $user_id = $("#user_id");
	var $created = $("#created");

	var readMessageFromFields = function () {

		return {

			Id : $id.val(),
			Text : $message_text.val(),
			UserId : $user_id.val(),
			Created : $created.val()
		};
	}

	var fillMessageFields = function (tableRowData) {

		$id.val(tableRowData[1]);
		$message_text.val(tableRowData[2]);
		$user_id.val(tableRowData[3]);
		$created.val(tableRowData[4]);
	}

	var rowClickCallback = function() {

		var data = [];
		$.each($(this).children(), function(key, value) {
			data.push(value.textContent);
		});
		
		fillMessageFields(data);
	};


	//examples:
	//.../api/players?$orderby=OverallPoints --> get all players ordered by OverallPoints
	//.../api/players?$filter=PositionId eq 1 --> get all GoalKeepers
	//.../api/players??$filter=Price lt 100000 --> get all players cheaper then 100000
	//injects table of top items into DOM
	//page.top : how many rows the table will have
	//page.skip: how many rows to skip
	//example: page.top=10 and page.skip=0 --> table with first 10 items
	//page.top=10 and page.skip=10 --> table with from 11 to 20 items
	//page.top=10 and page.skip=20 --> table with from 21 to 30 items
	var getMessages = function(page) {

		var url = _url + "?$top=" + page.top + "&$skip=" + page.skip;
		var successCallback = function (data, textStatus, request) {
            	
	    	var counter_start = page.skip;

			var headers = 
			[
				"Id <span>(PK)</span>",
				"Text",
				"User Id <span>(FK)</span>",
				"Created"
			];

			var properties = 
			[
				"Id",
				"Text",
				"UserId",
				"Created"
			];

			buildTable(counter_start, headers, properties, data, $table, rowClickCallback);
		}

		ajaxRequest(url, successCallback);
	}

	$("select option[value='PUT']").remove();
	_top = $table_rows.val();

	ajaxRequest(_url, function(data, textStatus, request) {

		_count = parseInt(data.length);
		$table_rows_count.val(_count);
		getMessages(tableCurrentPage());
	});

	$table_rows_form.submit(function(event) {

		event.preventDefault();
		_top = $table_rows.val();
		_skip = 0;
		getMessages(tableCurrentPage());
	});

	$previous_page_form.submit(function(event) {

		event.preventDefault();
		getMessages(tablePreviousPage());
	});

	$next_page_form.submit(function(event) {

		event.preventDefault();
		getMessages(tableNextPage());
	});

	//POST PUT DELETE request
	$edit_form.submit(function(event){

		event.preventDefault();

		var url = _url;

		var message = readMessageFromFields();

		var successCallback = function (data, textStatus, request) {
            
        	ajaxRequest(_url, function(data, textStatus, request) {

				_count = parseInt(data.length);
				$table_rows_count.val(_count);
				getMessages(tableCurrentPage());
			});

        	printOutput(textStatus, request);
        	clearFormFields([$edit_form]);
    	};

    	var errorCallback = function(request, textStatus, errorThrown) {

			clearFormFields([$edit_form]);
			generalErrorCallback(request, textStatus, errorThrown);
		};
		
		var type = $("option:checked").val();

		if (type === "DELETE") {
			url = url + "/id/" + message.Id;
			message = "undefined";
		}
		
		var dataType = "json";

		ajaxRequest(url, successCallback, errorCallback, type, dataType, message );
	});
}

