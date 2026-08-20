# Del Beanlands — Portfolio Site

A plain HTML/CSS/JS portfolio. No build step, no framework. Open `index.html`
in a browser and it runs.

## Pages
- `index.html` — the interactive **room** homepage (hover objects → glow → click to navigate)
- `about.html` — About Me
- `design.html` — **Portfolio home**, styled as an Illustrator window (`design.ai`). The room's monitor opens this page. After ~25s a mock "VS Code has updated" notification appears and links across to the web side.
- `web_projects.html` — the VS Code-themed **web projects** page (`web.html`). Reached from the design page's update popup.
- `contact.html` — Contact (HubSpot form mount point)

> Note: `projects.html` (an older VS Code "Welcome/explorer" landing) is retired — no page links to it anymore. Safe to delete.

## Folder structure
```
index.html          about.html    contact.html
design.html         web_projects.html
robots.txt          sitemap.xml
css/
  main.css          shared: reset, layout, header, footer, a11y helpers
  home.css          the room homepage
  illustrator.css   the design page (Illustrator shell) + update toast
  vscode.css        the web projects page (VS Code shell)
  projects.css      legacy work grids
js/
  room.js           glow-on-hover + responsive image-map coordinates
assets/
  room/             ← YOUR room illustration + glow overlays go here
  fonts/            handwritten display font
  img/              ← favicon, social share image, portraits, etc.
```

## How the room homepage works
The room uses an HTML **image map** (`<area>`) for the clickable objects, plus a
small vanilla JS helper (`js/room.js`) that does two things image maps can't do
alone: it fades in a **glow overlay** when an object is hovered/focused, and it
**rescales the hotspot coordinates** so they stay aligned when the image resizes.

### Adding your art (no code changes needed)
1. Export your room illustration → save as `assets/room/room-base.png`.
2. For each clickable object, export a **glow version** on a transparent canvas
   **the same size as the room** → save as:
   - `assets/room/glow-computer.png`  (Projects)
   - `assets/room/glow-bed.png`       (About)
   - `assets/room/glow-contact.png`   (Contact — object TBD)
3. Update the `coords="left,top,right,bottom"` on each `<area>` in `index.html`
   to match where each object sits in your image (pixel values in the image's
   natural size). Tip: read the pixel box off your image editor's selection tool.

Current navigation mapping:
- **Computer → Portfolio** (`design.html` — the Illustrator page; then popup → `web_projects.html`)
- **Bed → About**
- **Third hotspot → Contact** (object not chosen yet; placeholder wired to `contact.html`)

## Integrations (planned)
- **HubSpot** — leads/forms. Paste your form embed into the marked mount point in
  `contact.html` (instructions are in a comment there).
- **Strapi** — content backend for projects. Cards in `web_projects.html` are marked
  with `data-strapi-slot` to show where CMS-driven content will render later.

## SEO foundation (already in place)
- Unique `<title>` + meta description per page
- Open Graph / Twitter card tags for link sharing
- `<link rel="canonical">` on every page
- Semantic HTML (`<main>`, `<nav>`, `<header>`, `<footer>`, one `<h1>` per page)
- Descriptive `alt` text on the room image + hotspots
- Skip link + visually-hidden H1 for accessibility
- `robots.txt` + `sitemap.xml`

### Before launch
- Replace every `https://example.com` with your real domain (pages, robots,
  sitemap).
- Add a real `favicon.png` and `social-share.png` in `assets/img/`.
- Keep `sitemap.xml` `<lastmod>` dates current.
