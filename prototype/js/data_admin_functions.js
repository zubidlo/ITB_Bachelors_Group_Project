//general utility functions
//they don't manipulate DOM so it's doesn't need to be ready just yet

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
//what number first table row starts with
//headers : array of strings you want to make table headers from example: headers = ['name', 'address', 'email']
//
//properties : array of strings you want to put in table row
//example : properties = ['Name', 'Address', 'Email'] 
//data[i].Name, data[i].Address, data[i].Email will be put in each table row in that order
//objcects id data array could have more properties than just those listed in properties array
//
//data : array of javasctipt objects you want to put in the table
//
//output_id : id attribute value of element you want to append table to
var buildTable = function (counter_start, headers, properties, data, output_id) {
	
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
	$("#" + output_id + "").empty().append(table);
}

//clears given form input fields to default values
//form_id is value of id attribute of given html form
var clearFormInputFields = function (form_id) {
	
	$.each($("#"+form_id+" input"), function() {
		
		switch (this.type) {
			case "number": 
				this.value = "0";
				break;
			case "text":
				this.value = "";
				break;
			case "email":
				this.value = "";
				break;
		}
	});
}