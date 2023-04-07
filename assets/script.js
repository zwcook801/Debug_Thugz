// link api 798d3829156f2a1840e8049c3a0c46b1

function getDetails() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.themoviedb.org/3/movie/550?api_key=798d3829156f2a1840e8049c3a0c46b1&language=en-US", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
// getDetails()

// var elem = document.getElementById("genresbtn");
// elem.addEventListener('click', function () {
//     getIdGenre()
// });



var watchlist = [];

// function getIdGenre() {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };
    
//     fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=798d3829156f2a1840e8049c3a0c46b1&language=en-US", requestOptions)
//         .then(response => response.json())
//          // adds to page instead of console
//         .then(result => {
//             // each genre has a button. 
//             var genredivparent = document.getElementsByClassName(`genresDiv`)[0]
//             result.genres.forEach(element => genredivparent.innerHTML = genredivparent.innerHTML + `<button class="genres" genre-id="${element.id}">${element.name}</button>`);
//             var allGenres = Array.from(document.getElementsByClassName(`genres`));
//             allGenres.forEach(genrebtn => genrebtn.addEventListener('click', function (event) {
//                 var genreId = event.target.getAttribute('genre-id')
//                 getMovies(genreId)
//             }))

//         })
//         .catch(error => console.log('error', error));
// }

function getMovies(genreId) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=798d3829156f2a1840e8049c3a0c46b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`, requestOptions)
        .then(response => response.json())
        .then(result => {
            var moviedivparent = document.getElementsByClassName(`moviesDiv`)[0]
            result.results.forEach(movie => {
                var movieDiv = document.createElement('div');
                movieDiv.className = 'movies';
                movieDiv.setAttribute('movie-id', movie.id);
                movieDiv.innerHTML = `
                  <h2 class="movieName">${movie.title}</h2>
                  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image"> 
                  <p class="movieRev">${movie.overview}</p>
                  <p>Rating: ${movie.vote_average}</p>
                  <p>Release Date: ${movie.release_date}</p>
                  <button class="add-to-watchlist" data-movie='${JSON.stringify(movie)}'>Add to Watchlist</button>`;
                  moviedivparent.appendChild(movieDiv);
            });

            var addToWatchlistButtons = Array.from(document.getElementsByClassName('add-to-watchlist'));
            addToWatchlistButtons.forEach(button => {
                button.addEventListener('click', function (event) {
                    if (watchlist.length < 4) {
                        var movieData = JSON.parse(event.target.dataset.movie);
                        if (!watchlist.some(movie => movie.id === movieData.id)) {
                            watchlist.push(movieData);
                            localStorage.setItem('watchlist', JSON.stringify(watchlist));
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
        .catch(error => console.log('error', error));
}




function showWatchlist() {
    var watchlistDiv = document.getElementById('watchlist');
    watchlistDiv.innerHTML = '';
    watchlist.forEach(movie => {
        var movieDiv = document.createElement('div');
        movieDiv.className = 'movies';
        movieDiv.setAttribute('movie-id', movie.id);
        movieDiv.innerHTML = `
          <h2>${movie.title}</h2>
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie image">`;
        watchlistDiv.appendChild(movieDiv);
        console.log(movie);
        watchlistDiv.addEventListener('click', function (event) {
            if (event.target.classList.contains('remove-from-watchlist')) {
                var movieId = event.target.parentNode.getAttribute('movie-id');
                watchlist = watchlist.filter(movie => movie.id != movieId);
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
                showWatchlist();
            }
        });

        movieDiv.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie image">
    <button class="remove-from-watchlist">Remove</button>
`;
    });
}

var elem = document.getElementById("genresbtn");
elem.addEventListener('click', function () {
    getIdGenre();
});

var storedWatchlist = localStorage.getItem('watchlist');
if (storedWatchlist) {
    watchlist = JSON.parse(storedWatchlist);
}

window.addEventListener("load", (event) => {
    showWatchlist();
});


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
        .catch(error => console.log('error', error));
}


function showWatchlist() {
    var watchlistDiv = document.getElementById('watchlist');
    watchlistDiv.innerHTML = '';
    watchlist.forEach(movie => {
        var movieDiv = document.createElement('div');
        movieDiv.className = 'movies';
        movieDiv.setAttribute('movie-id', movie.id);
        movieDiv.innerHTML = `
          <h2>${movie.title}</h2>
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie image">`;
        watchlistDiv.appendChild(movieDiv);
        console.log(movie);
        watchlistDiv.addEventListener('click', function (event) {
            if (event.target.classList.contains('remove-from-watchlist')) {
                var movieId = event.target.parentNode.getAttribute('movie-id');
                watchlist = watchlist.filter(movie => movie.id != movieId);
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
                showWatchlist();
            }
        });

        movieDiv.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie image">
    <button class="remove-from-watchlist">Remove</button>
`;
    });
}

var elem = document.getElementById("genresbtn");
elem.addEventListener('click', function () {
    getIdGenre();
});

var storedWatchlist = localStorage.getItem('watchlist');
if (storedWatchlist) {
    watchlist = JSON.parse(storedWatchlist);
}

window.addEventListener("load", (event) => {
    showWatchlist();
});
