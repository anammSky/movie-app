// SAMPLE CODE TO CHECK API CALL

const API_URL = "https://api.themoviedb.org/3/";

async function searchMovie(search) {
  const searchTerm = encodeURI(search);
  try {
    const response = await fetch(
      `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

searchMovie("finding nemo");
