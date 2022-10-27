const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_IMG = {
  base_url: "http://image.tmdb.org/t/p/",
  secure_base_url: "https://image.tmdb.org/t/p/",
  backdrop_sizes: ["w300", "w780", "w1280", "original"],
  logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
};

const genreIds = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function createElwithClass(element, className) {
  const el = document.createElement(element);
  el.classList.add(className);

  return el;
}

// get movie list genres updated list
async function getMovieGenresList() {
  const response = await fetch(
    `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  const data = await response.json();
}

function isEmpty(object) {
  for (const property in object) {
    return false;
  }
  return true;
}
