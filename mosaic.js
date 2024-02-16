const videoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const videoLength = 596.0;
const width = 1920;
const height = 1080;
const minSize = 1;
const maxSize = 4;

let videos = [];
let size = 2;
let seconds = 0;
let playing = true;

function createVideos() {
  let videoWidth = width / size;
  let videoHeight = height / size;

  main.innerHTML = "";
  videos = [];
  
  for (let i = 0; i < size * size; i++) {
    let row = Math.floor(i / size);
    let col = i % size;
    
    let video = document.createElement("video");
    video.width = videoWidth;
    video.height = videoHeight;
    video.style.top = (row * videoHeight) + "px";
    video.style.left = (col * videoWidth) + "px";
    video.autoplay = "autoplay";
    video.loop = "loop";

    video.setAttribute("src", videoUrl);
    video.volume = 0.0;
    video.load();
    
    main.appendChild(video);
    videos.push(video);
	}
  
  adjustTiming();
  updatePlaying();
}

function adjustTiming() {
  let firstTime = videos[0].currentTime;
  for (let i = 0; i < size * size; i++) {
    let time = firstTime + (seconds * i);
    while (time < 0) time += videoLength;
    videos[i].currentTime = time % videoLength;
  }
}

function updatePlaying() {
  videos.forEach((video) => playing ? video.play() : video.pause());
}

document.addEventListener("keydown", function(event) {
	switch (event.key) {
    case "ArrowUp": up(); break;
    case "ArrowDown": down(); break;
    case "ArrowLeft": left(); break;
    case "ArrowRight": right(); break;      
    case "Enter": enter(); break;      
		default: return;
	}
	event.preventDefault();
});

function up() {
  size++;
  if (size > maxSize) size = maxSize;
  createVideos();
}

function down() {
  size--;
  if (size < minSize) size = minSize;
  createVideos();
}

function left() {
  seconds -= 0.05;
  if (seconds < -10) seconds = -10;
  adjustTiming();
}

function right() {
  seconds += 0.05;
  if (seconds > 10) seconds = 10;
  adjustTiming();
}

function enter() {
  playing = !playing;
  updatePlaying();
}

createVideos();
