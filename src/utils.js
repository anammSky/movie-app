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

const tilesData = [
  {
    name: "Trending",
    searchTerm: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    id: "popular",
  },
  {
    name: "Top Rated",
    searchTerm: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    id: "top__rated",
  },
  {
    name: "Action",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=28`,
    id: "action",
  },
  {
    name: "Adventure",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=12`,
    id: "adventure",
  },
  {
    name: "Animation",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=16`,
    id: "animation",
  },
  {
    name: "Comedy",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=35`,
    id: "comedy",
  },
  {
    name: "Crime",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=80`,
    id: "crime",
  },
  {
    name: "Documentary",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=99`,
    id: "documentary",
  },
  {
    name: "Drama",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=18`,
    id: "Drama",
  },
  {
    name: "Family",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=10751`,
    id: "family",
  },
  {
    name: "Fantasy",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=14`,
    id: "fantasy",
  },
  {
    name: "History",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=36`,
    id: "history",
  },
  {
    name: "Horror",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=27`,
    id: "horror",
  },
  {
    name: "Music",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=10402`,
    id: "music",
  },
  {
    name: "Mystery",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=9648`,
    id: "mystery",
  },
  {
    name: "Romance",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=10749`,
    id: "romance",
  },
  {
    name: "Science Fiction",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=878`,
    id: "science__fiction",
  },
  {
    name: "TV Movie",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=10770`,
    id: "tv__movie",
  },
  {
    name: "Thriller",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=53`,
    id: "thriller",
  },
  {
    name: "War",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=10752`,
    id: "war",
  },
  {
    name: "Western",
    searchTerm: `discover/movie?api_key=${API_KEY}&with_genres=37`,
    id: "western",
  },
];

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

async function getWatchData(id) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
