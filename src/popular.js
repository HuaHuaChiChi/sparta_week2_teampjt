// 1. Popular API 를  TMDB 에서 가져오는 스크립트
const generateMovieCards = async () => {
  const movies = await fetchMovieData();

  const cardList = document.querySelector("#card-list");

  renderMovieCards(cardList, movies);

  cardList.addEventListener("click", function (event) {
    const target = event.target;

    // 클릭된 요소가 rating 또는 popularity 클래스를 가지고 있는지 확인
    if (target.classList.value.includes("rating")) {
      movies.sort((a, b) => b.vote_average - a.vote_average);
      renderMovieCards(cardList, movies);
    } else if (target.classList.value.includes("popularity")) {
      movies.sort((a, b) => b.popularity - a.popularity);
      renderMovieCards(cardList, movies);
    }
  });
};

function renderMovieCards(container, movies) {
  container.innerHTML = movies
    .map(
      movie => `
            <li class="movie-card" id=${movie.id}>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3 class="movie-title">${movie.title}</h3>
                <p>${movie.overview}</p>
                <p class="rating">Rating: ${movie.vote_average}</p>
                <p class="popularity">popularity: ${movie.popularity}</p>
            </li>`
    )
    .join("");
}

async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmM2ZTFkNjQzMTNkMDY1ZjczYjkyYjliNTM4YmJjNSIsInN1YiI6IjY1OTNkMDkyZmMzMWQzNzI4NTQ2YjQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CkZC7SdOdnrzr2YHFLyd94sIAFIYTAK2sOqJHujnVCY"
    }
  };
  const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=ko-KR&include_adult=false", options);
  const data = await response.json();
  return data.results;
}

// 가져온 Popular API를 실행
generateMovieCards();

// 2. 영화 검색 스크립트
const handleSearch = searchKeyword => {
  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach(card => {
    const title = card.querySelector(".movie-title").textContent.toLowerCase();
    const searchedValue = searchKeyword.replace(/\s/g, "").toLowerCase();
    const titleWithoutSpaces = title.replace(/\s/g, "");

    if (titleWithoutSpaces.includes(searchedValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

// 2-1. 검색 기능 관련 스크립트
const searchInput = document.querySelector("#search-input");
searchInput.focus();

const form = document.querySelector("#search-form");
form.addEventListener("submit", event => {
  event.preventDefault();
  handleSearch(searchInput.value);
});
