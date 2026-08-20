/* ============================================================
   music.js — click-to-play background music on the room homepage.

   Deliberately NOT autoplay: browsers block audio-with-sound autoplay
   anyway, and starting sound on a visitor without asking is a bad first
   impression regardless. The button starts silent/paused; a click starts
   the loop, another click pauses it. Icon swaps between a plain music
   note (paused) and animated equalizer bars (playing).

   If assets/audio/theme-song.mp3 doesn't exist yet (or fails to load for
   any reason), the button hides itself instead of sitting on the page as
   a dead control — drop the file in and reload to bring it back.
   ============================================================ */
(function () {
  "use strict";

  var btn = document.getElementById("music-toggle");
  var audio = document.getElementById("bg-music");
  if (!btn || !audio) return;

  function hideButton() {
    btn.style.display = "none";
  }

  // No track yet, or the browser can't play this file — don't show a
  // button that does nothing.
  audio.addEventListener("error", hideButton);

  function setPlaying(isPlaying) {
    btn.classList.toggle("is-playing", isPlaying);
    btn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    btn.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
  }

  btn.addEventListener("click", function () {
    if (audio.paused) {
      // play() returns a promise that rejects if the source is missing/
      // blocked — treat that the same as a load error.
      var p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(hideButton);
      }
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", function () { setPlaying(true); });
  audio.addEventListener("pause", function () { setPlaying(false); });
})();
