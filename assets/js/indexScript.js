const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");
let param = 0;

function showSearch() {
  let searchDiv = document.getElementById("searchDiv");
  searchDiv.style.display = "block";
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    const searchText = searchInput.value;
    console.log(searchText);
    param = searchText;
    const searchUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchText}`;
    try {
      const response = await fetch(searchUrl);
      const songs = await response.json();

      const containerCard = document.querySelector("#containerCard");
      console.log(songs);
      console.log(songs.data[0]);
      if (songs) {
        const firstResult = songs.data[0];
        if (searchText.toLowerCase() === firstResult.artist.name.toLowerCase()) {
          window.location.href = `artist.html?id=${firstResult.artist.name}`;
        } else if (searchText.toLowerCase() === firstResult.album.title.toLowerCase()) {
          window.location.href = `album.html?id=${firstResult.album.id}`;
        } else if (
          searchText.toLowerCase() === firstResult.title.toLowerCase() ||
          searchText.toLowerCase() === firstResult.title_short.toLowerCase()
        ) {
          const card = document.createElement("div");
          card.innerHTML += `
          <div class="card" style="width: 18rem;">
          <img src="${songs.data[0].album.cover_medium}" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">${songs.data[0].title_short}</h5>
            <p class="card-text">Durata: ${songs.data[0].duration}</p>
            <p class="card-text">Rank: ${songs.data[0].rank}</p>
            <p class="card-text">Artist: ${songs.data[0].artist.name}</p>
          </div>
        </div>`;
          containerCard.appendChild(card);
        } else {
          console.log(`Non hai cercato un artista, un album o una canzone valida, ma "${searchText}"`);
        }
      } else {
        console.log("Nessun risultato trovato!");
      }
    } catch (error) {
      console.error(error);
    }
  }
});
