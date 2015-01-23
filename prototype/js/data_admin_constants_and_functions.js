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

//DOM element jquery objcets
var $_table_rows_form;
var $_table_rows_input;
var $_previous_page_form;
var $_next_page_form;
var $_table_rows_count;
var $_table_output;
var $_text_output;

//this need to be called when document is ready
var setTableDOMElements = function() {
	$_table_rows_form = $("#table_rows_form");
	$_table_rows_input = $("#table_rows_input");
	$_previous_page_form = $("#previous_page_form");
	$_next_page_form = $("#next_page_form");
	$_table_rows_count = $("#table_rows_count");
	$_table_output = $("#table_output");
	$_text_output = $("#text_output");
}

//prints a message when ajax request is successfull
//$output : DOM element jquery object - to append the message to
//textStatus : passed by jquer ajax success function , see: http://api.jquery.com/jquery.ajax/
//request : passed by jquer ajax success function , see: http://api.jquery.com/jquery.ajax/
var printOutput = function($output, textStatus, request) {

	$output.empty().append(textStatus + ": " + request.status + "/" + request.responseText);
}

//prints a message when ajax request is successfull
//$output : DOM element jquery object - to append the message to
//request : passed by jquer ajax success function , see http://api.jquery.com/jquery.ajax/
//textStatus : passed by jquer ajax success function , see http://api.jquery.com/jquery.ajax/
//errorThrown : passed by jquer ajax success function , see http://api.jquery.com/jquery.ajax/
var printError = function($output, request, textStatus, errorThrown) {

	$output.empty().append(textStatus + ": " + request.status + "/" + errorThrown + ": " + request.responseText);
}

//general ajaxRequest, see http://api.jquery.com/jquery.ajax/
//url : string - url of requested resource (mandatory)
//successCallback : function (mandatory)
//errorCallback : function
//type : string - request type (default = "get")
//dataType : string - data type (default = "json")
//data : data passed in request body for "post" or "put " request (default = "undefined")
var ajaxRequest = function(url, successCallback, errorCallback, type, dataType, data ) {
	
	type = typeof type === "undefined" ? "GET" : type;
	dataType = typeof dataType === "undefined" ? "json" : dataType;
	data = typeof data === "undefined" ? "undefined" : data;
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

	var row = "<tr><td>" + rowNumber + "</td>";
	for(var i = 0; i < properties.length; i++) {
		row += "<td>" + object[properties[i]] + "</td>";
	}	
	return row + "</tr>";
}

//returns table html string
//counter_start: int - what number first table row starts with
//headers : string array - example: ['name', 'address', 'email']
//properties : string array - example: ['Name', 'Address', 'Email'] data[i].Name, data[i].Address, data[i].Email will be put in each table row in that order
//data : objcet array - objects to put in the table
//output : DOM element jquery object - to append the table to
var buildTable = function (counter_start, headers, properties, data, $_output) {
	
	var counter = counter_start;
	var table = "<table>";
	table += buildTableHeaders(headers);
	if($.isArray(data)) {
		$.each(data, function(index, object) {
			table += buildTableRow(++counter, properties, object);
		});
	}
	else {
		table += buildTableRow(++counter, properties, data);
	}
	table += "</table>";
	$_output.empty().append(table);
}