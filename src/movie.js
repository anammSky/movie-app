const mainMovie = document.querySelector(".main__movie");
const localMovieID = Number(window.localStorage.getItem("movieID"));

async function getMovieData(movieID) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    const providerData = await getWatchData(localMovieID);
    createMovieCard(data, providerData);
  } catch (error) {
    throw error;
  }
}

function getResults(movieData, watchData, region) {
  const movie = {
    id: movieData.id,
    title: movieData.title,
    vote: movieData.vote_average,
    img_url:
      API_IMG.base_url + API_IMG.backdrop_sizes[2] + movieData.backdrop_path,
    genres: movieData.genres,
    overview: movieData.overview,
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

function createMovieCard(movieData, watchData) {
  const result = getResults(movieData, watchData.results, "GB");

  const movieImage = document.querySelector(".image-of-movie");
  movieImage.src = result.img_url;

  const movieTitle = document.querySelector(".movie__title");
  movieTitle.textContent = result.title;

  const movieRating = document.querySelector(".movie__rating");
  movieRating.textContent = result.vote.toFixed(1);

  const genreRow = document.querySelector(".movie__genre__row");

  for (let genre of result.genres) {
    const genreItem = document.createElement("p");
    genreItem.classList.add("movie__genre__item");
    genreItem.textContent = genre.name;
    genreRow.append(genreItem);
  }

  const servicesRow = document.querySelector(".movie__all__services__row");

  for (let serviceInfo of result.watchServices) {
    const watchService = createWatchServicesEl(serviceInfo);
    servicesRow.append(watchService);
  }

  const overviewContainer = document.querySelector(".movie__overview");
  const overview = document.createElement("p");
  overview.textContent = result.overview;

  overviewContainer.append(overview);
}

function createWatchServicesEl(watchInfo) {
  const serviceContainer = createElwithClass("div", "movie_service__row");
  const titleEl = document.createElement("p");
  titleEl.textContent = watchInfo.serviceType;

  const movieRowIcon = createElwithClass("div", "movie__row__icon");

  for (let service of watchInfo.data) {
    const logoImg = document.createElement("img");
    logoImg.src = API_IMG.base_url + API_IMG.logo_sizes[0] + service.logo_path;
    movieRowIcon.append(logoImg);
  }
  serviceContainer.append(titleEl, movieRowIcon);

  return serviceContainer;
}
// access id from local storage
getMovieData(localMovieID);
