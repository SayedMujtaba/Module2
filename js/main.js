/*Buttons and Forms tags*/
var form = $("#searchByTitle");
var btnSearch = $("#btnSearch-title")[0];
var btnReset = $("#btnReset-title")[0];
/*Link to redirect to imdb website reviews*/
var linkReadReview = $("#readReviews")[0];
/*Global varible*/
var storeResult;
/* Class to store data retrived form omdb site  */
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
            alert(this.error);
            console.log(this.error);
        }
    }
    return OMDB;
}());
/* Show data from IMDB server*/
function showOutput(data) {
    $("#title").text(data.title);
    $("#poster").attr("src", data.poster);
    $("#story").text(data.plot);
    $("#released").text(data.released);
    $("#rated").text(data.rated);
    $("#genre").text(data.genre);
    $("#runtime").text(data.runtime);
    $("#director").text(data.director);
    $("#writer").text(data.writer);
    $("#actors").text(data.actor);
    $("#lang").text(data.language);
    $("#country").text(data.country);
    $("#awards").text(data.awards);
    $("#metascore").text(data.metascore);
    $("#imdbrating").text(data.imdbRating);
    $("#imdbvotes").text(data.imdbVotes);
    $("#type").text(data.type);
    $("#year").text(data.year);
    if (data.type != "movie") {
        $("#tSeasons").attr("style", "visibility: visible");
        $("#totalseason").attr("style", "visibility: visible");
        $("#tSeasons").text(data.tSeason);
    }
    else {
        $("#totalseason").attr("style", "visibility: hidden");
        $("#tSeasons").attr("style", "visibility: hidden");
    }
}
/*A link on page that redirect user to imdb site which show reviews from other users.*/
function redirectToReviews(imdbId) {
    linkReadReview.href = "http://www.imdb.com/title/" + imdbId + "/reviews?ref_=tt_ql_3";
}
/*This fuction is used to load a default movie on screen when user is first visit the site*/
function init() {
    var m = "t=Avatar&y=2009&plot=short";
    sendOmdbRequest(m, function (omdbResult) {
        storeResult = new OMDB(omdbResult);
        if (storeResult.response == true) {
            showOutput(storeResult);
            getTrialer(storeResult.title, storeResult.year);
            linkReadReview.onclick = function () {
                redirectToReviews(storeResult.imdbID);
            };
        }
        else {
            alert("Please make sure title field is not empty. Error message: " + storeResult.error);
        }
    });
}
/*Search button is clicked or enter is pressed on keyboard the btnSearch method is called
which calls other methods*/
btnSearch.onclick = function () {
    var userdata = form.serialize();
    sendOmdbRequest(userdata, function (omdbResult) {
        storeResult = new OMDB(omdbResult);
        if (storeResult.response == true) {
            showOutput(storeResult);
            getTrialer(storeResult.title, storeResult.year);
            linkReadReview.onclick = function () {
                redirectToReviews(storeResult.imdbID);
            };
        }
        else {
            alert("Please make sure title field is not empty. Error message: " + storeResult.error);
        }
    });
};
//To find a trial for movies/shows youtube url is used to search for title and year  
//for a movie/show. Which is than added to Ifram.
function getTrialer(t, y) {
    var url = 'http://www.youtube.com/embed?listType=search&list=';
    var searchQuery = t + " year " + y + " trialer";
    var targetUrl = url + searchQuery;
    var ifr = $("#yPlayer")[0];
    ifr.src = targetUrl;
    return false;
}
//Query is send to OMDB api to get data from them as json file 
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
//Testing app insight telemetry
var telemetry = new RequestTelemetry();
// Note: A single instance of telemetry client is sufficient to track multiple telemetry items.
var ai = new TelemetryClient();
// At start of processing this request:
// Operation Id and Name are attached to all telemetry and help you identify
// telemetry associated with one request:
telemetry.Context.Operation.Id = Guid.NewGuid().ToString();
telemetry.Context.Operation.Name = "requestName";
var stopwatch = System.Diagnostics.Stopwatch.StartNew();
// ... process the request ...
stopwatch.Stop();
ai.TrackRequest("requestName", DateTime.UtcNow, stopwatch.Elapsed, "200", true);
// Response code, success 
