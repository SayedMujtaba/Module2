var form = $("#searchByTitle");
var btnSearch = $("#btnSearch-title")[0];
var btnReset = $("#btnReset-title")[0];
var linkReadReview = $("#readReviews")[0];
var storeResult;
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
            this.metascore = data.Metascore;
            this.imdbRating = data.imdbRating;
            this.imdbVotes = data.imdbVotes;
            this.imdbID = data.imdbID;
            this.type = data.Type;
            this.tSeason = data.totalSeasons;
            this.response = true;
            if (data.Poster != "N/A") {
                this.poster = data.Poster;
            }
            else {
                this.poster = "images/default_poster.jpg";
            }
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
    document.getElementById("year").innerText = data.year;
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
/*btnReset.onclick = function ():void{
    form.remove;
     output.style.visibility = "hidden";
      
}
linkReadReview.onclick = function():void{
    console.log(storeResult.imdbID);
    redirectToReviews(storeResult.imdbID);
}

function redirectToReviews(imdbId):void{
    document.getElementById("readReviews").innerHTML = "http://www.imdb.com/title/"+imdbId+"/reviews?ref_=tt_ql_3";
}*/
function init() {
    var m = "t=Avatar&y=2009&plot=short";
    sendOmdbRequest(m, function (omdbResult) {
        storeResult = new OMDB(omdbResult);
        if (storeResult.response == true) {
            output.style.visibility = "visible";
            showOutput(storeResult);
            getTrialer(storeResult.title, storeResult.year);
        }
        else {
            alert("Please make sure title field is not empty. Error message: " + storeResult.error);
        }
    });
}
btnSearch.onclick = function () {
    var userdata = form.serialize();
    console.log(userdata);
    sendOmdbRequest(userdata, function (omdbResult) {
        storeResult = new OMDB(omdbResult);
        if (storeResult.response == true) {
            output.style.visibility = "visible";
            showOutput(storeResult);
            getTrialer(storeResult.title, storeResult.year);
            console.log(omdbResult);
        }
        else {
            alert("Please make sure title field is not empty. Error message: " + storeResult.error);
        }
    });
};
function getTrialer(t, y) {
    var url = 'http://www.youtube.com/embed?listType=search&list=';
    var searchQuery = t + " year " + y + " trialer";
    var targetUrl = url + searchQuery;
    var ifr = document.getElementById('yPlayer');
    ifr.src = targetUrl;
    return false;
}
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
