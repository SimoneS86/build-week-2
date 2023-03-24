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
    const titoloAlbum = document.querySelector("#albumNome");
    const artistaAlbum = document.querySelector("#nomeArtistaAlbum");
    const durataAlbum = document.querySelector("#durata");
    const annoAlbum = document.querySelector("#annoAlbum");
    const braniAlbum = document.querySelector("#numeroBrani");
    const imgAlbum = document.querySelector("#imgAlbum");
    const imgGruppo = document.querySelector("#imgGruppo");
    const containerTracks = document.querySelector("#appendiTracks");
    let indice = 1;

    try {
      const res = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + selectedId);
      const albumData = await res.json();
      console.log(albumData);
      console.log(albumData.title);
      // const { title } = albumData;
      titoloAlbum.innerText = albumData.title;
      artistaAlbum.innerText = albumData.artist.name;
      durataAlbum.innerText = albumData.duration;
      annoAlbum.innerText = albumData.release_date;
      braniAlbum.innerText = albumData.nb_tracks;
      imgAlbum.src = albumData.cover_medium;
      imgGruppo.src = albumData.artist.picture_small;
      console.log(albumData.tracks.data);
      albumData.tracks.data.forEach((track) => {
        const traccia = document.createElement("div");
        traccia.innerHTML = `
        <div role="button" class="container selected mt-3">
          <div class="d-flex justify-content-between px-4 mx-2">
            <div class="d-flex justify-content-between first-part">
              <div class="d-flex">
               <p class="album-elenco album-duration">${indice}</p>
               <div class="d-flex flex-column ms-3">
        <h5 class="">${track.title}</h5>
        <p class="small">
          <a class="album-duration" href="artist.html">${track.artist.name}</a>
        </p>
      </div>
    </div>
    <div>
      <p class="album-elenco small album-duration d-none d-lg-inline">${track.rank}</p>
    </div>
  </div>
  <div>
    <p class="album-elenco small album-duration d-none d-lg-inline">${track.duration}s</p>
    <button
      type="button"
      aria-haspopup="menu"
      aria-label="Altre opzioni per Rock Classics"
      class="bg-transparent add-playlist ms-1 d-lg-none"
      data-testid="more-button"
      aria-expanded="false">
      <ul class="ps-0">
        <li class="dropdown">
          <a class="text-white" data-bs-toggle="dropdown" role="button" aria-expanded="false" href="">
            <svg
              role="img"
              height="24"
              width="24"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-encore-id="icon"
              class="Svg-sc-ytk21e-0 uPxdw"
              fill="white">
              <path
                d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg
          ></a>
          <ul class="dropdown-menu menu p-0">
            <li>
              <a class="dropdown-item text-white" href="#">Aggiungi alla playlist</a>
            </li>
            <hr class="my-2 text-secondary" />
            <li>
              <a class="dropdown-item text-white" href="#">Nascondi brano</a>
            </li>
            <hr class="my-2 text-secondary" />
            <li>
              <a class="dropdown-item text-white" href="#">Aggiungi alla coda</a>
            </li>
            <hr class="my-2 text-secondary" />

            <li>
              <a class="dropdown-item text-white" href="#">Condividi</a>
            </li>
            <hr class="my-2 text-secondary" />

            <li>
              <a class="dropdown-item text-white" href="#">Vai a Radio</a>
            </li>
          </ul>
        </li>
      </ul>
    </button>
  </div>
</div>
</div>`;
        containerTracks.appendChild(traccia);
        indice++;
      });
    } catch (err) {
      alert("ERROR: " + err.message);
    }
  }
};
