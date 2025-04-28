const tracks = [
  {title: "A Thousand Times", file: "A thousand times.mp3"},
  {title: "3 Words", file: "3 words.mp4"},
  {title: "Taryn-Paglu", file: "Tarynpaglu.mp4"},
  {title: "Galti Hui Mujhse", file: "Sorry.mp3"},
  {title: "Perfect", file: "Perfect.mp4"},
  {title: "Ocean",file:"Ocean.mp4"},
  {title: "Saiyyan", file: "Saiyyan.mp4"},
  {title: "Tu Hi Hai", file: "Tu Hi Hai.mp4"}
];

const audioPlayer = document.getElementById('audio-player');
const trackList = document.getElementById('track-list');
const playBtn = document.getElementById('play-btn');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

let currentTrack = 0;

// Load tracklist
function loadTrackList() {
  // Clear existing tracks first
  trackList.innerHTML = '';
  
  // Add tracks to the list
  tracks.forEach((track, index) => {
    const trackItem = document.createElement('div');
    trackItem.className = 'track';
    trackItem.textContent = track.title;
    trackItem.onclick = () => playTrack(index);
    trackList.appendChild(trackItem);
  });
  
  // Highlight current track
  highlightCurrentTrack();
}

function loadTrack(index) {
  audioPlayer.src = tracks[index].file;
  highlightCurrentTrack();
}

function playTrack(index) {
  currentTrack = index;
  loadTrack(currentTrack);
  audioPlayer.play();
  updatePlayButton();
}

function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
  updatePlayButton();
}

function updatePlayButton() {
  if (audioPlayer.paused) {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  } else {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  }
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  playTrack(currentTrack);
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  playTrack(currentTrack);
}

function highlightCurrentTrack() {
  const trackElements = document.querySelectorAll('.track');
  trackElements.forEach((el, idx) => {
    el.classList.toggle('active', idx === currentTrack);
  });
}

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
  if (!isNaN(audioPlayer.duration)) {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${percent}%`;
  }
});

// Set progress on click
function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;

  if (!isNaN(duration)) {
    audioPlayer.currentTime = (clickX / width) * duration;
  }
}

// Add hover effect to progress bar
progressContainer.addEventListener('mousemove', (e) => {
  const hoverPosition = (e.offsetX / progressContainer.clientWidth) * 100;
  progressContainer.style.setProperty('--hover-position', `${hoverPosition}%`);
});

// Auto next when ended
audioPlayer.addEventListener('ended', nextTrack);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  loadTrackList();
  loadTrack(currentTrack);
  updatePlayButton();
});

// If DOM is already loaded, initialize now
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  loadTrackList();
  loadTrack(currentTrack);
  updatePlayButton();
}