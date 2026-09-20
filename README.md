# Birthday Surprise Website 💗

A cinematic mobile-first birthday surprise website inspired by the supplied reference Reel.

## Folder structure

birthday-surprise-website/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── birthday-song.mp3       <-- add your own song
    ├── photo1.jpg              <-- optional
    ├── photo2.jpg              <-- optional
    ├── photo3.jpg              <-- optional
    └── final-photo.jpg         <-- optional

## Customize the birthday person

Open `script.js` and edit:

const CONFIG = {
  name: "Jana",
  from: "Your Name"
};

## Add photos

Put your images inside `assets/` using these exact names:
- photo1.jpg
- photo2.jpg
- photo3.jpg
- final-photo.jpg

You can use PNG/WebP too, but then change the extension in `index.html`.

## Add music

Put an MP3 at:

assets/birthday-song.mp3

The music button is at the top-right. Browsers usually block automatic audio until the visitor interacts with the page, so the visitor can tap the ♫ button.

## Run it

Simplest:
1. Open `index.html` in a browser.
2. For best results, use VS Code + Live Server.
3. Upload the complete folder to GitHub Pages, Netlify, Vercel, or another static host.

## Included effects

- Cinematic purple/pink animated background
- Floating ambient particles
- Scratch-to-reveal card
- Photo memory cards
- Interactive reasons cards
- Animated letter section
- Wish-making section
- Birthday cake/celebration
- Confetti
- Music control
- Responsive mobile layout
- Reduced-motion support
- No backend required
