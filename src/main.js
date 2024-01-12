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
// ('header')
document.addEventListener('DOMContentLoaded', () => {
  const test = document.querySelector('#test');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset; // Handle cross-browser compatibility

    console.log(scrollY);

    // Adjust the scroll condition as needed
    if (scrollY >= 418) {
      test.classList.add('fixed');
    } else {
      test.classList.remove('fixed');
    }
  });
});


