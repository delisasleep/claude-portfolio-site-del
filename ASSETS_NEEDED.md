# Art Asset Checklist — Portfolio Site

Everything the site needs from you (Del) as the artist, based on our plan so far.
Grouped by priority. Nothing here changes existing code — it's your to-draw list.

## The one golden rule (makes everything line up automatically)

Any layer that sits **on top of the room** (glows, animated parts, night lighting)
must be:
- the **exact same canvas size** as the room base image, and
- exported as a **transparent PNG** (only the object drawn, everything else empty).

If you follow that, every layer drops in perfectly aligned with zero fiddling.
Pick your final room canvas size once and reuse it for all overlays. Recommended:
**~1600 px wide** (keep the current 541×430 proportions → ~1600×1272) so the room
stays crisp when it fills the screen.

---

## Tier 1 — Core homepage (DONE / one upgrade)

- [x] **`home_room.png`** — the base room illustration. ✅ Provided (541×430).
- [ ] **`home_room.png` (hi-res re-export)** — *optional but recommended.* Same
      artwork at ~1600 px wide so it isn't blurry on large screens. Drop-in
      replacement; I'll bump the display size and re-fit the hotspots.

> Hover glows need **no art** — those shaped color fills + labels are done in
> code (SVG/CSS). Only draw glow art if you ever want a hand-inked glow instead
> of the flat color; not needed otherwise.

---

## Tier 2 — Inner page content

- [ ] **`portrait.png`** — your "me" / self-portrait illustration for the **About**
      page (the character from your sketches). Any size; transparent or framed.
- [ ] **Featured Case Study covers** — 3–4 images for the top row of the
      **Projects** page. Tall/portrait format works best (**3:4 ratio**, e.g.
      900×1200). Name them e.g. `case-1.png`, `case-2.png`…
- [ ] **Other Design Work thumbnails** — a handful of smaller images for the
      lower Projects grid (**4:3 ratio**, e.g. 800×600). `work-1.png`, `work-2.png`…

---

## Tier 3 — Branding & link previews (small but important for SEO/polish)

- [ ] **`favicon.png`** — the little browser-tab icon. Square, **512×512**.
- [ ] **`social-share.png`** — the image shown when your link is shared on
      social/messages. **1200×630**. Can be the room, your logo, or a title card.
- [ ] **Brand decisions (not art):** a font choice for headings/labels, and your
      accent color(s). Tell me and I'll wire them in — currently placeholders.

---

## Tier 4 — Animated room (fairy lights + swaying curtains)

To animate a piece, it has to live on its own layer, so:

- [ ] **`home_room_base.png`** — the room re-exported **with the fairy lights and
      curtains erased** (they'll be added back as moving layers on top).
- [ ] **`lights.png`** — just the fairy lights, transparent, full canvas.
- [ ] **`curtains.png`** — just the curtains, transparent, full canvas.

Optional, if you want the hand-drawn "flipbook" motion (most on-brand):
- [ ] **Frame sets** — 2–4 drawn frames each, e.g. `curtains-1.png … curtains-4.png`
      (mid-sway poses) and/or `lights-on.png` / `lights-dim.png`. I cycle them in CSS.

---

## Tier 5 — Day / Dusk / Night (mostly free)

The overall day→dusk→night mood shift needs **no art** — it's a CSS color wash
driven by the visitor's local clock.

Optional "lit after dark" accent layers (small, high impact — draw only the ones
you want), each a transparent PNG at full canvas size:
- [ ] **`glow-lamp.png`** — warm glow around the desk lamp for dusk/night.
- [ ] **`window-night.png`** — moon / stars in the window pane.
- [ ] (fairy lights double as a night accent — they'd switch on after dusk.)

---

## Quick summary of what's genuinely needed vs. nice-to-have

**Needed to finish the core site:** portrait, case-study covers, work thumbnails,
favicon, social-share image, font + color choices.

**Needed only for the fancy features you added to the backlog:** the erased base
room + lights + curtains layers (animation), and any night accent glows (day/night).

Send assets whenever they're ready — even one at a time — and I'll wire each in.
