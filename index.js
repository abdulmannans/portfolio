/* -----------------------------------------
  Have focus outline only for keyboard users
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove("user-is-tabbing");
  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
};

window.addEventListener("keydown", handleFirstTab);

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const backToTopButton = document.querySelector(".back-to-top");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll("[data-nav]");
const sections = [...document.querySelectorAll("main section[id]")];

const alterStyles = (visible) => {
  if (!backToTopButton) return;
  backToTopButton.style.visibility = visible ? "visible" : "hidden";
  backToTopButton.style.opacity = visible ? 1 : 0;
  backToTopButton.style.transform = visible ? "scale(1)" : "scale(0)";
};

const updateNavState = () => {
  const scrolled = window.scrollY > 24;
  if (siteNav) {
    siteNav.classList.toggle("is-scrolled", scrolled);
  }

  alterStyles(window.scrollY > 700);

  if (!sections.length || !navLinks.length) return;

  const offset = (siteNav?.offsetHeight || 64) + 32;
  let currentId = sections[0].id;

  for (const section of sections) {
    if (section.getBoundingClientRect().top - offset <= 0) {
      currentId = section.id;
    }
  }

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("is-active", isActive);
  });
};

window.addEventListener("scroll", updateNavState, { passive: true });
updateNavState();

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}
