(function () {
  const storageKey = "mivora-language";
  const supported = ["en", "zh", "tr"];
  const current = supported.includes(localStorage.getItem(storageKey))
    ? localStorage.getItem(storageKey)
    : "en";

  function applyLanguage(lang, persist) {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang === "tr" ? "tr" : "en";
    document.querySelectorAll("[data-en][data-zh]").forEach((node) => {
      node.textContent = node.dataset[lang] || node.dataset.en;
    });
    document.querySelectorAll(".lang-toggle button").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === lang);
      button.setAttribute("aria-pressed", button.dataset.lang === lang ? "true" : "false");
    });
    if (persist) localStorage.setItem(storageKey, lang);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".lang-toggle button").forEach((button) => {
      button.addEventListener("click", () => applyLanguage(button.dataset.lang, true));
    });
    applyLanguage(current, false);
  });
})();
