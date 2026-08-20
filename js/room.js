/* ============================================================
   room.js
   Three jobs, since HTML image maps are static by nature:

   1. FULL ROOM, ORIGINAL ASPECT RATIO (desktop only, >640px)
      #room-canvas wraps the room art + every overlay. On load/resize this
      sizes #room-canvas to the room art's own aspect ratio, scaled up (or
      down) just far enough that it fits entirely inside the viewport with
      no cropping (same math as CSS object-fit:contain), then centers it.
      Whatever space is left over on the sides/top just shows the page's
      plain background color — no blurred zoomed copy filling the gaps.
      Below 640px this is skipped entirely — home.css's mobile rules take
      over (room fills the screen height, swipe to scroll) — so any inline
      styles from a wider layout are cleared first.

   2. HOVER ART ON HOVER/FOCUS
      Each hotspot <area> is paired (by data-hotspot) with its hover art
      image(s) — computer and contact each have one right now, both crops of
      the same hover-art.png. Hovering/focusing an area fades its art in.
      Bed has none yet, so this is a no-op for it.

   3. RESPONSIVE <area> COORDINATES
      <area coords> must be in the CSS pixel space of the room art AS
      RENDERED (browsers don't rescale them automatically), so whenever
      #room-base's rendered size changes — including from the layout()
      resize above — they're recalculated from their original natural-pixel
      values.

   No libraries. Plain vanilla JS.
   ============================================================ */
(function () {
  "use strict";

  var base = document.getElementById("room-base");
  var canvas = document.getElementById("room-canvas");
  if (!base) return;

  var MOBILE_BREAKPOINT = 640; // keep in sync with home.css

  var areas = Array.prototype.slice.call(
    document.querySelectorAll('map[name="roommap"] area')
  );

  // Map each hotspot name -> its hover art image(s), if any.
  var hoverArt = {};
  Array.prototype.slice
    .call(document.querySelectorAll(".room-hotspot-art"))
    .forEach(function (img) {
      var name = img.getAttribute("data-hotspot");
      (hoverArt[name] = hoverArt[name] || []).push(img);
    });

  function setActive(name, on) {
    var imgs = hoverArt[name];
    if (imgs) imgs.forEach(function (img) { img.classList.toggle("is-active", on); });
  }

  areas.forEach(function (area) {
    var name = area.getAttribute("data-hotspot");
    area.addEventListener("mouseenter", function () { setActive(name, true); });
    area.addEventListener("mouseleave", function () { setActive(name, false); });
    area.addEventListener("focus", function () { setActive(name, true); });
    area.addEventListener("blur", function () { setActive(name, false); });
    // cache authored (natural-space) coords for rescaling
    area.setAttribute("data-coords", area.getAttribute("coords"));
  });

  function rescale() {
    var naturalW = base.naturalWidth;
    if (!naturalW) return;
    var scale = base.clientWidth / naturalW;
    areas.forEach(function (area) {
      var orig = area.getAttribute("data-coords").split(",");
      var scaled = orig.map(function (n) {
        return Math.round(parseFloat(n) * scale);
      });
      area.setAttribute("coords", scaled.join(","));
    });
  }

  // Sizes/positions #room-canvas to fit the viewport at the art's original
  // aspect ratio, no cropping (see header comment). No-ops on mobile —
  // home.css's own sizing takes over there instead.
  function layout() {
    var naturalW = base.naturalWidth;
    var naturalH = base.naturalHeight;
    if (!naturalW || !naturalH || !canvas) {
      rescale();
      return;
    }

    var vw = window.innerWidth;
    var vh = window.innerHeight;

    if (vw <= MOBILE_BREAKPOINT) {
      // Clear any inline sizing left over from a wider layout so the
      // mobile CSS rules apply cleanly.
      canvas.style.cssText = "";
      rescale();
      return;
    }

    var scale = Math.min(vw / naturalW, vh / naturalH);
    var w = naturalW * scale;
    var h = naturalH * scale;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.style.left = (vw - w) / 2 + "px";
    canvas.style.top = (vh - h) / 2 + "px";
    rescale();
  }

  if (base.complete) {
    layout();
  } else {
    base.addEventListener("load", layout);
  }
  window.addEventListener("resize", layout);
})();
