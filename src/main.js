import { generateMovieCards } from "./movie.js";
import { handleSearch } from "./search.js";

const searchInput = document.querySelector("#search-input");
searchInput.focus();

const form = document.querySelector("#search-form");
form.addEventListener("submit", event => {
  event.preventDefault();
  handleSearch(searchInput.value);
});
if (document.querySelector("#card-list")) {
  generateMovieCards();
}



// scroll 내려가면 정렬버튼 header에 붙음
document.addEventListener('DOMContentLoaded', () => {
  const sortButton = document.querySelector('#sortButton');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // console.log(scrollY);

    if (scrollY >= 418) {
      sortButton.classList.add('fixed');
    } else {
      sortButton.classList.remove('fixed');
    }
  });
});


