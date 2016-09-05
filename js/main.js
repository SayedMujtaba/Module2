var form = $("#searchByTitle");
var btnSearch = $("#btnSearch-title")[0];
var btnReset = $("#btnReset-title")[0];
var output = $("#output")[0];
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
            this.tSeason = data.totalSeasons;
            this.response = true;
        }
        else {
            this.error = data.Error;
            console.log(this.error);
        }
    }
    return OMDB;
}());
function showOutput(data) {
    document.getElementById("title").innerText = data.title;
    document.getElementById("poster").src = data.poster;
    document.getElementById("story").innerText = data.plot;
    document.getElementById("released").innerText = data.released;
    document.getElementById("rated").innerText = data.rated;
    document.getElementById("genre").innerText = data.genre;
    document.getElementById("runtime").innerText = data.runtime;
    document.getElementById("director").innerText = data.director;
    document.getElementById("writer").innerText = data.writer;
    document.getElementById("actors").innerText = data.actor;
    document.getElementById("lang").innerText = data.language;
    document.getElementById("country").innerText = data.country;
    document.getElementById("awards").innerText = data.awards;
    document.getElementById("metascore").innerText = data.metascore;
    document.getElementById("imdbrating").innerText = data.imdbRating;
    document.getElementById("imdbvotes").innerText = data.imdbVotes;
    document.getElementById("type").innerText = data.type;
    if (data.type != "movie") {
        document.getElementById("tSeasons").style.visibility = "visible";
        document.getElementById("totalseason").style.visibility = "visible";
        document.getElementById("tSeasons").innerText = data.tSeason;
    }
    else {
        document.getElementById("totalseason").style.visibility = "hidden";
        document.getElementById("tSeasons").style.visibility = "hidden";
    }
}
btnSearch.onclick = function () {
    var userdata = form.serialize();
    console.log(userdata.length);
    sendOmdbRequest(userdata, function (omdbResult) {
        var storeResult = new OMDB(omdbResult);
        if (storeResult.response == true) {
            output.style.visibility = "visible";
            showOutput(storeResult);
        }
        else {
            alert("Please make sure title field is not empty. Error message: " + storeResult.error);
        }
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
