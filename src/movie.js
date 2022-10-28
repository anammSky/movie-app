const main = document.querySelector('#movie-page-main')

async function getMovieData() {
    try {
        const movieID = 550
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        createMovieCard(data)
      } catch (error) {
        throw error;
      }
}


function createMovieCard(data) {
    const movieImage = document.createElement('img')
    movieImage.src = API_IMG.base_url + API_IMG.backdrop_sizes[2] + data.backdrop_path
    main.append(movieImage)
}


getMovieData()