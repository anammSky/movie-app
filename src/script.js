//GENRE SECTION GRABBERS
const main = document.querySelector("main");
const body = document.querySelector("body");

//GET MOVIE DATA FUNCTION
async function getMovieList(typeList, el) {
  try {
    const response = await fetch(`${API_BASE_URL}${typeList}`);
    const data = await response.json();
    createFrontPageCard(data, el);
  } catch (error) {
    throw error;
  }
}

//CREATE CARD FUNCTION
function createFrontPageCard(data, el) {
  const movieData = data.results;

  for (let i = 0; i < 15; i++) {
    //CARD SECTION CREATE
    const card = createElwithClass("div", "section__card");
    // card.setAttribute("data-id", movieData[i].id);

    //IMAGE SECTION CREATE
    const sectionImage = createElwithClass("div", "section__image");
    const movieImage = document.createElement("img");
    // const movieImageAnchor = document.createElement("a");
    // movieImageAnchor.href = "/movie.html";
    // movieImageAnchor.href = "#";

    movieImage.src =
      API_IMG.base_url + API_IMG.poster_sizes[2] + movieData[i].poster_path;

    movieImage.setAttribute("data-id", movieData[i].id);

    // movieImageAnchor.append(movieImage);

    //APPEND IMAGE TO DIV
    // sectionImage.append(movieImageAnchor);
    sectionImage.append(movieImage);
    //TEXT SECTION CREATE
    const sectionText = createElwithClass("div", "section__text");

    //TEXT TOP
    const textTop = createElwithClass("div", "text__top");

    //MOVIE TITLE CREATE
    const movieTitle = document.createElement("h3");
    movieTitle.textContent = movieData[i].title;
    //APPEND MOVIE TITLE TO TEXT TOP
    textTop.append(movieTitle);

    //TEXT BOTTOM CREATE
    const textBottom = createElwithClass("div", "text__bottom");

    for (let id of movieData[i].genre_ids) {
      const genreTag = document.createElement("p");
      genreTag.classList.add("genre__list");
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

function loadPage() {
  for (let tile of tilesData) {
    const tileEl = createElwithClass("section", "genre__section");
    tileEl.id = tile.id;
    const title = document.createElement("h2");
    title.textContent = tile.name;
    const sectionRow = createElwithClass("div", "section__row");

    tileEl.append(title, sectionRow);
    main.append(tileEl);

    getMovieList(tile.searchTerm, sectionRow);
  }
}
if (window.location.pathname === "/index.html") loadPage();

// DO NOT MOVE THESE CONST
const genreSection = document.querySelectorAll(".genre__section");
const genreListButton = document.querySelector("#genre-tab-btn");

genreSection.forEach((section) => {
  section.addEventListener("click", (e) => {
    const target = e.target;
    // save id to local storage
    const MOVIE_ID = Number(target.dataset.id);
    console.log(MOVIE_ID);
    if (MOVIE_ID) {
      window.localStorage.setItem("movieID", MOVIE_ID);
      window.location.href = "/movie.html";
    }
  });
});

genreListButton.addEventListener("click", () => {
  genreListButton.disabled = true;
  const genreAside = createElwithClass("aside", "sidebar");

  const genreTopDiv = createElwithClass("div", "sidebar__top");
  const closeBtnImg = createElwithClass("img", "closeIcon");
  closeBtnImg.src = "assets/close.png";
  genreTopDiv.append(closeBtnImg);

  const genreBottomDiv = createElwithClass("div", "sidebar__bottom");
  const genreListContainer = document.createElement("ul");

  for (let genre of tilesData) {
    const genreListItem = createElwithClass("li", "genreItem");
    const scrollToItem = document.createElement("a");
    scrollToItem.href = `#${genre.id}`;
    scrollToItem.textContent = genre.name;
    genreListItem.append(scrollToItem);
    genreListContainer.append(genreListItem);
  }

  genreBottomDiv.append(genreListContainer);
  genreAside.append(genreTopDiv, genreBottomDiv);

  body.append(genreAside);

  closeBtnImg.addEventListener("click", () => {
    genreListButton.disabled = false;
    genreAside.textContent = "";
    genreAside.classList.remove("sidebar");
  });
});
