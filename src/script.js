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

//GENRE SECTION GRABBERS
const main = document.querySelector("main");
const body = document.querySelector("body");

//GET MOVIE DATA FUNCTION
async function getMovies(typeList, el) {
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

    //IMAGE SECTION CREATE
    const sectionImage = createElwithClass("div", "section__image");
    const movieImage = document.createElement("img");
    const movieImageAnchor = document.createElement("a");
    movieImageAnchor.href = "/movie.html";
    movieImage.src =
      API_IMG.base_url + API_IMG.poster_sizes[2] + movieData[i].poster_path;

    movieImageAnchor.append(movieImage);

    //APPEND IMAGE TO DIV
    sectionImage.append(movieImageAnchor);

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

const genreSection = document.querySelector(".genre__section");
const genreListButton = document.querySelector("#genre-tab-btn");

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
