const API_KEY = "a38e24482037fe3a906526be0609a71c";

async function fetchMovies() {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("moviesContainer");
  moviesContainer.innerHTML = "";

  if (movies.length === 0) {
    moviesContainer.innerHTML = "<p>No movies found.</p>";
    return;
  }

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const title = document.createElement("h2");
    title.textContent = movie.title;
    movieElement.appendChild(title);

    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    movieElement.appendChild(poster);

    moviesContainer.appendChild(movieElement);
  });
}

async function searchMovies() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    alert("Please enter a movie name");
    return;
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`;
  const response = await fetch(url);
  const data = await response.json();
  displayMovies(data.results);
}

window.addEventListener("load", async () => {
  const movies = await fetchMovies();
  displayMovies(movies);
});
