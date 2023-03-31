




//Fetching the TMDB api below.
method: 'GET',
redirect: 'follow'
};

fetch("https://api.themoviedb.org/3/discover/movie?api_key=798d3829156f2a1840e8049c3a0c46b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_watch_monetization_types=flatrate", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));```