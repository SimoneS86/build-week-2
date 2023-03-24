const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");
let param = 0;

// window.onload = async () => {
//   if (selectedId) {
//     const tipo = document.querySelector("#tipo");
//     console.log(param);
//     try {
//       const res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${param}`);
//       const canzoneData = await res.json();
//       console.log(canzoneData);
//       tipo.innerText = "Track";
//     } catch (err) {
//       alert("ERROR: " + err.message);
//     }
//   }
// };

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
          <div class="card bg-secondary" style="width: 18rem;">
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
