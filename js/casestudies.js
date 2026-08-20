/* ============================================================
   casestudies.js: case-study detail view + full-image lightbox on
   casestudies.html.

   Clicking a featured thumbnail (or a Layers-panel row) swaps the grid
   for a detail view IN PLACE: no navigation, the visitor stays on
   casestudies.html the whole time. The detail view has the small preview
   image on the left (click it for a full-size lightbox, or, for a piece
   whose "full size" is a PDF, not an image, it opens that PDF in a new
   tab instead, since a PDF can't sit inside the lightbox <img>) and the
   Brief/What I Did write-up on the right. An "All Case Studies" link at
   the top returns to the grid.

   Copy + asset paths live in DATA below: edit the strings there to
   update any case study's write-up, thumbnail, or full-size target.
   Plain vanilla JS, no libraries.
   ============================================================ */
(function () {
  "use strict";

  var DATA = {
    secondchance: {
      title: "Second Chance Landing Page",
      thumb: "assets/Portfolio-Design/Layouts/second_chance_landingpage-case_study.png",
      full: "assets/Portfolio-Design/Layouts/second_chance_landingpage-case_study.png",
      fullKind: "image",
      brief: "Design a landing page selling the idea of relocating to a planet of my choice.",
      what:
        "I chose Pluto, partly for the challenge of selling a cold, icy, inhospitable planet, but more because I saw potential in it that a straightforward pitch wouldn't: an experience, not just a destination. I thought about the difference between a luxury cruise and a relocation, and let that distinction shape a fully realized brand, Second Chance. The promise is relocation, job security, and safety, but also travel, luxury, and fun along the way. As an extra hook, the copy is written to speak directly to the audience most likely to consider moving this far from Earth: existing and soon-to-be families, with messaging built around the crew and maternal support on board."
    },
    skytrain: {
      title: "SkyTrain Extension",
      // covers/posters.png is a 4:3 crop made for the small grid tile, and
      // it chops most of the (portrait) poster off, so the detail view
      // uses the real full-page export instead, same as the other two.
      thumb: "assets/Portfolio-Design/Posters/conference_poster_PNG.png",
      full: "assets/Portfolio-Design/Posters/conference_poster_PNG.png",
      fullKind: "image",
      brief: "Design an event or conference poster for a concept of my choice.",
      what:
        "I focused on the ongoing Langley SkyTrain expansion, inventing a hypothetical launch event to give the project a real occasion to design around. I liked the idea of working within BC Transit's existing colour scheme, and used the project as a chance to get more comfortable building graphic assets in Illustrator."
    },
    typeanatomy: {
      title: "Type Anatomy",
      // Same fix as skytrain: covers/poster-typeanatomy.png is a cropped
      // 4:3 grid-tile thumbnail, not the full poster.
      thumb: "assets/Portfolio-Design/Posters/type-anatomy-final_PNG_Case_Study.png",
      full: "assets/Portfolio-Design/Posters/type-anatomy-final_PNG_Case_Study.png",
      fullKind: "image",
      brief: "Design a poster that breaks down type anatomy.",
      what:
        "I drew on my high school English and history classrooms for inspiration, aiming for something fun, readable, and easy to understand, using a wide range of colour to connect ideas to visuals so the concept comes across without leaning on a write-up. I was then asked to make it interactive: using InDesign, I built simple triggers so a digital viewer can click on a letter they're curious about and see an explanation appear. Working in an interactive medium let me experiment more with spacing and animation, and I ended up with two versions of the same poster, one built to print and hold up in real life, and one built for online, digital learning.",
      interactive: "https://indd.adobe.com/view/719a87d4-41be-4587-8712-eca6c6460720"
    }
  };

  var gridView = document.getElementById("csGridView");
  var detailView = document.getElementById("csDetailView");
  if (!gridView || !detailView) return;

  var imageLabel = document.getElementById("csDetailImageLabel");
  var imageBtn = document.getElementById("csDetailImageBtn");
  var imageEl = document.getElementById("csDetailImage");
  var imageHint = document.getElementById("csDetailImageHint");
  var infoEl = document.getElementById("csDetailInfo");
  var interactiveLink = document.getElementById("csDetailInteractiveLink");
  var backLink = document.getElementById("csBackLink");

  var lightbox = document.getElementById("csLightbox");
  var lightboxImg = document.getElementById("csLightboxImage");
  var lightboxClose = document.getElementById("csLightboxClose");

  var current = null;

  function escapeHtml(str) {
    return str.replace(/[&<>]/g, function (c) {
      return c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;";
    });
  }

  function showDetail(key) {
    var d = DATA[key];
    if (!d) return;
    current = key;

    imageLabel.textContent = d.title;
    imageEl.src = d.thumb;
    imageEl.alt = d.title + ", preview";
    imageHint.textContent = d.fullKind === "pdf" ? "Open the full PDF" : "See full version";

    infoEl.innerHTML =
      '<p class="cs-detail-label-small">Brief</p><p>' + escapeHtml(d.brief) + "</p>" +
      '<p class="cs-detail-label-small">What I did</p><p>' + escapeHtml(d.what) + "</p>";

    if (d.interactive) {
      interactiveLink.href = d.interactive;
      interactiveLink.textContent = "View the interactive version →";
      interactiveLink.hidden = false;
    } else {
      interactiveLink.hidden = true;
    }

    gridView.hidden = true;
    detailView.hidden = false;
    detailView.scrollIntoView({ behavior: "smooth", block: "start" });
    backLink.focus();
  }

  function showGrid() {
    detailView.hidden = true;
    gridView.hidden = false;
    current = null;
  }

  function openFull() {
    var d = DATA[current];
    if (!d) return;
    if (d.fullKind === "pdf") {
      window.open(d.full, "_blank", "noopener");
      return;
    }
    lightboxImg.src = d.full;
    lightboxImg.alt = d.title + ", full size";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onLightboxKeydown);
    lightboxClose.focus();
  }

  function closeFull() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onLightboxKeydown);
    imageBtn.focus();
  }

  function onLightboxKeydown(e) {
    if (e.key === "Escape") closeFull();
  }

  Array.prototype.slice.call(document.querySelectorAll(".cs-open")).forEach(function (btn) {
    btn.addEventListener("click", function () { showDetail(btn.getAttribute("data-cs")); });
  });

  Array.prototype.slice.call(document.querySelectorAll(".layer-row[data-cs]")).forEach(function (row) {
    row.addEventListener("click", function () { showDetail(row.getAttribute("data-cs")); });
    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showDetail(row.getAttribute("data-cs"));
      }
    });
  });

  backLink.addEventListener("click", function (e) {
    e.preventDefault();
    showGrid();
  });

  imageBtn.addEventListener("click", openFull);
  lightboxClose.addEventListener("click", closeFull);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeFull();
  });
})();
