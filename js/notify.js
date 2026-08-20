/* ============================================================
   notify.js: shared bell + toast notification behavior, used on
   every "app" page (Illustrator-themed: design.html, casestudies.html,
   and VS Code-themed: web_projects.html + the 4 project-*.html pages).

   Each page has its own bell (class "notify-bell") and its own toast
   (class "notify-toast") pointing at the *other* app — e.g. Illustrator
   pages nudge toward VS Code, VS Code pages nudge toward Illustrator.
   Because each is a full page (not a single-page app), only one app's
   bell/toast ever exists in the DOM at a time, so there's no cross-page
   state to juggle: landing on a page starts its own timer fresh, and
   navigating away closes whatever was open along with the rest of the
   page. That's what keeps the notification "inside the bell area" for
   whichever app the visitor is currently in.

   The toast auto-opens once, `data-delay` ms (default 15000 = 15s)
   after landing on the page, and can be reopened any time by clicking
   the bell. Dismiss (X) or "Later" just closes it early; Escape closes
   it too. Plain vanilla JS, no libraries.
   ============================================================ */
(function () {
  "use strict";

  var toast = document.querySelector(".notify-toast");
  if (!toast) return;

  var delay = parseInt(toast.getAttribute("data-delay"), 10);
  if (!delay || delay < 0) delay = 15000;

  function show() {
    toast.classList.remove("hide");
    toast.classList.add("show");
    toast.setAttribute("aria-hidden", "false");
  }
  function hide() {
    toast.classList.remove("show");
    toast.classList.add("hide");
    toast.setAttribute("aria-hidden", "true");
  }
  function toggle() {
    if (toast.classList.contains("show")) hide();
    else show();
  }

  setTimeout(show, delay);

  var bell = document.querySelector(".notify-bell");
  var dismiss = toast.querySelector(".notify-dismiss");
  var later = toast.querySelector(".notify-later");
  if (bell) bell.addEventListener("click", toggle);
  if (dismiss) dismiss.addEventListener("click", hide);
  if (later) later.addEventListener("click", hide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toast.classList.contains("show")) hide();
  });
})();
