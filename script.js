console.log("let javascript");

async function getSongs() {
  let a = await fetch("http://127.0.0.1:3000/songs/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
  }
  return songs;
}

let currentSong = null;

function handleMusic(id, name) {
  console.log(id, name, "helo");
  const songId = document.getElementById(id);
  const songUrl = songId.id; // Store the song URL in a data attribute

  if (currentSong) {
    currentSong.pause();
  }

  let audio = new Audio(songUrl);
  currentSong = audio;

  audio.play();
  play.src = "pause.svg";
  document.querySelector(".songinfo").innerHTML = decodeURI (songId.id);

  console.log(currentSong.currentTime, currentSong.currentduration);

  audio.addEventListener("timeupdate", function () {
    // Update the song time progress (current time / duration)
    let currentTime = formatTime(audio.currentTime);
    let duration = formatTime(audio.duration);
    document.querySelector(
      ".songtime"
    ).innerHTML = `${currentTime} / ${duration}`;
    console.log(currentTime, duration);
    document.querySelector(".songtime").innerHTML = currentTime+ "/" +duration;
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";

  });
  // Add eventListener to seekbar

  document.querySelector(".seekbar").addEventListener("click",e=>{
    console.log(e)
  })

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }
}
async function main() {
  // Get the list of all songs
  let songs = await getSongs();

  
  //Show all the songs in the playlist

  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    console.log(song.split("/").at(-1).replaceAll("%20", " "));
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
                <img class="invert" src="music.svg" alt="">
                <div class="info" id= ${song}>
                  <div>${song.split("/").at(-1).replaceAll("%20", " ")}</div>
                  <div>Song Artist</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                <img class="invert" src="play.svg" alt="" onclick='handleMusic("${song}","prajwal")' >
              </div></li>`;
  }

  //Attach an event listener to play , next and previous

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });
}

main();
