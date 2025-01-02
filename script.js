console.log("let javascript");
let songs;

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
  const songUrl = songId.id; 
 

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
    let currentTime = formatTime(audio.currentTime);
    let duration = formatTime(audio.duration);
    document.querySelector(
      ".songtime"
    ).innerHTML = `${currentTime} / ${duration}`;
    console.log(currentTime, duration);
    document.querySelector(".songtime").innerHTML = currentTime+ "/" +duration;
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";

  });

  document.querySelector(".seekbar").addEventListener("click",e=>{
   let percent =  (e.offsetX/e.target.getBoundingClientRect().width) * 100;
   document.querySelector(".circle").style.left = percent +  "%";
   currentSong.currentTime = ((currentSong.duration)* percent )/100
  })

  //Add an event listener for humburger
   document.querySelector(".hamburger").addEventListener("click", ()=>{
   document.querySelector(".left").style.left ="0"
   })

  //Add an event listener for close
   document.querySelector(".close").addEventListener("click", ()=>{
     document.querySelector(".left").style.left ="120%"
   })


   //add an event listener to back and next
   back.addEventListener("click", ()=>{
    console.log("Back clicked")
    let currentSongName = currentSong.src.split("/").at(-1);
    let index = songs.findIndex(song => song.split("/").at(-1) === currentSongName);
    if((index-1) >= 0) {
      handleMusic(songs[index-1])
    }
   })

   //add an event listener to back and next
   next.addEventListener("click", () => {
    console.log("Next clicked");
    let currentSongName = currentSong.src.split("/").at(-1);
    let index = songs.findIndex(song => song.split("/").at(-1) === currentSongName);
    if((index+1) < songs.length) {
      handleMusic(songs[index+1])
    }
});




  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }
}
async function main() {
   songs = await getSongs();

  

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
