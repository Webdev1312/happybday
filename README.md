# Birthday Experience 4.0 💗

A premium, mobile-only interactive birthday love story — built as an installable
Progressive Web App with React, TypeScript, Tailwind CSS, Framer Motion, GSAP-ready
hooks, Swiper, Howler.js, Lottie, and canvas-confetti.

---

## 1. Quick start

```bash
npm install
npm run dev
```

Open the printed local URL **on your phone** (or in your browser's device-emulation
mode) — the layout is locked to a mobile portrait width (max 448px) by design.

> The sandbox this was built in has no network access, so dependencies have **not**
> been installed yet. Run `npm install` yourself once you download the project.

### Testing without waiting until 11:59 PM

Scene 8 (the Waiting Room) is designed to hold at "It's almost midnight ❤️" only
when 3 minutes or less remain until 11:59 PM local time. To test the full flow
right now, either:

- Open the app with **`?test=1`** in the URL, e.g. `http://localhost:5173/?test=1`, or
- Set `testMode: true` in `src/config.ts`

Test mode also shortens the final countdown (Scene 9) from 10 seconds down to
`testCountdownSeconds` (default 5), so you're not stuck watching a full 10-count
every time you test. **Remember to turn `testMode` back to `false`** (and drop the
`?test=1`) before sending the real link — otherwise the recipient will skip the
midnight wait too.

---

## 2. Personalizing the experience

Everything you're likely to want to change lives in **`src/config.ts`**:

| Section | What it controls |
|---|---|
| `people` | Names shown on the credits screen |
| `birthdayDate` | Used for reference; the live countdown itself targets tonight's 11:59 PM |
| `testMode` / `testCountdownSeconds` | See above |
| `quotes` | The 5 romantic quotes in Scene 3 |
| `loveLetter` | The handwritten-style typewriter letter (Scene 4) |
| `timeline` | The 5 "Our Story" chapters (Scene 5) |
| `gallery` | Photo paths + captions (Scene 6) — replace the placeholder images in `public/assets/images/` with real photos, same filenames or update the paths |
| `reasons` | "Reasons I Love You" cards (Scene 7) — a curated starter set is included; add more entries to reach 100, the grid scrolls automatically |
| `voiceMessage` | Label + path to your recorded voice note |
| `finalLetter` | The closing letter (Scene 14) |
| `finalSurprise.lines` | The staggered reveal text in Scene 15 |
| `audio` | Paths to all sound files — see "Music & sound design" below |

### Music & sound design

The experience moves through **three music chapters**, crossfading automatically —
you don't need to wire anything up, just drop your files into `config.audio`:

1. **`background`** — starts the moment "I'm Ready ❤️" is tapped (Scene 2), loops
   continuously through the quotes, love letter, our story, gallery, reasons,
   waiting room, and the final countdown.
2. **`happyBirthdaySong`** — the instant the fireworks go off at midnight
   (Scene 10), the background track crossfades out and this song crossfades in.
   It plays once through the fireworks, cake, and wish scenes (Scenes 10–12).
3. **`backgroundAfter`** — the moment the Happy Birthday song finishes, this
   second background track crossfades in automatically and loops for the rest
   of the experience (voice message, final letter, final surprise, credits).

Sound effects (one-shots, layered on top of whichever music chapter is
currently playing, with the music briefly ducked where it matters):

| Config key | Where it plays |
|---|---|
| `crackers` | Firecracker/firework burst sound at the midnight explosion (Scene 10) |
| `candleBlow` | Plays each time a candle is tapped out (Scene 11) |
| `countdownVoice` | A spoken countdown track, played once as the final countdown (Scene 9) begins — music ducks further so it's clearly audible |
| `heartbeat` | A heartbeat tick on every second of the final countdown (Scene 9) |
| `voice` | Your personal recorded voice message (Scene 13) — ducks and restores whichever background chapter is currently playing |

### Replacing placeholder media

This project ships with **placeholder assets** so it runs out of the box:
- `public/assets/images/memory-01.jpg` … `memory-10.jpg` and `og-cover.jpg` are
  simple generated gradients — swap in your real photos (same filenames, or update
  `config.gallery`).
- `public/assets/audio/*.mp3` are **silent placeholder tracks** — replace each
  with real audio (same filenames, or update `config.audio`):
  `background.mp3`, `background-after.mp3`, `happy-birthday-song.mp3`,
  `crackers.mp3`, `candle-blow.mp3`, `countdown-voice.mp3`, `countdown-tick.mp3`,
  `heartbeat.mp3`, `voice.mp3`.
- `public/icons/*.png` are simple generated heart icons — regenerate with your own
  artwork for a polished install icon (keep the same sizes: 192, 512, and a 512
  maskable variant).


---

## 3. Project structure

```
src/
  config.ts              ← edit this for personalization
  App.tsx                 ← providers + mount point
  router/SceneRouter.tsx  ← lazy-loaded, animated scene switching
  context/ExperienceContext.tsx  ← scene state, persisted progress, shared audio
  scenes/                 ← Scene01Splash.tsx … Scene16Credits.tsx (one per scene)
  components/
    common/                ← Button, GlassCard, TypewriterText, SceneWrapper, ...
    backgrounds/            ← NightSky, Fireflies, FloatingHearts, RosePetals, Butterflies
  hooks/                   ← useAudio (Howler), useCountdown, useVibration
  utils/                   ← localStorage persistence, test-mode detection
public/
  assets/{audio,images,lottie,fonts}
  icons/                   ← PWA install icons
  manifest is generated automatically by vite-plugin-pwa at build time
```

Progress (which scene you're on, whether music has started, whether candles are
blown out) is saved to `localStorage`, so refreshing the page mid-experience
resumes where it left off instead of restarting. "Restart Experience" / "Watch
Again" buttons clear this and start over.

---

## 4. Building for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

This produces a `dist/` folder with the compiled app, service worker, and web
app manifest (via `vite-plugin-pwa`), ready to deploy as a static site.

---

## 5. Deploying to GitHub Pages

1. Push this project to a GitHub repository.
2. In `vite.config.ts`, the `base` path is read from `VITE_BASE_PATH`. Set it to
   your repo name when building for Pages, e.g.:
   ```bash
   VITE_BASE_PATH=/your-repo-name/ npm run build
   ```
3. Deploy the `dist/` folder using either:
   - **gh-pages package** (already included as a dev dependency):
     ```bash
     npm pkg set scripts.deploy="VITE_BASE_PATH=/your-repo-name/ npm run build && gh-pages -d dist"
     npm run deploy
     ```
   - Or a **GitHub Actions workflow** that runs `npm ci && VITE_BASE_PATH=/your-repo-name/ npm run build`
     and publishes `dist/` to the `gh-pages` branch.
4. In your repo settings → Pages, set the source to the `gh-pages` branch.
5. Visit `https://<your-username>.github.io/<your-repo-name>/` on your phone.

---

## 6. Deploying to Netlify

1. Push the project to a Git repository and connect it in the Netlify dashboard,
   **or** deploy directly from your machine with the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod --dir=dist
   ```
2. Build settings (if connecting via Git):
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Leave `VITE_BASE_PATH` unset for Netlify (it defaults to `/`, which is correct
   since Netlify serves from the domain root).
4. The included `public/_redirects` file (`/*  /index.html  200`) is copied into
   `dist/` automatically and ensures the app loads correctly on any URL.

---

## 7. PWA / installability

- `vite-plugin-pwa` generates the web app manifest and service worker at build
  time — no manual manifest.json is needed.
- The manifest is configured for `display: "standalone"` and
  `orientation: "portrait"`, so installing it feels like a native app.
- Offline support: the service worker precaches the app shell plus everything
  under `public/assets/`, so once loaded, the experience works without a
  connection (aside from live features like the real-time countdown clock,
  which only need the device's own clock, not the network).
- On iPhone: Safari → Share → **Add to Home Screen**.
- On Android: Chrome will typically prompt to **Install app** automatically, or
  via the browser menu → **Install app**.

---

## 8. Notes on scope

- **Reasons (Scene 7):** the brief calls for up to 100 — a curated real set is
  included as a starting point; add more entries to `config.reasons` to reach
  100 (the grid scrolls, no code changes needed).
- **GSAP** is listed as a dependency and ready to use for any additional
  scroll-triggered or timeline-based animation you want to layer on top of the
  Framer Motion transitions already in place.
- **Lottie** (`lottie-react`) is installed and ready — drop `.json` animation
  files into `public/assets/lottie/` and render them with `<Lottie animationData={...} />`
  anywhere you'd like extra flourish (e.g. a Lottie confetti burst instead of/alongside
  canvas-confetti).
"# happybday" 
