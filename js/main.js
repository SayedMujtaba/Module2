var record = $("#record")[0];
var ricon = $("#recordIcon")[0];
var toutput = $("#toutput")[0];
record.onclick = function chgColor() {
    console.log(record.className);
    if (record.className == 'btn btn-success') {
        record.className = "btn btn-danger";
        ricon.className = "glyphicon glyphicon-stop";
        sendOmdbRequest(function (movieData) {
            toutput.innerHTML = movieData.Year;
        });
    }
    else {
        record.className = "btn btn-success";
        ricon.className = "glyphicon glyphicon-record";
    }
};
function sendOmdbRequest(callback) {
    $.ajax({
        url: "http://www.omdbapi.com/?t=Another",
        /* beforeSend: function (xhrObj) {
             // Request headers
             xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
             xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "d342c8d19d4e4aafbf64ed9f025aecc8");
         },*/
        type: "Get",
        data: Text,
        processData: false
    })
        .done(function (data) {
        if (data.length != 0) {
            // Get the emotion scores
            var movie = data;
            callback(movie);
            console.log(movie);
        }
        else {
            toutput.innerHTML = " Try another?";
        }
    })
        .fail(function (error) {
        toutput.innerHTML = "Sorry, something went wrong. :( Try again in a bit?";
        console.log(error.getAllResponseHeaders());
    });
}
