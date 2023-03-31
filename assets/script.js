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
            // TODO: add eventlistener to each of the genres 
            result.genres.forEach(element => document.body.innerHTML = document.body.innerHTML + `<button>${element.name}</button>`);
        })
        .catch(error => console.log('error', error));
}
// getIdGenre()

function getMovies() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://api.themoviedb.org/3/discover/movie?api_key=798d3829156f2a1840e8049c3a0c46b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_watch_monetization_types=flatrate", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
// getMovies()

function getDetails() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://api.themoviedb.org/3/movie/550?api_key=798d3829156f2a1840e8049c3a0c46b1&language=en-US", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
// getDetails()

var elem = document.getElementById("genresbtn");
elem.addEventListener('click', function (){
    getIdGenre()
});
