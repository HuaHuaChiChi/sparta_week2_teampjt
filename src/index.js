const sortButtons = document.querySelector(".header-sort");
const cardList = document.querySelector("#card-list");

export const generateMovieCards = async () => {
  let movies = await fetchMovieData(); //영화데이터 받아몸

  if (cardList) {
    function renderMovieCards() {
      cardList.innerHTML = movies
        .map(
          movie => `
            <li class="movie-card" id=${movie.id}>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3 class="movie-title">${movie.title}</h3>
                <p>평점: ${movie.vote_average}</p>
                <p>인기도: ${movie.popularity}</p>
            </li>`
        )
        .join("");
    }

    // 이벤트 위임: 하위요소에서 발생한 이벤트를 상위요소에서 처리
    // 카드클릭시 상세페이지
    function handleClickCard({ target }) {
      // 카드 외 영역 클릭 시 무시
      if (target === cardList) return;
      let movieId;
      if (target.matches(".movie-card")) {
        movieId = target.id;
        alert(`영화 id: ${movieId}`);
      } else {
        movieId = target.parentNode.id;
        // 카드의 자식 태그 (img, h3, p) 클릭 시 부모의 id로 접근
        alert(`영화 id: ${movieId}`);
      }
      if (movieId) {
        window.location.href = `detail.html?id=${movieId}`;
      }
    }
    // 정렬버튼 누르면 정렬되게하기 toprate: vote_average순 popular: popularity순
    function handleSortButtonClick({ target }) {
      const sortBy = target.id;

      if (sortBy === "sorttoprate") {
        // 정렬 기준을 변경하고 화면을 다시 렌더링
        movies.sort((a, b) => b.vote_average - a.vote_average);
      } else if (sortBy === "sortpopular") {
        movies.sort((a, b) => b.popularity - a.popularity);
      }
      renderMovieCards(); //정렬버튼 클릭하고 정렬한 뒤 카드 다시 렌더링
    }
    //카드에 클릭이벤트 넣기
    cardList.addEventListener("click", handleClickCard);

    //버튼에 클릭이벤트 넣기
    if (sortButtons) {
      sortButtons.addEventListener("click", handleSortButtonClick);
    }
    // 초기 함수카드 렌더링
    renderMovieCards();
  }
};

async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjRkY2E3YzRhYjRjOGY3Zjc5NjA0ZWRkNTQwMjE2NiIsInN1YiI6IjY1OTNiNzljZWJiOTlkNWUxN2EwMTRlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BzYyp6rUTuS2MYX8KCIEgGrkns1anoyP2yhoqvkXv-Q"
    }
  };
  const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1", options);
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
