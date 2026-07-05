document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('backgroundMusic');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.querySelector('.play-icon');
  const pauseIcon = document.querySelector('.pause-icon');
  const muteBtn = document.getElementById('muteBtn');
  const volumeIcon = document.querySelector('.volume-icon');
  const muteIcon = document.querySelector('.mute-icon');
  const visualizer = document.getElementById('visualizer');
  const progressFill = document.getElementById('progressFill');
  const progressBar = document.getElementById('progressBar');
  const currentTimeDisplay = document.getElementById('currentTime');
  const durationDisplay = document.getElementById('duration');

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  function updateTimeDisplay() {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    durationDisplay.textContent = formatTime(audio.duration || 0);
  }

  audio.addEventListener('loadedmetadata', updateTimeDisplay);

  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
      visualizer.classList.add('playing');
    } else {
      audio.pause();
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      visualizer.classList.remove('playing');
    }
  });

  muteBtn.addEventListener('click', () => {
    if (audio.muted) {
      audio.muted = false;
      volumeIcon.style.display = 'block';
      muteIcon.style.display = 'none';
    } else {
      audio.muted = true;
      volumeIcon.style.display = 'none';
      muteIcon.style.display = 'block';
    }
  });

  audio.addEventListener('timeupdate', () => {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = `${percentage}%`;
    updateTimeDisplay();
  });

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    audio.currentTime = percentage * audio.duration;
  });
});
