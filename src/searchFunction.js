// 2. 영화 검색
export const handleSearch = searchKeyword => {
  const movieCards = document.querySelectorAll(".movie-card");
  if (!searchKeyword.trim()) {
    alert("검색어를 입력해주세요!");
    return;
  }
  let findMatchMovie = false;
  movieCards.forEach(card => {
    const title = card.querySelector(".movie-title").textContent.toLowerCase();
    const searchedValue = searchKeyword.replace(/\s/g, "").toLowerCase();
    const titleWithoutSpaces = title.replace(/\s/g, "");

    if (titleWithoutSpaces.includes(searchedValue)) {
      card.style.display = "block";
      findMatchMovie = true;
    } else {
      card.style.display = "none";
    }
  });
  if (!findMatchMovie) {
    alert("일치하는 제목이 없습니다!");
  }
};


const searchInput = document.querySelector("#search-input");
searchInput.focus();

const form = document.querySelector("#search-form");
form.addEventListener("submit", event => {
  event.preventDefault();
  handleSearch(searchInput.value);
});
