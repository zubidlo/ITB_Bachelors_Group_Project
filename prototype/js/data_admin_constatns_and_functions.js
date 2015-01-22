//general utility functions
//they don't manipulate DOM so it's doesn't need to be ready just yet
//they use jquery so it must be loaded

//constants

//url for development and production
//var _url = "http://localhost:51642";
var _url = "http://hurlingapi.azurewebsites.net";
//how many rows will table have
var _top;
//starting point in the table (0)
var _skip = 0;
//items in the table
var _count = 0;

//gets a resource count
var updateCount = function(url) {
	
	$.ajax({
		url: url, 
		success: function(data) {
			_count = parseInt(data.length);
		}
	});
}

var tablePreviousPage = function(top, skip) {

	if (parseInt(skip) > 0) {
		return parseInt(skip) - parseInt(top);
	}
	return skip;
}

var tableNextPage = function(top, skip, count) {
	
	if (parseInt(skip) + parseInt(top) < parseInt(count)) {
		return parseInt(skip) + parseInt(top);
	}
	return skip;
}

//returns a table header row string built from given array of strings
var buildTableHeaders = function (headersNamesArray) {

	var headers = "<tr><th>#</th>";
	for(var i = 0; i < headersNamesArray.length; headers += "<th>" + headersNamesArray[i++] + "</th>");
	headers += "</tr>";
	return headers;
}

//returns one table row string built from given javascript object
//counter: number of the row
//properties : array object properties to put in the row
//given javasctipt object
var buildTableRow = function(counter, properties, object) {

	var i;
	var row = "<tr><td>" + counter + "</td>";
	for(i = 0; i < properties.length; i++) {
		row += "<td>" + object[properties[i]] + "</td>";
	}	
	row += "</tr>";
	return row;
}

//returns table html string
//counter_start: what number first table row starts with
//headers : array of strings you want to make table headers from example: headers = ['name', 'address', 'email']
//
//properties : array of strings you want to put in table row
//example : properties = ['Name', 'Address', 'Email'] 
//data[i].Name, data[i].Address, data[i].Email will be put in each table row in that order
//objcects id data array could have more properties than just those listed in properties array
//
//data : array of javasctipt objects you want to put in the table
//
//output : jquery object to append the table to
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