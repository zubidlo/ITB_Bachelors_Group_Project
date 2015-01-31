//loads parts of the DOM which are common for all pages and then executes given function
var loadCommonsAndStartProgram = function(callback) {

	//after DOM is ready
	$(document).ready(function(){

		setTableDOMElements();

		var req1 = $.get("html_include/table_article.html", function(data) {

		    $table_div.html(data);
		});

		var req2 = $.get("html_include/request_select.html", function(data) {

		    $request_div.html(data);
		});

		var req3 = $.get("html_include/response_fieldset.html", function(data) {

			hideElement($response_div);
			$response_div.html(data);

		});
		//execute callback only when all requests are successful
		$.when(req1, req2, req3).then(callback);

		//I don't care when these are loaded
		$("header").load("html_include/header.html");
	});
}

//constants
//url for development and production
//var _url = "http://localhost:51642";
var _url = "http://hurlingapi.azurewebsites.net";
//how many rows will table have
var _top = 10;
//starting point in the table (0)
var _skip = 0;
//items in the table
var _count = 0;

//DOM element jquery objects common for all html files
var $table_div;
var $request_div;
var $response_div;
var $table_rows_form;
var $table_rows;
var $previous_page_form;
var $next_page_form;
var $table_rows_count;
var $table;
var $text;
var $get_by_id_form;
var $get_id;
var $edit_form;
var $id;

//this can be called only after document is ready
var setTableDOMElements = function() {

	$table_div = $("#table_div");
	$request_div = $("#request_div");
	$response_div = $("#response_div");
	$edit_form = $("#edit_form");
	$id = $("#id");
	$table_rows_form = $("#table_rows_form");
	$table_rows = $("#table_rows");
	$previous_page_form = $("#previous_page_form");
	$next_page_form = $("#next_page_form");
	$table_rows_count = $("#rows_count");
	$table = $("#table");
	$text = $("#text");
}

var hideElement = function($element, time_ms) {

	time_ms = typeof time_ms === "undefined" ? 0 : time_ms;
	setTimeout(function() { $element.hide(); }, time_ms);
}

var showElement = function($element, time_ms) {

	time_ms = typeof time_ms === "undefined" ? 0 : time_ms;
	setTimeout(function() { $element.show(); }, time_ms);
}

//this can be called only after document is ready
//prints a message when ajax request is successfull
//textStatus : passed by jquer ajax success function , see: http://api.jquery.com/jquery.ajax/
//request : passed by jquer ajax success function , see: http://api.jquery.com/jquery.ajax/
var printOutput = function(textStatus, request) {

	$text.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
	showElement($response_div);
	hideElement($response_div, 3000);
}

//this can be called only after document is ready
//prints a message when ajax request is successfull
//request : passed by jquer ajax success function , see http://api.jquery.com/jquery.ajax/
//textStatus : passed by jquer ajax success function , see http://api.jquery.com/jquery.ajax/
//errorThrown : passed by jquer ajax success function , see http://api.jquery.com/jquery.ajax/
var printError = function(request, textStatus, errorThrown) {

	$text.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
	showElement($response_div);
	hideElement($response_div, 3000);
}

//this can be called only after document is ready
//general errror callback
//request : passed by jquer ajax success function , see http://api.jquery.com/jquery.ajax/
//textStatus : passed by jquer ajax success function , see http://api.jquery.com/jquery.ajax/
//errorThrown : passed by jquer ajax success function , see http://api.jquery.com/jquery.ajax/
var generalErrorCallback = function (request, textStatus, errorThrown) {

	printError(request, textStatus, errorThrown);
}

//general ajax request, see http://api.jquery.com/jquery.ajax/
//url : string - url of requested resource (mandatory)
//successCallback : function (mandatory)
//errorCallback : function
//type : string - request type (default = "get")
//dataType : string - data type (default = "json")
//data : data passed in request body for "post" or "put " request (default = "undefined")
var ajaxRequest = function(url, successCallback, errorCallback, type, dataType, data ) {
	
	type = typeof type === "undefined" ? "GET" : type;
	dataType = typeof dataType === "undefined" ? "json" : dataType;
	data = typeof data === "undefined" ? null : data;
	errorCallback = typeof errorCallback === "undefined" ? function() {} : errorCallback;

	$.ajax({
        type : type,
        url : url,
        data : data,
        dataType : dataType,
        success : successCallback,
    	error : errorCallback
	});
}

//returns new object {top:_top, skip:_skip}
//_top, _skip are global variables
var tableCurrentPage = function() {
	return {
		top : parseInt(_top),
		skip : parseInt(_skip)
	};
}

//calculates previous table page, manipulates _skip and returns new object {top:_top, skip:_skip}
//_top, _skip are global variables
var tablePreviousPage = function() {

	_skip = parseInt(_skip) > 0 ? parseInt(_skip) - parseInt(_top) : _skip;
	return tableCurrentPage();
}

//calculates next table page, manipulates _skip and returns new object {top:_top, skip:_skip}
//_top, _skip, _count are global variables
var tableNextPage = function() {

	_skip = parseInt(_skip) + parseInt(_top) < parseInt(_count) ? parseInt(_skip) + parseInt(_top) : _skip;
	return tableCurrentPage();
}

//returns a table header row html string built from given array of strings
//headersNamesArray : string array of headers
var buildTableHeaders = function (headersNamesArray) {

	var headers = "<tr><th>#</th>";
	for(var i = 0; i < headersNamesArray.length; headers += "<th>" + headersNamesArray[i++] + "</th>");
	return headers + "</tr>";
}

//returns one table row string built from given javascript object
//rowNumber: int - number of the row
//properties : string array - object property names to put in the row
//objcet : object
var buildTableRow = function(rowNumber, properties, object) {

	var row = "<tr class='editable'><td>" + rowNumber + "</td>";
	for(var i = 0; i < properties.length; i++) {
		row += "<td>" + object[properties[i]] + "</td>";
	}	
	return row + "</tr>";
}

var mouseEnterCallback = function() {
				
	$(this).children().css("background-color", "#D10000").css("color", "white");
};

var mouseLeaveCallback = function() {

	$(this).children().css("background-color", "white").css("color", "black");
};

//this can be called only after document is ready
//returns table html string
//counter_start: int - what number first table row starts with
//headers : string array - example: ['name', 'address', 'email']
//properties : string array - example: ['Name', 'Address', 'Email'] data[i].Name, data[i].Address, data[i].Email will be put in each table row in that order
//data : objcet array - objects to put in the table
//output : DOM element jquery object - to append the table to
//function to execute if user clicks on table row
var buildTable = function (counter_start, headers, properties, data, output, rowClickCallback) {
	
	var counter = counter_start;
	var table = "<table><thead>";
	table += buildTableHeaders(headers);
	table += "</thead><tbody>";
	if($.isArray(data)) {
		$.each(data, function(index, object) {
			table += buildTableRow(++counter, properties, object);
		});
	}
	else {
		table += buildTableRow(++counter, properties, data);
	}
	table += "</tbody></table>";
	output.empty().append(table);

	if (typeof rowClickCallback !== "undefined") {

		$(".editable").mouseenter(this, mouseEnterCallback)
					  .mouseleave(this, mouseLeaveCallback)
					  .click(this, rowClickCallback);
	}
}

//clear form fields to default value
//forms = array of form elemenet jquery objects
var clearFormFields = function(forms) {

	forms.forEach(function($form){

		$form.each (function(){ this.reset(); });
	});
}
