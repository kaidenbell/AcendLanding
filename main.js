const header = document.querySelector(".header");
const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const hero = document.querySelector(".hero");
const darkBands = document.querySelectorAll(".cta, .footer");

function isOverlappingHeader(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < header.offsetHeight && rect.bottom > 0;
}

function syncHeader() {
  const overHero = isOverlappingHeader(hero);
  const overDark = [...darkBands].some(isOverlappingHeader);
  header.classList.toggle("is-over-hero", overHero || overDark);
  header.classList.toggle("is-over-dark", overDark);
  header.classList.toggle("is-scrolled", !overHero && !overDark);
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
window.addEventListener("scroll", syncHeader, { passive: true });
window.addEventListener("resize", syncHeader);

toggle.addEventListener("click", () => {
  setMenu(!toggle.classList.contains("is-open"));
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});
