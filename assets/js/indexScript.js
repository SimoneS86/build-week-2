const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");

window.onload = async () => {
  if (selectedId) {
  }
};

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

// const audio = document.getElementById("myAudio");
// const playPauseBtn = document.getElementById("playPauseBtn");
// let isPlaying = false;

// playPauseBtn.addEventListener("click", () => {
//   if (isPlaying) {
//     audio.pause();
//     isPlaying = false;
//     playPauseBtn.classList.remove("playing");
//   } else {
//     audio.play();
//     isPlaying = true;
//     playPauseBtn.classList.add("playing");
//   }
// });

// audio.addEventListener("timeupdate", () => {
//   const progress = audio.currentTime / audio.duration;
//   const progressBar = document.querySelector(".progress");
//   progressBar.style.width = `${progress * 100}%`;
// });

// const audioPlayer = document.getElementById("audio-player");
// const playPauseButton = document.getElementById("play-pause-button");
// const prevButton = document.getElementById("prev-button");
// const nextButton = document.getElementById("next-button");
// const progressBar = document.querySelector(".progress-bar");
// const progress = document.querySelector(".progress");
// const timeDisplay = document.querySelector(".time-display");

// // Inizializza l'audio e imposta la traccia iniziale
// const audio = new Audio();
// audio.src = "url-della-traccia-iniziale.mp3";

// // Gestore dell'evento di clic sul pulsante di riproduzione/pausa
// playPauseButton.addEventListener("click", function () {
//   if (audio.paused) {
//     audio.play();
//     playPauseButton.textContent = "Pause";
//   } else {
//     audio.pause();
//     playPauseButton.textContent = "Play";
//   }
// });

// // Gestore dell'evento di aggiornamento della barra di avanzamento
// audio.addEventListener("timeupdate", function () {
//   const currentTime = audio.currentTime;
//   const duration = audio.duration;
//   const progressPercent = (currentTime / duration) * 100;
//   progress.style.width = progressPercent + "%";
//   const minutes = Math.floor(currentTime / 60);
//   const seconds = Math.floor(currentTime % 60);
//   timeDisplay.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
// });

// // Gestore dell'evento di clic sul pulsante precedente
// prevButton.addEventListener("click", function () {
//   // Imposta la traccia precedente
// });

// // Gestore dell'evento di clic sul pulsante successivo
// nextButton.addEventListener("click", function () {
//   // Imposta la traccia successiva
// });

// // Gestore dell'evento di clic sulla barra di avanzamento
// progressBar.addEventListener("click", function (event) {
//   const progressBarWidth = progressBar.offsetWidth;
//   const clickX = event.offsetX;
//   const percent = (clickX / progressBarWidth) * 100;
//   audio.currentTime = (percent / 100) * audio.duration;
// });
