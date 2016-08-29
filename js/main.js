var form = $("#searchByTitle");
var btnSearch = $("#btnSearch-title")[0];
var btnReset = $("#btnReset-title")[0];
btnSearch.onclick = function () {
    var userdata = form.serialize();
    sendOmdbRequest(userdata, function (omdbResult) {
        console.log(omdbResult);
    });
};
function sendOmdbRequest(userdata, callback) {
    $.ajax({
        url: "http://www.omdbapi.com/?" + userdata,
        type: "Get",
        data: Text,
        processData: false
    }).done(function (data) {
        var movie = data;
        callback(movie);
    }).fail(function (error) {
        console.log(error.getAllResponseHeaders());
    });
}
