# Yuva Sangam · IIT Bombay — Phase VII

Website for Yuva Sangam Phase VII (Ek Bharat Shreshtha Bharat). IIT Bombay is the Nodal Institution for Maharashtra, paired with NIT Srinagar (Jammu, Kashmir & Ladakh). Exchange dates: 21–27 October 2026.

Plain HTML/CSS/JS — no build step. Open `index.html` in a browser, or host on GitHub Pages.

## Adding the selected students
Edit the `DELEGATES` array at the top of `script.js`:

```js
const DELEGATES = [
  { name: "Full Name", dept: "Department", year: "3rd Year" },
];
```

## Itinerary
The day-by-day plan (shared by NIT Srinagar, tentative) lives in the `#itinerary` section of `index.html`. The original PDF is served from `assets/yuva-sangam-vii-itinerary-nit-srinagar.pdf` — replace that file if a revised version arrives.

## Hosting the J&K delegation (29 Oct – 4 Nov 2026)
`visit.html` is the page for the visiting delegation: the IIT Bombay itinerary followed by a campus map. The QR code in `assets/qr-visit.svg` / `assets/qr-visit.png` opens https://www.yuvasangam-iitb.com/visit.html. The corrected itinerary PDF is `assets/yuva-sangam-vii-itinerary-iit-bombay.pdf`. Map places are in the `PLACES` array at the top of `visit.js`.

Contact: yuvasangam.iitb@gmail.com
