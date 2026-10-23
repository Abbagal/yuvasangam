/* ----------------------------------------------------------
   DELEGATION — selected students (from the CSO entry list).
   Example: { no: 1, name: "Aarav Patil" }
   ---------------------------------------------------------- */
const DELEGATES = [
  { no: 1, name: "Aishwarya Dnyaneshwar Patil" },
  { no: 2, name: "Omkar Shinde" },
  { no: 3, name: "Prabuddha Wankar" },
  { no: 4, name: "Prasad Jugdar" },
  { no: 5, name: "Vedant Munde" },
  { no: 6, name: "Daivshala Aher" },
  { no: 7, name: "Abhishek Kumar Mahto" },
  { no: 8, name: "Aayush Mishra" },
  { no: 9, name: "Srushti Panchal" },
  { no: 10, name: "Shubhangi Gavit" },
  { no: 11, name: "Sanika Fulari" },
  { no: 12, name: "Ankit Shukla" },
  { no: 13, name: "Pruthvi Butke" },
  { no: 14, name: "Sahil Kakad" },
  { no: 15, name: "Vyankatesh Kanhere" },
  { no: 16, name: "Snehal Khandare" },
  { no: 17, name: "Vidhyashree Sahu" },
  { no: 18, name: "Yash Jadhao" },
  { no: 19, name: "Shiva Singh" },
  { no: 20, name: "Sanika Pawar" },
  { no: 21, name: "Akta Kamble" },
  { no: 22, name: "Jay Trivedi" },
  { no: 23, name: "Kismat Nokhe Jaiswar" },
  { no: 24, name: "Nitin Sontakke" },
  { no: 25, name: "Saniya Patil" },
  { no: 26, name: "Vishwajit Rajput" },
  { no: 27, name: "Diksha Kirange" },
  { no: 28, name: "Sanskar Mate" },
  { no: 29, name: "Om Chavhan" },
  { no: 30, name: "Vishvajit Sherkar" },
  { no: 31, name: "Sumit Chopkar" },
  { no: 32, name: "Maske Ajinkya Amol" },
  { no: 33, name: "Gore Piyush Vinayak" },
  { no: 34, name: "Shruti Shinde" },
  { no: 35, name: "Yash Tambe" },
  { no: 36, name: "Ajinkya Karale" },
  { no: 37, name: "Dnyanda Atkare" },
  { no: 38, name: "Adinath Jadhav" },
  { no: 39, name: "Prashant Dukare" },
  { no: 40, name: "Harshad Ghadge" },
  { no: 41, name: "Prajwal Karde" },
  { no: 42, name: "Sakshi Devanand Deshmukh" },
  { no: 43, name: "Priya Sahu" },
  { no: 44, name: "Harshad Renapure" },
  { no: 45, name: "Lad Harshad Shrimant" },
];

document.documentElement.classList.add("js");

// Delegation list
(function renderDelegates() {
  const root = document.getElementById("delegates");
  if (!root) return;

  if (!DELEGATES.length) {
    root.innerHTML = `
      <div class="delegates__empty reveal">
        <div class="delegates__seal" aria-hidden="true">महा</div>
        <div>
          <h3>The delegation list will be unveiled here.</h3>
          <p>Names of the students selected to represent Maharashtra in the Phase VII exchange with Jammu, Kashmir &amp; Ladakh (21 – 27 October 2026) will be published shortly.</p>
        </div>
      </div>`;
    return;
  }

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initials = (n) => n.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const pad = (n) => String(n).padStart(2, "0");

  root.innerHTML = DELEGATES.map((d) => `
    <article class="delegate reveal">
      <span class="delegate__av" aria-hidden="true">${esc(initials(d.name))}</span>
      <div>
        <p class="delegate__no">No. ${esc(pad(d.no))}</p>
        <h3>${esc(d.name)}</h3>
      </div>
    </article>`).join("");
})();

// Sticky nav border
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("mobile-menu");
const setMenu = (open) => {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menu.hidden = !open;
};
toggle.addEventListener("click", () => setMenu(menu.hidden));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// Reveal on scroll
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduce) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const siblings = [...e.target.parentElement.children].filter((el) => el.classList.contains("reveal"));
      e.target.style.transitionDelay = `${Math.min(siblings.indexOf(e.target), 5) * 80}ms`;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-in"));
}

// Count-up numbers
const counters = document.querySelectorAll(".count");
const fmt = new Intl.NumberFormat("en-IN");
if ("IntersectionObserver" in window && !reduce) {
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const to = Number(el.dataset.to);
      const start = performance.now();
      const dur = 1600;
      const tick = (t) => {
        const p = Math.min((t - start) / dur, 1);
        el.textContent = fmt.format(Math.round(to * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => cio.observe(c));
}
