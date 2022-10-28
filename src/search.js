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
  const movie = {
    id: movieData.id,
    title: movieData.title,
    // poster size = width 185
    img_url: API_IMG.base_url + API_IMG.poster_sizes[2] + movieData.poster_path,
    genre_ids: movieData.genre_ids,
    rating: movieData.vote_average,
    watchServices: [],
  };

  for (let service in watchData[region]) {
    if (service !== "link") {
      const temp = {
        serviceType: service === "flatrate" ? "stream" : service,
        data: watchData[region][service],
      };
      movie.watchServices.push(temp);
    }
  }
  return movie;
}

function createSearchCard(movieData, watchData, region) {
  const result = getResults(movieData, watchData, region);
  // main card
  const resultCard = createElwithClass("article", "search--result__card");

  // img information
  const imgContainer = createElwithClass("div", "search--poster__container");
  const resultImg = createElwithClass("img", "search--result__img");
  resultImg.src = result.img_url;

  imgContainer.append(resultImg);

  const infoContainer = createElwithClass("div", "search--movie-info");
  // title information
  const titleLine = createElwithClass("div", "search--title__row");
  const resultRating = createElwithClass("p", "search--result__rating");
  resultRating.textContent = result.rating.toFixed(2);

  const resultTitle = createElwithClass("h3", "search--result__title");
  resultTitle.textContent = result.title;

  titleLine.append(resultRating, resultTitle);
  //genre information
  const genreLine = createElwithClass("div", "search--genre__row");
  for (let id of result.genre_ids) {
    const genreText = createElwithClass("p", "search--result__genre");
    genreText.textContent = genreIds[id];
    genreLine.appendChild(genreText);
  }

  // services information
  const servicesContainer = createElwithClass(
    "div",
    "search--services__containers"
  );
  for (let serviceInfo of result.watchServices) {
    const watchService = createWatchServicesEl(serviceInfo);
    servicesContainer.append(watchService);
  }

  infoContainer.append(titleLine, genreLine, servicesContainer);

  // final card
  resultCard.append(imgContainer, infoContainer);

  resultsContainer.append(resultCard);
}

function createWatchServicesEl(watchInfo) {
  console.log(watchInfo);
  const serviceContainer = createElwithClass(
    "div",
    "search--service__container"
  );
  const titleEl = createElwithClass("h3", "search--service__title");
  titleEl.textContent = watchInfo.serviceType;

  const serviceRow = createElwithClass("div", "search--service__row");

  for (let service of watchInfo.data) {
    const logoContainer = createElwithClass("div", "search--logo__container");
    const logoImg = createElwithClass("img", "search--logo");
    logoImg.src = API_IMG.base_url + API_IMG.logo_sizes[0] + service.logo_path;
    logoContainer.append(logoImg);
    serviceRow.append(logoContainer);
  }
  serviceContainer.append(titleEl, serviceRow);

  return serviceContainer;
}
