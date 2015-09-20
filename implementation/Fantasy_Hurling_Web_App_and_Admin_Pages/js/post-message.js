$(document).ready(function() {

    setMessageBox();

    $('#post-new-message').click(function() {


        post_message();



    });



});




function getUserNames() {



    var _url = "http://hurlingapi.azurewebsites.net/api/users";




    var request = $.ajax({
        url: _url,
        async: true,

        success: function(data) {

            if ($.isArray(data)) {
                $.each(data, function(index, object) {




                    sessionStorage.setItem("userWIthId" + object.Id, object.Username);

                });



            }
            // $("#message-table").find("tr:gt(0)").remove();
            setMessageBox();
        }




    });




}




function clearTextField() {

    document.getElementById("message").value = "";
}


function setMessageBox() {



    $("#message-table").find("tr:gt(0)").remove();

    var _url = "http://hurlingapi.azurewebsites.net/api/messages?$orderby=Created desc&$top=3&$skip=0";


    $.ajax({
        url: _url,
        async: true,

        success: function(data) {

            if ($.isArray(data)) {
                $.each(data, function(index, object) {



                    var tr;
                    var username = sessionStorage.getItem("userWIthId" + object.UserId);

                    tr = $('<tr/>');

                    tr.append("<td>" + username + "</td>");

                    tr.append("<td>" + object.Text + "</td>");




                    $('#message-table').append(tr);


                });
            }

        }



    });

}



function readUserFromInputFields() {

    var id = sessionStorage.getItem("id");

    var text = document.getElementById("message").value;

    if (text == "") {
        text = "I forgot to post a message a developer saved me from looking silly";
    }
    var now = new Date();
    now = new Date().toLocaleString();

    var user = {
        Id: id,
        Text: text,
        UserId: id,
        Created: now

    };

    return user;
}


function post_message() {

    $("#message-table").find("tr:gt(0)").remove();


    $.ajax({
        type: "POST",
        url: "http://hurlingapi.azurewebsites.net/api/messages",
        data: readUserFromInputFields(),
        dataType: "json",
        success: function(data) {




            setMessageBox();
            document.getElementById("message").value = "Enter Message";

        },
        error: function(request, textStatus, errorThrown) {

            window.alert(textStatus + ": " + errorThrown + ": " + request.responseText);
        }
    });
}
