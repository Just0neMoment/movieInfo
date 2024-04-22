import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzAyOGY5YjNiZjJjODllZWNlZGM2NGE2ODk2NDY1MiIsInN1YiI6IjY2MjViMjliMjU4ODIzMDE3ZDkyMjJmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5nmfIYRC4V2iaFC0jxORVteSOSaUP3CqDzLs-hTLmb4",
  },
};

axios("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options).then((data) => {
  const results = data.data.results;

  results.forEach((result) => {
    const title = result["title"];
    const overview = result["overview"];
    const poster = result["poster_path"];
    const vote = result["vote_average"];
    const id = result["id"];

    const movieCard = createMovieCard(title, overview, poster, vote, id);

    document.getElementById("cardContainer").innerHTML += movieCard;
  });

  const movieCards = document.querySelectorAll(".movieCard");
  movieCards.forEach((result) => {
    result.addEventListener("click", function () {
      let getMovieId = this.getAttribute("id");
      return alert("Movie id: " + getMovieId);
    });
  });
});

function searchMovies(query) {
  axios(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`, options)
    .then((data) => {
      const results = data.data.results;

      document.getElementById("cardContainer").innerHTML = "";

      results.forEach((result) => {
        const title = result["title"];
        const overview = result["overview"];
        const poster = result["poster_path"];
        const vote = result["vote_average"];
        const id = result["id"];

        const movieCard = createMovieCard(title, overview, poster, vote, id);

        document.getElementById("cardContainer").innerHTML += movieCard;
      });
    })
    .catch((error) => {
      return alert("검색에 실패했습니다:", error);
    });
}

document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const query = document.getElementById("searchInput").value.trim();
  if (query !== "") {
    return searchMovies(query);
  }
});

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
