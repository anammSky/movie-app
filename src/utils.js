const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_IMG = {
  base_url: "http://image.tmdb.org/t/p/",
  secure_base_url: "https://image.tmdb.org/t/p/",
  backdrop_sizes: ["w300", "w780", "w1280", "original"],
  logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
};

function createElwithClass(element, className) {
  const el = document.createElement(element);
  el.classList.add(className);

  return el;
}
