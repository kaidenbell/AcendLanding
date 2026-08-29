const header = document.querySelector(".header");
const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const hero = document.querySelector(".hero");

function syncHeader() {
  const pastHero = hero.getBoundingClientRect().bottom <= header.offsetHeight;
  header.classList.toggle("is-over-hero", !pastHero);
  header.classList.toggle("is-scrolled", pastHero);
}

function setMenu(open) {
  toggle.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileNav.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);
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
