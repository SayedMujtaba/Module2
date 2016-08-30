var form = $("#searchByTitle");
var btnSearch = $("#btnSearch-title")[0];
var btnReset = $("#btnReset-title")[0];
var OMDB = (function () {
    function OMDB(data) {
        this.data = data;
        this.response = false;
        if (data.Response == "True") {
            this.title = data.Title;
            this.year = data.Year;
            this.rated = data.Rated;
            this.released = data.Released;
            this.runtime = data.Runtime;
            this.genre = data.Genre;
            this.director = data.Director;
            this.writer = data.Writer;
            this.actor = data.Actors;
            this.plot = data.Plot;
            this.language = data.Language;
            this.country = data.Country;
            this.awards = data.Awards;
            this.poster = data.Poster;
            this.metascore = data.Metascore;
            this.imdbRating = data.imdbRating;
            this.imdbVotes = data.imdbVotes;
            this.imdbID = data.imdbID;
            this.type = data.Type;
            this.response = true;
        }
        else {
            this.error = data.Error;
            console.log(this.error);
        }
    }
    return OMDB;
}());
btnSearch.onclick = function () {
    var userdata = form.serialize();
    sendOmdbRequest(userdata, function (omdbResult) {
        var storeResult = new OMDB(omdbResult);
        $('#output').append($('<pre>').text(JSON.stringify(omdbResult, null, '  ')));
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
