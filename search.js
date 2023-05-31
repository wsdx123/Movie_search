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
    // rows.filter((el) => {
    //   el.original_title.toL
    // })
    console.log(rows);
  });

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(searchInput.value);
});
