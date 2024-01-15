import { generateMovieCards } from './movie.js';
import { handleSearch } from "./searchFunction.js";

const endpoints = {
  nowPlaying: {
    authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjRkY2E3YzRhYjRjOGY3Zjc5NjA0ZWRkNTQwMjE2NiIsInN1YiI6IjY1OTNiNzljZWJiOTlkNWUxN2EwMTRlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BzYyp6rUTuS2MYX8KCIEgGrkns1anoyP2yhoqvkXv-Q",
    url: "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1",
  },
  popular: {
    authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmM2ZTFkNjQzMTNkMDY1ZjczYjkyYjliNTM4YmJjNSIsInN1YiI6IjY1OTNkMDkyZmMzMWQzNzI4NTQ2YjQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CkZC7SdOdnrzr2YHFLyd94sIAFIYTAK2sOqJHujnVCY",
    url: "https://api.themoviedb.org/3/movie/popular?language=ko-KR&include_adult=false",
  },
  topRated: {
    authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmM2ZTFkNjQzMTNkMDY1ZjczYjkyYjliNTM4YmJjNSIsInN1YiI6IjY1OTNkMDkyZmMzMWQzNzI4NTQ2YjQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CkZC7SdOdnrzr2YHFLyd94sIAFIYTAK2sOqJHujnVCY",
    url: "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1&include_adult=false",
  },
};


generateMovieCards(endpoints.nowPlaying.authorization, endpoints.nowPlaying.url);

for (const key in endpoints) {
  const button = document.querySelector(`#${key} > a`);
  button.addEventListener('click', () => generateMovieCards(endpoints[key].authorization, endpoints[key].url));
}


const searchInput = document.querySelector("#search-input");
searchInput.focus();


const form = document.querySelector("#search-form");
form.addEventListener("submit", event => {
  event.preventDefault();
  handleSearch(searchInput.value);
});

