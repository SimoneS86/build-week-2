const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");

function showSearch() {
  let searchDiv = document.getElementById("searchDiv");
  searchDiv.style.display = "block";
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    const searchText = searchInput.value;
    const searchUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchText}`;
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      console.log(data);
      console.log(data.data[0]);
      if (data) {
        const firstResult = data.data[0];
        if (searchText.toLowerCase() === firstResult.artist.name.toLowerCase()) {
          window.location.href = `artist.html?id=${firstResult.artist.id}`;
        } else if (searchText.toLowerCase() === firstResult.album.title.toLowerCase()) {
          window.location.href = `album.html?id=${firstResult.album.id}`;
        } else if (
          searchText.toLowerCase() === firstResult.title.toLowerCase() ||
          searchText.toLowerCase() === firstResult.title_short.toLowerCase()
        ) {
          window.location.href = `index.html?id=${firstResult.id}`;
        } else {
          console.log(
            `Non hai cercato né l'artista ${firstResult.artist.name}, né l'album ${firstResult.album.title}, ma "${searchText}"`
          );
        }
      } else {
        console.log("Nessun risultato trovato!");
      }
    } catch (error) {
      console.error(error);
    }
  }
});

window.onload = async () => {
  if (selectedId) {
    // const titoloAlbum = document.querySelector("#albumNome");
    // const artistaAlbum = document.querySelector("#nomeArtistaAlbum");
    // const durataAlbum = document.querySelector("#durata");
    try {
      const res = await fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + selectedId);
      const artistData = await res.json();
      console.log(artistData);

      // const { title } = albumData;
      //   titoloAlbum.innerText = albumData.title;
      //   artistaAlbum.innerText = albumData.artist.name;
      //   durataAlbum.innerText = albumData.duration;
    } catch (err) {
      alert("ERROR: " + err.message);
    }
  }
};
