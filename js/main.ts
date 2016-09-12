var form = $("#searchByTitle");
var btnSearch = $("#btnSearch-title")[0];
var btnReset = $("#btnReset-title")[0];

var storeResult:OMDB;

var output =$("#output")[0];
class OMDB {
    title: string;
    year: string;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actor: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    metascore: number;
    imdbRating: number;
    imdbVotes: number;
    imdbID: string;
    type: string;
    tSeason:string;
    response: boolean = false;
    error: string;
    constructor(public data){
        if(data.Response == "True"){
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
            if(data.Poster != "N/A"){
                this.poster = data.Poster;
            }else{
                this.poster = "images/default_poster.jpg";
            }
        }else{
            this.error = data.Error;
            console.log(this.error);
        }
    }  
}
function showOutput(data):void{
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
    if(data.type != "movie"){
        document.getElementById("tSeasons").style.visibility = "visible";
         document.getElementById("totalseason").style.visibility = "visible";
        document.getElementById("tSeasons").innerText = data.tSeason;
    }else{
        document.getElementById("totalseason").style.visibility = "hidden";
        document.getElementById("tSeasons").style.visibility = "hidden";
    }
}
btnReset.onclick = function ():void{ 
    form.remove;
     output.style.visibility = "hidden";
      
}

btnSearch.onclick = function ():void{ 
    var userdata = form.serialize();
    console.log(userdata);
    sendOmdbRequest(userdata, function(omdbResult){
       storeResult = new OMDB(omdbResult);
      if(storeResult.response == true){
         output.style.visibility = "visible";
         showOutput(storeResult);
         console.log(omdbResult);
     /* sendVideoRequest(storeResult.title, function(){

      });*/
      }else{
          alert("Please make sure title field is not empty. Error message: "+storeResult.error);
      }});
}

function sendOmdbRequest(userdata, callback) : void {
    $.ajax({
        url: "http://www.omdbapi.com/?"+ userdata,
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

function sendVideoRequest(name, callback) : void{
    var params = {
            // Request parameters
            "q": name,
            "count": "10",
            "offset": "0",
            "mkt": "en-us",
            "safeSearch": "Moderate",
        };
      
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/videos/search?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","d0ead265b3564c13870e41c9d67fde0f");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            console.log(data);
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
}