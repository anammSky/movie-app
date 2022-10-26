const searchBtn = document.getElementById("search-Btn");
const resultsContainer = document.getElementById("results-container");

const API_URL = "https://api.themoviedb.org/3/";
const API_IMG = {
  base_url: "https://image.tmdb.org/t/p/",
  secure_base_url: "https://image.tmdb.org/t/p/",
  backdrop_sizes: ["w300", "w780", "w1280", "original"],
  logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
};

searchBtn.addEventListener("click", searchMovie);

async function searchMovie(search) {
  search.preventDefault();
  const searchTerm = encodeURI(search.target.form.search.value);
  try {
    const response = await fetch(
      `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
    );
    const data = await response.json();
    console.log(data);
    createSearchCard(data);
  } catch (error) {
    return error;
  }
}

function getResults(data) {
  const movie = {
    title: data.results[0].title,
    img_url:
      API_IMG.base_url + API_IMG.poster_sizes[0] + data.results[0].poster_path,
    rating: data.results[0].vote_average,
  };
  return movie;
}

function createSearchCard(data) {
  const result = getResults(data);
  console.log(result);
  // main card
  const resultCard = createElwithClass("article", "result-card");

  // img information
  const resultImg = createElwithClass("img", "result-img");
  resultImg.src = result.img_url;

  // title information
  const titleLine = document.createElement("div");
  const resultRating = createElwithClass("p", "result-rating");
  resultRating.textContent = result.rating;

  const resultTitle = createElwithClass("h3", "result-title");
  resultTitle.textContent = result.title;

  titleLine.append(resultRating, resultTitle);
  //genre information
  const genreLine = document.createElement("div");
  const genre = createElwithClass("p", "result-genre");
  genre.textContent = "drama";

  genreLine.append(genre);
  // services information

  // final card
  resultCard.append(resultImg, titleLine, genreLine);

  resultsContainer.append(resultCard);
}
function createElwithClass(element, className) {
  const el = document.createElement(element);
  el.classList.add(className);

  return el;
}
