const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");

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
