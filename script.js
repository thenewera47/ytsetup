(function() {
  // 🎬 Public Google Drive videos (you can add more)
  const videoList = [
    "https://drive.google.com/file/d/1U3KQFEX2wZhOYfZ6oyB9FFyYIqoCbOgN/view"
  ];

  const frame = document.getElementById("driveFrame");
  const startBtn = document.getElementById("startBtn");
  const muteBtn = document.getElementById("muteBtn");
  const intervalInput = document.getElementById("interval");

  let current = 0;
  let rotationTimer = null;
  let muted = true;

  function toPreviewURL(url) {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
  }

  function loadVideo(index) {
    const link = toPreviewURL(videoList[index]);
    frame.src = link + (muted ? "?autoplay=1&mute=1" : "?autoplay=1");
  }

  function rotateVideos() {
    current = (current + 1) % videoList.length;
    loadVideo(current);
  }

  startBtn.addEventListener("click", () => {
    if (rotationTimer) clearInterval(rotationTimer);
    current = 0;
    loadVideo(current);
    const mins = Math.max(1, parseInt(intervalInput.value, 10) || 5);
    rotationTimer = setInterval(rotateVideos, mins * 60 * 1000);
  });

  muteBtn.addEventListener("click", () => {
    muted = !muted;
    loadVideo(current);
    muteBtn.textContent = muted ? "Unmute" : "Mute";
  });

  // Auto-start video on load
  window.addEventListener("load", () => {
    loadVideo(current);
  });
})();
