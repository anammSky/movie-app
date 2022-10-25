// SAMPLE CODE TO CHECK API CALL

async function getMovie() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getMovie();
