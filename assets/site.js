/* Research Digest – shared scripts */
(() => {
  const STORAGE_KEY = "rd-theme";

  function applyTheme(value) {
    if (!value) {
      document.documentElement.removeAttribute("data-theme");
      return;
    }
    document.documentElement.setAttribute("data-theme", value);
  }

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return null;
  }

  function initTheme() {
    const stored = getPreferredTheme();
    if (stored) applyTheme(stored);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    const btn = document.querySelector('[data-action="toggle-theme"]');
    if (btn) btn.setAttribute("aria-pressed", String(next === "dark"));
  }

  function initThemeButton() {
    const btn = document.querySelector('[data-action="toggle-theme"]');
    if (!btn) return;
    const current = document.documentElement.getAttribute("data-theme");
    btn.setAttribute("aria-pressed", String(current === "dark"));
    btn.addEventListener("click", toggleTheme);
  }

  function initBackToTop() {
    const btn = document.querySelector('[data-action="back-to-top"]');
    if (!btn) return;
    const onScroll = () => {
      const show = window.scrollY > 900;
      btn.classList.toggle("visible", show);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      const input = document.querySelector('input[type="search"][data-role="search"]');
      if (input) {
        e.preventDefault();
        input.focus();
      }
    }
  });

  function focusSearchFromHash() {
    const raw = (location.hash || "").toLowerCase();
    if (raw !== "#search" && raw !== "#site-search") return;
    const input = document.querySelector('input[type="search"][data-role="search"]');
    if (!input) return;
    requestAnimationFrame(() => {
      input.focus({ preventScroll: true });
    });
  }

  initTheme();
  window.addEventListener("hashchange", focusSearchFromHash);
  window.addEventListener("DOMContentLoaded", () => {
    initThemeButton();
    initBackToTop();
    focusSearchFromHash();
  });
})();
