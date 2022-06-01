let movies = [
  {
    Odgledan: false,
    Naziv: "Mi nismo anđeli",
    Godina: 2005,
    Država: "Srbija",
    Napomena: "Komedija",
    Glumci: ["Nikola Kojo", "Srđan Todorović", "Mirka Vasiljević"],
  },
  {
    Odgledan: false,
    Naziv: "Bumerang",
    Godina: 2001,
    Država: "Srbija",
    Napomena: "Komedija",
    Glumci: ["Nebojša Glogovac", "Dragan Jovanović", "Lazar Ristovski"],
  },
  {
    Odgledan: false,
    Naziv: "Kad porastem biću kengur",
    Godina: 2004,
    Država: "Srbija",
    Napomena: "Komedija",
    Glumci: ["Gordan Kičić", "Sergej Trifunović", "Nikola Đuričko"],
  },
];

//HTML selectors of elements
let moviesListBodyTable = document.getElementById("movies-list-body-table");
let saveInputsDataBtn = document.getElementById("save-inputs-data");
let movieName = document.getElementById("movie-name");
let movieYear = document.getElementById("movie-year");
let movieCountry = document.getElementById("movie-country");
let movieNotes = document.getElementById("movie-notes");
let movieActors = document.getElementById("movie-actors");

var movieArray = "";
var movieArrayCopy = "";

function showMovies() {
  movieArray = "";
  movies.forEach((movie, index) => {
    /* <tr id="table-row-movie-${index}" class = "not-watched"> */
    movieArray += `
      
      <tr id="table-row-movie" class="not-watched">
      <td>
        
          <input
            class="form-check-input "
            type="checkbox"
            onclick="watchedMovie(this)"
            id="odgledan${index}"
            value="${index}"
          />
          <label class="form-check-label" for="odgledan${index}" >
            Odgledan
          </label>
       
      </td>
      <td>${movie.Naziv}</td>
      <td>${movie.Godina}</td>
      <td>${movie.Država}</td>
      <td>${movie.Napomena}</td>
      <td>${movie.Glumci}</td>
    </tr>
    `;
  });

  moviesListBodyTable.innerHTML = movieArray;
  movieArrayCopy = movieArray;
}

// Add new movie
saveInputsDataBtn.addEventListener("click", () => {
  let newMovie = addNewMovie();
  if (newMovie != false) {
    movies.push(newMovie);
    movieName.value = "";
    movieYear.value = "";
    movieCountry.value = "";
    movieNotes.value = "";
    movieActors.value = "";
    showMovies();
  }
});

function addNewMovie() {
  let movieNameValue = movieName.value;
  let movieYearValue = movieYear.value;
  let movieCountryValue = movieCountry.value;
  let movieNotesValue = movieNotes.value;
  let movieActorsValue = movieActors.value;

  let resultMovieName = checkInputMovieName(movieNameValue);
  let resultMovieYear = checkInputMovieYear(movieYearValue);
  let resultMovieActors = checkInputMovieActors(movieActorsValue);

  if (
    resultMovieName == false ||
    resultMovieYear == false ||
    resultMovieActors == false
  ) {
    return false;
  } else {
    return {
      Odgledan: false,
      Naziv: movieNameValue,
      Godina: movieYearValue,
      Država: movieCountryValue,
      Napomena: movieNotesValue,
      Glumci: movieActorsValue.split(","),
    };
  }
}

function watchedMovie(element) {
  let grandparent = element.parentNode.parentNode;
  if (grandparent.classList.contains("watched")) {
    grandparent.classList.remove("watched");
    grandparent.classList.add("not-watched");
  } else {
    grandparent.classList.remove("not-watched");
    grandparent.classList.add("watched");
  }
}

// Validation function for input name of movie
function checkInputMovieName(movieName) {
  if (movieName == "") {
    alert("Morate unijeti naziv filma!");
    return false;
  }
}

// Validation function for input year of movie
function checkInputMovieYear(movieYear) {
  if (movieYear < 1930 || movieYear > 2021) {
    alert("Godina filma mora biti u periodu 1930 - 2021!");
    return false;
  }
}

// Validation function for input actors of movie
function checkInputMovieActors(movieActors) {
  if (movieActors == "") {
    alert("Morate unijeti barem jednog glumca ili glumicu!");
    return false;
  }
}
showMovies();
