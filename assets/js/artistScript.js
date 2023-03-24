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
          window.location.href = `artist.html?id=${firstResult.artist.name}`;
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
    const nomeArtista = document.querySelector("#nomeArtista");
    const imgArtista = document.querySelector("#imgArtista");
    // const numeroFans = document.querySelector("#numeroFans");
    const containerPopolari = document.querySelector("#containerPopolari");
    try {
      const res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${selectedId}`);
      const artistData = await res.json();
      console.log(artistData);

      // const { title } = albumData;
      nomeArtista.innerText = artistData.data[0].artist.name;
      imgArtista.src = artistData.data[0].artist.picture_big;
      for (let i = 0; i < 5; i++) {
        const tracciaPopolare = document.createElement("div");
        tracciaPopolare.innerHTML = `
        <div role="button" class="align-items-center row mb-4 selected py-1">
        <div class="col-6 d-flex align-items-center">
          <p class="album-duration me-3 mb-0">${i + 1}</p>
          <img class="me-3" src="${artistData.data[i].artist.picture_small}" width="15%" />
          <p class="mb-0">${artistData.data[i].title}</p>
        </div>
        <div class="album-duration col-3">
          <p class="mb-0">Rank:${artistData.data[i].rank}</p>
        </div>
        <div class="col-3 album-duration">${artistData.data[i].duration}s</div>
      </div>`;
        containerPopolari.appendChild(tracciaPopolare);
      }
      // numeroFans.innerText = artistData.nb_fan;
    } catch (err) {
      alert("ERROR: " + err.message);
    }
  }
};
