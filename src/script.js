// SAMPLE CODE TO CHECK API CALL

//const API_URL = "https://api.themoviedb.org/3/";

//GENRE SECTION GRABBERS
const popular = document.querySelector('#popular')
const topRated = document.querySelector('#top__rated')

//POPULAR MOVIES FUNCTION
async function popularMovies() {
  //FETCH POPULAR MOVIES
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  console.log(data)
  
  const popularMovies = data.results

  for (let i = 0; i < 20; i++) {

    //CARD SECTION CREATE
    const card = document.createElement('div')
    card.classList.add('section__card')


    //IMAGE SECTION CREATE
    const sectionImage = document.createElement('div')
    sectionImage.classList.add('section__image')
    const movieImage = document.createElement('img')
    movieImage.src = API_IMG.base_url + API_IMG.poster_sizes[2] + popularMovies[i].poster_path
    movieImage.alt = 'MOVIE IMAGE NEEDS INSERTING'

    //APPEND IMAGE TO DIV
    sectionImage.append(movieImage)

    //TEXT SECTION CREATE
    const sectionText = document.createElement('div')
    sectionText.classList.add('section__text')

    //TEXT TOP 
    const textTop = document.createElement('div')
    textTop.classList.add('text__top')

    //MOVIE TITLE CREATE
    const movieTitle = document.createElement('p')
    movieTitle.textContent = popularMovies[i].title
    //APPEND MOVIE TITLE TO TEXT TOP
    textTop.append(movieTitle)

    //TEXT BOTTOM CREATE
    const textBottom = document.createElement('div')
    textBottom.classList.add('text__bottom')
    const genreTag = document.createElement('p')
    genreTag.textContent = 'GENRE'
    const movieRating = document.createElement('p')
    movieRating.textContent = popularMovies[i].vote_average

    //APPEND GENRE AND TAG TO TEXT BOTTOM
    textBottom.append(genreTag, movieRating)

    //APPEND TEXT TO TEXT SECTION
    sectionText.append(textTop, textBottom)


    //APPENDS THE IMAGE AND MOVIE DETAILS TO THE CARD
    card.append(sectionImage, sectionText)

    //APPENDS THE WHOLE CARD TO THE PAGE
    popular.append(card)
  }
}





// TOP RATED FUNCTION
async function topRatedMovies() {
  //FETCH TOP RATED MOVIES
  //const randomPage = Math.floor(Math.random() * 500)
  const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  
  
  const topRatedMovies = data.results

  for (let i = 0; i < 20; i++) {

    //CARD SECTION CREATE
    const card = document.createElement('div')
    card.classList.add('section__card')


    //IMAGE SECTION CREATE
    const sectionImage = document.createElement('div')
    sectionImage.classList.add('section__image')
    const movieImage = document.createElement('img')
    movieImage.src = API_IMG.base_url + API_IMG.poster_sizes[2] + topRatedMovies[i].poster_path
    movieImage.alt = 'MOVIE IMAGE NEEDS INSERTING'

    //APPEND IMAGE TO DIV
    sectionImage.append(movieImage)

    //TEXT SECTION CREATE
    const sectionText = document.createElement('div')
    sectionText.classList.add('section__text')

    //TEXT TOP 
    const textTop = document.createElement('div')
    textTop.classList.add('text__top')

    //MOVIE TITLE CREATE
    const movieTitle = document.createElement('p')
    movieTitle.textContent = topRatedMovies[i].title
    //APPEND MOVIE TITLE TO TEXT TOP
    textTop.append(movieTitle)

    //TEXT BOTTOM CREATE
    const textBottom = document.createElement('div')
    textBottom.classList.add('text__bottom')
    const genreTag = document.createElement('p')
    genreTag.textContent = 'GENRE'
    const movieRating = document.createElement('p')
    movieRating.textContent = topRatedMovies[i].vote_average

    //APPEND GENRE AND TAG TO TEXT BOTTOM
    textBottom.append(genreTag, movieRating)

    //APPEND TEXT TO TEXT SECTION
    sectionText.append(textTop, textBottom)


    //APPENDS THE IMAGE AND MOVIE DETAILS TO THE CARD
    card.append(sectionImage, sectionText)

    //APPENDS THE WHOLE CARD TO THE PAGE
    topRated.append(card)
  }
}



popularMovies()
topRatedMovies()
