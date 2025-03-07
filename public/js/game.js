const searchForm = async (event) => {
  event.preventDefault();
  
  // Collect values from the login form
  let search = document.querySelector("#form-input").value.trim();
  // removes any spaces in the search string
  search = search.replace(/\s/g, '-');
  
  console.log("search" + search);
  if (search) {
    const response = await fetch(`/search?gametitle=${search}`, {
      method: "GET",
      body: JSON.stringify({ search }),
      headers: { "Content-Type": "application/json" },
    })
    .then((results) => {
      // console.log(response);
      return results.json();
    })
    .then((resultsData) => {
      console.log("bark", resultsData);
      displayGameInfo(resultsData);
    });
  
  }
};
  
function displayGameInfo(gameData) {
  let gameCardEl = document.querySelector(".gameCard");
  gameCardEl.style.display = "inline-block";
  let gameTitle = document.getElementById("game-title");
  let gameDescription = document.getElementById("game-description");
  let gameImage = document.getElementById("game-image");
  let gameReleased = document.getElementById("realeasedDate");
  
  gameTitle.textContent = gameData.title;
  gameTitle.setAttribute("data-gameId", gameData.gameId)
  gameDescription.textContent = gameData.game_description;
  gameImage.setAttribute("src", gameData.cover);
  gameReleased.textContent = gameData.release_date;
}
  
const reviewForm = async (event) => {
  event.preventDefault();
  
  console.log("Inside reviewForm");
  // grab the rating || verify its filled in
  let ratingEl = document.getElementById("inputRating");
  let reviewContent = document.getElementById("userReview");
  let gameTitle = document.getElementById("game-title")
  
  // console.log(ratingEl.value);
  if (!ratingEl.value) {
    alert("Please fill in the rating.")
  }
  // text content || verify its filled in
  if (!reviewContent.value) {
    alert("Please fill in the review.")
  }
  // game slug || 
  gameTitle = gameTitle.textContent;
  if (!gameTitle) {
    alert("Please search the game you want to review.")
  }
  
  
  
  let gameId = document.getElementById("game-title").getAttribute("data-gameId");
  let gameReleased = document.getElementById("realeasedDate");
  let gameDescription = document.getElementById("game-description");
  let gameImage = document.getElementById("game-image").getAttribute("src");
  
  gameDescription = gameDescription.textContent;
  gameReleased = gameReleased.textContent;
  
  
  console.log("gameId is: ", gameId);
  // 0 means it was passed from the api
  if (gameId == 0) {
    const response = await fetch('/api/games', {
      method: "POST",
      body: JSON.stringify({
        title: gameTitle,
        game_description: gameDescription,
        release_date: gameReleased,
        cover: gameImage,
      }),
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      console.log("back from post");
    })
  }
  
  const postReview = {
  
  }
  
}
  
document.querySelector(".searchForm").addEventListener("submit", searchForm);
document.getElementById("reviewForm").addEventListener("submit", reviewForm);
  