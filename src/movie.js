// 1. 영화 데이터를 가져와서 화면에 나타내기
export const generateMovieCards = async () => {
  const movies = await fetchMovieData();

  const cardList = document.querySelector("#card-list");
  renderMovieCards(cardList, movies);

  const ratingButton = document.querySelector('.rating');
  const popularityButton = document.querySelector('.popularity');

  cardList.addEventListener("click", function (event) {
    const target = event.target;

    // 클릭된 요소가 rating 또는 popularity 클래스를 가지고 있는지 확인
    if (target.classList.contains("rating")) {
      movies.sort((a, b) => b.vote_average - a.vote_average);
      renderMovieCards(cardList, movies);
    } else if (target.classList.contains("popularity")) {
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
                <p class="overview">${movie.overview}</p>
                <p class="rating">Rating: ${movie.vote_average}</p>
                <p class="popularity">popularity: ${movie.popularity}</p>
            </li>`
    )
    .join("");

  const overview = container.querySelectorAll('.overview');
  overview.forEach(function (el) {
    if (el.textContent.length > 290) {
      el.style.fontSize = '14px';
    }
  });
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
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1&include_adult=false",
    options
  );
  const data = await response.json();
  return data.results;
}
