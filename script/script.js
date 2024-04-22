import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzAyOGY5YjNiZjJjODllZWNlZGM2NGE2ODk2NDY1MiIsInN1YiI6IjY2MjViMjliMjU4ODIzMDE3ZDkyMjJmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5nmfIYRC4V2iaFC0jxORVteSOSaUP3CqDzLs-hTLmb4",
  },
};

let allMovies = [];

axios("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options).then((data) => {
  allMovies = data.data.results;
  displayMovies(allMovies);
});

document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();

  const filteredMovies = allMovies.filter((movie) => movie.title.toLowerCase().includes(searchQuery));
  displayMovies(filteredMovies);
});

function displayMovies(movies) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie.title, movie.overview, movie.poster_path, movie.vote_average, movie.id);
    cardContainer.innerHTML += movieCard;
  });
}

function createMovieCard(title, overview, poster, vote, id) {
  return `
    <section id="${id}" class="flex flex-col gap-2 mt-10 bg-[#181818] rounded-[10px] p-3 movieCard">
      <img src="https://image.tmdb.org/t/p/w500/${poster}" />
      <h2 class="text-[#e4e4e4] text-xl ml-2 w-[290px] break-keep">${title}</h2>
      <p class="w-[290px] p-2 break-keep text-[#e4e4e4]">${overview}</p>
      <p class="text-[#e4e4e4]">평점: ${vote}</p>
    </section>
  `;
}
