/* ============================================================
   notify.js: shared bell + notification-panel behavior, used on every
   "app" page (Illustrator-themed: design.html, casestudies.html, and
   VS Code-themed: web_projects.html + the 4 project-*.html pages).

   Each page has its own bell (class "notify-bell") and its own panel
   (class "notify-panel") — a small dropdown "inbox" listing 2 items
   (class "notify-item", each just a link): a fake app-update nudging
   the visitor to the *other* app, and a fake email nudging them to
   the contact page. Because each is a full page (not a single-page
   app), only one page's bell/panel ever exists in the DOM at a time,
   so there's no cross-page state to juggle — landing on a page starts
   its own timer fresh, and navigating away closes whatever was open
   along with the rest of the page.

   The panel auto-opens once, `data-delay` ms (default 15000 = 15s)
   after landing on the page, and can be reopened any time by clicking
   the bell. The close (X) button, clicking outside the panel, or
   Escape all close it early. Plain vanilla JS, no libraries.
   ============================================================ */
(function () {
  "use strict";

  var panel = document.querySelector(".notify-panel");
  if (!panel) return;

  var delay = parseInt(panel.getAttribute("data-delay"), 10);
  if (!delay || delay < 0) delay = 15000;

  function show() {
    panel.classList.add("show");
    panel.setAttribute("aria-hidden", "false");
  }
  function hide() {
    panel.classList.remove("show");
    panel.setAttribute("aria-hidden", "true");
  }
  function toggle() {
    if (panel.classList.contains("show")) hide();
    else show();
  }

  setTimeout(show, delay);

  var bell = document.querySelector(".notify-bell");
  var close = panel.querySelector(".notify-panel-close");
  if (bell) {
    bell.addEventListener("click", function (e) {
      e.stopPropagation();
      toggle();
    });
  }
  if (close) close.addEventListener("click", hide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("show")) hide();
  });

  document.addEventListener("click", function (e) {
    if (!panel.classList.contains("show")) return;
    if (panel.contains(e.target)) return;
    if (bell && bell.contains(e.target)) return;
    hide();
  });
})();
