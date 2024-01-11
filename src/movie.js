// 1. 영화 데이터를 가져와서 화면에 나타내기
export const generateMovieCards = async () => {
  const movies = await fetchMovieData();
  const cardList = document.querySelector("#card-list");
  if (cardList) {
    cardList.innerHTML = movies
      .map(
        movie => `
            <li class="movie-card" id=${movie.id}>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3 class="movie-title">${movie.title}</h3>
                <p>${movie.overview}</p>
                <p>Rating: ${movie.vote_average}</p>
            </li>`
      )
      .join("");

    // 이벤트 위임: 하위요소에서 발생한 이벤트를 상위요소에서 처리
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
    cardList.addEventListener("click", handleClickCard);
  }
};

async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmM2ZTFkNjQzMTNkMDY1ZjczYjkyYjliNTM4YmJjNSIsInN1YiI6IjY1OTNkMDkyZmMzMWQzNzI4NTQ2YjQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CkZC7SdOdnrzr2YHFLyd94sIAFIYTAK2sOqJHujnVCY"
    }
  };
  const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1&include_adult=false", options);
  const data = await response.json();
  return data.results;
}
