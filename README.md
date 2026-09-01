# Happy Birthday ✨ — A Birthday Surprise Website

An interactive, cinematic birthday surprise built with React, Vite, Tailwind CSS,
and Framer Motion. It's a single-page story the birthday person unlocks with a
secret code and then clicks/taps through — questions, a photo gallery, a real
playable mini-game, secret messages, three gifts to unwrap, and an emotional
final reveal — designed mobile-first so it can be sent as a link over WhatsApp.

## 1. Install

```bash
cd birthday-surprise
npm install
```

## 2. Run it locally

```bash
npm run dev
```

Open the printed `http://localhost:5173` URL (Vite will pick another port if
that one's busy). Use your browser's device toolbar (or just resize the
window) to preview it at phone widths — the layout is mobile-first.

## 3. Add her real photos

Replace the placeholder files in `public/photos/` (`photo1.svg` … `photo8.svg`,
generated gradient placeholders) with real images — `.jpg`, `.png`, whatever
you have. Then update the `image` path for each entry in
`src/data/birthdayData.js`:

```js
export const memories = [
  {
    image: "/photos/photo1.jpg", // <- point this at your real file
    title: "Our Beautiful Memory",
    caption: "A memory I'll always keep close to my heart.",
    category: "childhood", // one of: funny, trips, childhood, random
  },
  // ...
];
```

Photos are cropped with `object-fit: cover` inside a fixed square frame, so
any aspect ratio works without distortion — just make sure the important part
of the photo is roughly centered. You can add, remove, or reorder entries in
this array freely; the gallery and detail view both read from it.

## 4. Add the three gift photos

Near the end of the journey she unwraps three gifts, each revealing one photo.
Replace the placeholder files in `public/gifts/` (`gift1.svg`, `gift2.svg`,
`gift3.svg`) with real images, keeping the same filenames — or use different
filenames and update the `image` path for each entry in the `gifts` array in
`src/data/birthdayData.js`:

```js
export const gifts = [
  {
    id: 1,
    theme: "rose", // "rose" | "lavender" | "gold" — the gift box color
    title: "A Little Memory ❤️",
    image: "/gifts/gift1.jpg", // <- point this at your real file
    message: "A little memory that makes me smile every time. ❤️",
    continueLabel: "Open the Next Gift →",
  },
  // ...
];
```

Like the memory photos, these are cropped with `object-fit: cover` inside a
square polaroid frame — any aspect ratio works. The gifts must be opened in
order (gift 2 stays locked until gift 1 is opened, and so on), and **Replay
the Journey** resets all three back to locked/unopened.

## 5. Add real music

Drop an MP3 at:

```
public/music/birthday.mp3
```

That's the only file the `MusicController` component looks for
(`src/components/MusicController.jsx`). No other code needs to change. If you
don't add a file, the music button simply does nothing when pressed (it fails
silently) — everything else still works.

Note: browsers block audio from autoplaying without a user gesture. Music
only attempts to start the moment she taps **"Start the Surprise"** on the
welcome screen — that tap is what unlocks it. The floating button in the
bottom-right corner lets her play/pause any time after that.

## 6. Change her name, your name, and the secret code

Everything personal lives in one place: `src/data/birthdayData.js`.

```js
export const birthdayData = {
  sisterName: "Keerthi",
  brotherName: "Aarav",
  creatorName: "Suji na",
  secretCode: "582005", // the 6-digit code that unlocks the very first screen
  birthdayMessage: "Twenty years of you, and I still can't believe how lucky I am to call you my sister.",
  favoriteColor: "Purple",
  favoriteFood: "Biryani",
  favoriteMovie: "3 Idiots",
};
```

Change these and the names update everywhere they're used (the lock screen
hint, the opening, the "All About Suji Na" quiz, the final message, the
secret messages, etc.) — nothing else needs to be touched. The lock screen's
hint only ever shows `${creatorName}'s birthday ❤️`, never the code itself.

## 7. Customize the quizzes

Two separate quizzes live in `src/data/birthdayData.js`:

- **`siblingQuiz`** — six just-for-fun questions with no "correct" answer.
  Each option has its own `reactions` line shown after she picks it. Edit,
  add, or remove questions/options/reactions freely.
- **`sujiNaQuiz`** — the "All About Suji Na" quiz (`scenes/AboutHerQuiz.jsx`).
  Also no right/wrong answers — she picks whichever option fits, and the
  result screen recaps what she chose. Edit the `question`/`options` freely;
  it's a plain array of 3 questions, each with 4 options.

## 8. Customize the secret messages

`getSecretMessages(data)` in the same file returns the six envelopes. Each
has an `id` (1–6, shown on the envelope), a `color` (a Tailwind gradient
pair), a `title`, and a `body`. Edit the text freely — order doesn't matter,
`id` just needs to stay unique.

## 9. Customize the birthday wishes

The final cinematic lines live directly inside the scene components, since
they're one-off narrative copy rather than repeatable data:

- `src/scenes/FinalSurprise.jsx` — the four-line build-up ("Through all the
  ups and downs...")
- `src/scenes/FinalWish.jsx` — the big "Happy Birthday" reveal and closing
  lines
- `src/scenes/GiftRevealScene.jsx` — the "Three Little Gifts" title/subtitle
  and the four-line closing message after the third gift
- `src/scenes/Celebration.jsx` — the final celebration screen

They all import `birthdayData` for the name/message, so search for the plain
text you want to change in those files.

## 10. Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## 11. Deploy

The easiest options (both have generous free tiers and support Vite out of
the box):

**Vercel**
```bash
npm install -g vercel
vercel
```
Follow the prompts (framework preset: Vite). It'll give you a shareable URL.

**Netlify**
```bash
npm install -g netlify-cli
netlify deploy --build
```
Or just drag the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop)
after running `npm run build`.

Either way, once deployed you get a public link you can send over WhatsApp —
no localhost involved.

---

## How the scenes map to the code

`src/App.jsx`'s `SCENES` array is the single source of truth for the journey
order. Most entries are top-level chapters she moves through with
**Continue**-style buttons; a few are sub-states owned by their parent
chapter, because they naturally repeat (a quiz has 3–6 questions, not one) or
open as an overlay and close back to where she was:

| Scene | Where it lives |
|---|---|
| Secret Lock | `scenes/SecretLockScreen.jsx` — the 6-digit code gate, always first |
| Welcome | `scenes/Welcome.jsx` |
| Surprise Opening | `scenes/SurpriseOpening.jsx` |
| Memory Gallery | `scenes/MemoryGallery.jsx` |
| Memory Detail | `scenes/MemoryDetail.jsx` — opened from the gallery, closes back to it |
| Sibling Quiz | `scenes/SiblingQuiz.jsx` |
| About-Her Quiz ("All About Suji Na") | `scenes/AboutHerQuiz.jsx` |
| Heart Game | `scenes/HeartGame.jsx` |
| Game Result | `scenes/GameResult.jsx` |
| Secret Messages | `scenes/SecretMessages.jsx` |
| Message Opened | `scenes/MessageOpened.jsx` — opened from an envelope, closes back to the grid |
| Final Surprise | `scenes/FinalSurprise.jsx` |
| Final Wish | `scenes/FinalWish.jsx` |
| Three Little Gifts | `scenes/GiftRevealScene.jsx` — three gifts, opened in order, each revealing a photo |
| Celebration | `scenes/Celebration.jsx` |

## Project structure

```
src/
├── components/       shared building blocks (SceneContainer, GiftBox,
│                      Confetti, particle systems, MusicController, the
│                      "Three Gifts" pieces — GiftRevealBox,
│                      GiftOpeningAnimation, GiftPhotoReveal, GiftProgress,
│                      MagicalParticles — etc.)
├── scenes/            one file per scene listed above
├── data/
│   └── birthdayData.js   ← all personalization lives here
├── hooks/
│   ├── useCountUp.js
│   └── usePointerParallax.js
├── App.jsx            owns navigation state and wires scenes together
├── main.jsx
└── index.css           Tailwind + custom keyframes/theme tokens

public/
├── photos/            replace these with real memory-gallery images
├── gifts/             replace these with the three gift-reveal photos
└── music/             put birthday.mp3 here
```

## What's implemented

- A secret 6-digit code lock screen that must be unlocked before the journey
  begins, with a hint that never reveals the actual code.
- Full scene journey (see table above), navigated entirely by button/tap (no
  page scroll between chapters), with cinematic Framer Motion transitions
  (fade/scale/slide/blur/spring/cinematic per scene).
- A real playable 10-second mini-game (drag/touch on mobile, mouse or arrow
  keys on desktop, live score and timer, three item types with different
  scoring, auto-ends and advances).
- Two quizzes: a no-wrong-answers sibling quiz, and the "All About Suji Na"
  quiz — also no right/wrong answers, with a warm recap result screen instead
  of a score.
- Filterable polaroid photo gallery with a full-screen detail view
  (prev/next/close).
- Six interactive secret-message envelopes.
- Three gifts opened in strict order, each with its own cinematic
  shake → lid-opens → light-burst → polaroid-photo-rises sequence; the third
  gift gets a darker, more intense version of the same sequence.
- Reusable particle system (hearts/stars/magical dust), a DOM-based confetti
  system triggered from several moments, and an interactive cake with candles
  you blow out.
- Persistent floating music control that survives every scene transition.
- A configurable progress indicator, hidden on the lock/welcome/celebration
  bookends.
- `prefers-reduced-motion` support (ambient particle/animation counts drop,
  transitions shorten) and full keyboard/tap accessibility on every control.
- Mobile-first responsive layout, verified at 375×667, 390×844, 430×932, and
  desktop widths.

## Known limitations to be aware of

- The placeholder photos (both `public/photos/` and `public/gifts/`) are
  colored SVGs, not real images — see steps 3 and 4.
- There's no bundled music file — see step 5.
- Backward navigation between chapters is intentionally not implemented (the
  story is meant to build one direction, aside from the quiz's own
  Previous/Next), but **Replay the Journey** on the last screen resets
  everything — including all three gifts back to locked — and starts over
  from the welcome screen (she won't have to re-enter the secret code).
