const searchForm = document.querySelector("#form");
const searchInput = document.querySelector(".inputbox");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTJmMzBmZjFkNmExOWQyMTVjYTg3ZDgzMmNjMzEyYSIsInN1YiI6IjY0NzA4ZWUxMTNhMzIwMDExNmI2OThjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IMDeUvOj3ALqXIxf-NubCoW3OhTFe2M2otmkvG6pWMo",
  },
};
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    let rows = response.results;
    createCards(rows);
  })
  .catch((err) => console.error(err));

function createCards(rows) {
  rows.forEach((el) => {
    let card_html = `
      <div class="mvImg">
        <img src="https://image.tmdb.org/t/p/w300${el.poster_path}" />
      </div>
      <div>
        <h2 class="mvtitle">${el.original_title}</h2>
        <h3 class="mvRating">Rating: ${el.vote_average}</h3>
        <p class="mvSummary">${el.overview}</p>
      </div>`;
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", el.id);
    const card = document.querySelector(".container").appendChild(newDiv);
    card.innerHTML = card_html;
    card.addEventListener("click", testEvent);

    function testEvent() {
      alert(`clicked id: ${el.id}`);
    }
  });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let rows = response.results;
      const temp = rows.filter((el) =>
        el.original_title
          .toLowerCase()
          .includes(searchInput.value.toLowerCase())
      );
      if (temp.length !== 0) {
        document.querySelector(".container").innerHTML = "";
        createCards(temp);
      }
    });
});
