const header = document.querySelector(".header");
const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const hero = document.querySelector(".hero");
const darkBands = document.querySelectorAll(".cta, .footer");

function isOverlappingHeader(el, lead = 0) {
  const rect = el.getBoundingClientRect();
  const headerBottom = header.offsetHeight;
  return rect.top < headerBottom && rect.bottom > headerBottom + lead;
}

function syncHeader() {
  const overHero = isOverlappingHeader(hero, -12);
  const overDark = [...darkBands].some((el) => isOverlappingHeader(el));
  header.classList.toggle("is-over-hero", overHero || overDark);
  header.classList.toggle("is-over-dark", overDark);
  header.classList.toggle("is-scrolled", !overHero && !overDark);
}

let headerSyncRaf = 0;
function requestHeaderSync() {
  if (headerSyncRaf) return;
  headerSyncRaf = requestAnimationFrame(() => {
    headerSyncRaf = 0;
    syncHeader();
  });
}

function setMenu(open) {
  toggle.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileNav.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);
  document.documentElement.classList.toggle("nav-open", open);
}

syncHeader();
window.addEventListener("scroll", requestHeaderSync, { passive: true });
window.addEventListener("resize", requestHeaderSync);

toggle.addEventListener("click", () => {
  setMenu(!toggle.classList.contains("is-open"));
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    setBeta(false);
  }
});

const betaGate = document.querySelector("#beta-gate");
const appLinks = document.querySelectorAll('a[href*="acend-production.up.railway.app"]');

function setBeta(open) {
  betaGate.hidden = !open;
  document.body.classList.toggle("beta-open", open);
  if (open) {
    setMenu(false);
    const closeBtn = betaGate.querySelector(".btn[data-beta-close]");
    closeBtn?.focus();
  }
}

appLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setBeta(true);
  });
});

betaGate.querySelectorAll("[data-beta-close]").forEach((el) => {
  el.addEventListener("click", () => setBeta(false));
});
