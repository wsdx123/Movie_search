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

// api통신으로 받아온 데이터로 영화 카드를 만들어 container 클래스인 main태그에 붙여넣는 코드
function createCards(rows) {
  rows.forEach((el) => {
    let card_html = `
        <div class="mvImg">
          <img src="https://image.tmdb.org/t/p/w300${el.poster_path}" />
        </div>
        <div>
          <h2>${el.original_title}</h2>
          <h3>Rating: ${el.vote_average}</h3>
          <p>${el.overview}</p>
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

// 초기화면의 영화 카드들을 보여주는 코드
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

// 영화 검색 코드
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let rows = response.results;
      const filtered = rows.filter((el) =>
        el.original_title
          .toLowerCase()
          .includes(searchInput.value.toLowerCase())
      );
      if (filtered.length !== 0) {
        console.log(filtered);
        document.querySelector(".container").innerHTML = "";
        createCards(filtered);
      } else {
        document.querySelector(".container").innerHTML = "";
        let noResult = document.createElement("div");
        noResult.className = "noResult";
        noResult.innerText = "검색결과가 없습니다.";
        document.querySelector(".movie").appendChild(noResult);
      }
    });
});
