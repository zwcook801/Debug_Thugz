
function getDetails() {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    //Fetch movies from TMDB, with a response in JSON, console logging the result and capturing any errors
    fetch(
        "https://api.themoviedb.org/3/movie/550?api_key=798d3829156f2a1840e8049c3a0c46b1&language=en-US",
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}

// Setting watchlist as empty which can be used later in the code
var watchlist = [];

function getMovies(genreId) {

    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    //fetch movies based on genre from TMDB
    fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=798d3829156f2a1840e8049c3a0c46b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => {
            console.log("getMovies", result);
            var moviedivparent = document.getElementsByClassName(`moviesDiv`)[0];
            result.results.forEach((movie) => {
                var movieDiv = document.createElement("div");
                movieDiv.className = "movies";
                movieDiv.setAttribute("movie-id", movie.id);
                movieDiv.innerHTML = `
                  <h2 class="movieName">${movie.title}</h2>
                  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path
                    }" alt="movie image"> 
                  <p class="movieRev">${movie.overview}</p>
                  <p>Rating: ${movie.vote_average}</p>
                  <p>Release Date: ${movie.release_date}</p>
                  <button class="add-to-watchlist" data-movie='${JSON.stringify(
                        movie
                    )}'>Add to Watchlist</button>`;
                moviedivparent.appendChild(movieDiv);
            });

            var addToWatchlistButtons = Array.from(
                document.getElementsByClassName("add-to-watchlist")
            );
            addToWatchlistButtons.forEach((button) => {
                button.addEventListener("click", async function (event) {
                    if (watchlist.length < 4) {
                        var movieData = JSON.parse(event.target.dataset.movie);
                        if (!watchlist.some((movie) => movie.id === movieData.id)) {
                            const link = await getTrailerLink(movieData.title);
                            console.log("linkretrieve", link);
                            movieData.link = link;
                            watchlist.push(movieData);
                            localStorage.setItem('watchlist', JSON.stringify(watchlist));
                            showWatchlist();
                            button.innerHTML = "Added to Watchlist"
                            console.log(watchlist);
                        } else {
                            alert("This movie is already in your watchlist!");
                        }
                    } else {
                        alert("You can only add up to 4 movies to your watchlist!");
                    }
                });
            });
        })
        .catch((error) => console.log("error", error));
}

async function getTrailerLink(title) {
    console.log("getTrailerLink", title);
    var requestOptions = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "fd4fb301f1mshc9090a171201103p1c9e2ejsn5169072e8ce4",
            //'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        },
    };
    const data = await fetch(
        `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=us&show_type=movie&output_language=en`,
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => data);
    console.log("fetchresult", data.result);
    return data.result[0].youtubeTrailerVideoLink;
}

function getTvshows() {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    fetch(
        "https://api.themoviedb.org/3/discover/tv?api_key=798d3829156f2a1840e8049c3a0c46b1&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=35&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0",
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}

function showWatchlist() {
    var watchlistDiv = document.getElementById("watchlist");
    watchlistDiv.innerHTML = "";
    watchlist.forEach((movie) => {
        var movieDiv = document.createElement("div");
        movieDiv.className = "movies";
        movieDiv.setAttribute("movie-id", movie.id);
        movieDiv.innerHTML = `
          <h2>${movie.title}</h2>
          <div class=trailer >
          <a href="${movie.link}" target="_blank">Click Here To Trailer!</a>
          </div>
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie image">`;
        watchlistDiv.appendChild(movieDiv);
        console.log(movie);
        watchlistDiv.addEventListener("click", function (event) {
            if (event.target.classList.contains("remove-from-watchlist")) {
                var movieId = event.target.parentNode.getAttribute("movie-id");
                watchlist = watchlist.filter((movie) => movie.id != movieId);
                localStorage.setItem("watchlist", JSON.stringify(watchlist));
                showWatchlist();
            }
        });

        movieDiv.innerHTML = `
    <h2>${movie.title}</h2>
    <div class=trailer >
    <a href="${movie.link}" target="_blank">Click Here To Trailer!</a>
    </div>
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie image">
    <button class="remove-from-watchlist">Remove</button>
`;
    });
}

var storedWatchlist = localStorage.getItem("watchlist");
if (storedWatchlist) {
    watchlist = JSON.parse(storedWatchlist);
}

var watchlist = [];

function getIdGenre() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=798d3829156f2a1840e8049c3a0c46b1&language=en-US", requestOptions)
        .then(response => response.json())
        .then(result => {
            result.genres.forEach(element => document.body.innerHTML = document.body.innerHTML + `<button class="genres" genre-id="${element.id}">${element.name}</button>`);
            var allGenres = Array.from(document.getElementsByClassName(`genres`));
            allGenres.forEach(genrebtn => genrebtn.addEventListener('click', function (event) {
                var genreId = event.target.getAttribute('genre-id')
                getMovies(genreId)
            }))
        })
        .catch((error) => console.log("error", error));
}

var elem = document.getElementById("genresbtn");
elem.addEventListener('click', function () {
    genresbtn.style.visibility = 'hidden';
    getIdGenre();
});

var storedWatchlist = localStorage.getItem("watchlist");
if (storedWatchlist) {
    watchlist = JSON.parse(storedWatchlist);
}

window.addEventListener("load", (event) => {
    showWatchlist();
    console.log("windowload");
});
