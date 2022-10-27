const tilesData = [
  { name: "Trending", searchTerm: "popular", id: "popular" },
  { name: "Top Rated", searchTerm: "top_rated", id: "top__rated" },
];

//GENRE SECTION GRABBERS
const main = document.querySelector("main");

//GET MOVIE DATA FUNCTION
async function getMovies(typeList, el) {
  try {
    const response = await fetch(
      `${API_BASE_URL}movie/${typeList}?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    createFrontPageCard(data, el);
  } catch (error) {
    throw error;
  }
}

//CREATE CARD FUNCTION
function createFrontPageCard(data, el) {
  const movieData = data.results;

  for (let i = 0; i < 10; i++) {
    //CARD SECTION CREATE
    const card = createElwithClass("div", "section__card");

    //IMAGE SECTION CREATE
    const sectionImage = createElwithClass("div", "section__image");
    const movieImage = document.createElement("img");
    movieImage.src =
      API_IMG.base_url + API_IMG.poster_sizes[2] + movieData[i].poster_path;

    //APPEND IMAGE TO DIV
    sectionImage.append(movieImage);

    //TEXT SECTION CREATE
    const sectionText = createElwithClass("div", "section__text");

    //TEXT TOP
    const textTop = createElwithClass("div", "text__top");

    //MOVIE TITLE CREATE
    const movieTitle = document.createElement("p");
    movieTitle.textContent = movieData[i].title;
    //APPEND MOVIE TITLE TO TEXT TOP
    textTop.append(movieTitle);

    //TEXT BOTTOM CREATE
    const textBottom = createElwithClass("div", "text__bottom");

    for (let id of movieData[i].genre_ids) {
      const genreTag = document.createElement("p");
      genreTag.textContent = genreIds[id];
      textBottom.append(genreTag);
    }
    const movieRating = document.createElement("p");
    movieRating.textContent = movieData[i].vote_average;

    //APPEND GENRE AND TAG TO TEXT BOTTOM
    textBottom.append(movieRating);

    //APPEND TEXT TO TEXT SECTION
    sectionText.append(textTop, textBottom);

    //APPENDS THE IMAGE AND MOVIE DETAILS TO THE CARD
    card.append(sectionImage, sectionText);

    //APPENDS THE WHOLE CARD TO THE PAGE
    el.append(card);
  }
}

for (let tile of tilesData) {
  const tileEl = createElwithClass("section", "genre__section");
  tileEl.id = tile.id;
  const title = document.createElement("h2");
  title.textContent = tile.name;
  const sectionRow = createElwithClass("div", "section__row");

  tileEl.append(title, sectionRow);
  main.append(tileEl);

  getMovies(tile.searchTerm, sectionRow);
}
