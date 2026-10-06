/* ----------------------------------------------------------
   DELEGATION — add the selected students here.
   Example: { name: "Aarav Patil", dept: "Mechanical Engg.", year: "3rd Year" }
   ---------------------------------------------------------- */
const DELEGATES = [];

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

  root.innerHTML = DELEGATES.map((d) => `
    <article class="delegate reveal">
      <span class="delegate__av" aria-hidden="true">${esc(initials(d.name))}</span>
      <div>
        <h3>${esc(d.name)}</h3>
        <p>${esc([d.dept, d.year].filter(Boolean).join(" · "))}</p>
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

// Itinerary dialog
const itin = document.getElementById("itinerary");
document.querySelectorAll("[data-open-itinerary]").forEach((b) => b.addEventListener("click", () => itin.showModal()));
itin.querySelector("[data-close-itinerary]").addEventListener("click", () => itin.close());
itin.addEventListener("click", (e) => { if (e.target === itin) itin.close(); });
