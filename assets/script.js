// link api

function getIdGenre() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=798d3829156f2a1840e8049c3a0c46b1&language=en-US", requestOptions)
        .then(response => response.json())
        // adds to page instead of console
        .then(result => {
            // each genre has a button. 
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
            result.genres.forEach(element => document.body.innerHTML = document.body.innerHTML + `<button class="genres" genre-id="${element.id}">${element.name}</button>`);
            var allGenres=Array.from(document.getElementsByClassName(`genres`));
            allGenres.forEach(genrebtn => genrebtn.addEventListener('click', function (event){
                // choosing a genre will give you a list of movies from that genre
                var genreId=event.target.getAttribute('genre-id')
                getMovies(genreId)
            }))
            
        })
        .catch(error => console.log('error', error));
}
// getIdGenre()

function getMovies(genreId) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=798d3829156f2a1840e8049c3a0c46b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`, requestOptions)
        .then(response => response.json())
        .then(result => {
            // image for each movie
            // https://developers.themoviedb.org/3/getting-started/images
            result.results.forEach(movie => document.body.innerHTML = document.body.innerHTML + `<div class="movies" movie-id="${movie.id}">
            <h2>${movie.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            </div>`);
        })
        .catch(error => console.log('error', error));
}
// getMovies()

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

var elem = document.getElementById("genresbtn");
elem.addEventListener('click', function (){
    getIdGenre()
});
