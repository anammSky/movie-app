const searchBtn = document.getElementById("search-Btn");
const resultsContainer = document.getElementById("results-container");

searchBtn.addEventListener("click", searchMovie);

async function searchMovie(search) {
  search.preventDefault();
  resultsContainer.replaceChildren();
  const searchTerm = encodeURI(search.target.form.search.value);
  const region = "GB"; // location is currently hardcoded --> update once MVP is finished
  try {
    const response = await fetch(
      `${API_BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
    );
    const data = await response.json();
    for (let result of data.results) {
      const providerData = await getWatchData(result.id);
      if (!isEmpty(providerData.results[region])) {
        createSearchCard(result, providerData.results, region);
      }
    }
  } catch (error) {
    throw error;
  }
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

function getResults(movieData, watchData, region) {
  console.log(movieData, watchData);
  const movie = {
    id: movieData.id,
    title: movieData.title,
    // poster size = width 185
    img_url: API_IMG.base_url + API_IMG.poster_sizes[2] + movieData.poster_path,
    genre_ids: movieData.genre_ids,
    rating: movieData.vote_average,
    stream: watchData[region].flatrate ? watchData[region].flatrate : [],
    rent: watchData[region].rent ? watchData[region].rent : [],
    buy: watchData[region].buy ? watchData[region].buy : [],
  };

  return movie;
}

function createSearchCard(movieData, watchData, region) {
  const result = getResults(movieData, watchData, region);
  // console.log(result);
  // main card
  const resultCard = createElwithClass("article", "result-card");

  // img information
  const imgContainer = document.createElement("div");
  const resultImg = createElwithClass("img", "result-img");
  resultImg.src = result.img_url;

  imgContainer.append(resultImg);
  // title information
  const titleLine = document.createElement("div");
  const resultRating = createElwithClass("p", "result-rating");
  resultRating.textContent = result.rating.toFixed(2);

  const resultTitle = createElwithClass("h3", "result-title");
  resultTitle.textContent = result.title;

  titleLine.append(resultRating, resultTitle);
  //genre information
  const genreLine = document.createElement("div");
  for (let id of result.genre_ids) {
    const genreText = createElwithClass("p", "result-genre");
    genreText.textContent = genreIds[id];
    genreLine.appendChild(genreText);
  }

  // services information

  // final card
  resultCard.append(imgContainer, titleLine, genreLine);

  resultsContainer.append(resultCard);
}
