const main = document.querySelector('.main__movie')

async function getMovieData() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        createMovieCard(data)
      } catch (error) {
        throw error;
      }
}


function createMovieCard(data) {
    const movieImage = document.querySelector('.image-of-movie')
    movieImage.src =API_IMG.base_url + API_IMG.poster_sizes[2] + data.backdrop_path;

    const movieTitle = document.querySelector('.movie__title')
    movieTitle.textContent = data.title

    const movieRating = document.querySelector('.movie__rating')
    movieRating.textContent = Math.round(data.vote_average)


    const genreRow = document.querySelector('.movie__genre__row')
    for (let id of data.genre_ids) {
        const genreItem = document.createElement("p");
        genreItem.classList.add("movie__genre__item");
        genreItem.textContent = id;
        genreRow.append(genreItem)
    }       
}


getMovieData()