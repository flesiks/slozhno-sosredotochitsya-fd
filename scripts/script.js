(() => {
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll(".header__theme-menu-button")];
  const storageKey = "theme";

  const getSavedTheme = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const setTheme = (theme) => {
    root.classList.remove("theme-light", "theme-dark", "theme-auto");
    if (theme !== "auto") {
      root.classList.add(`theme-${theme}`);
    }
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Страница продолжит работать, даже если localStorage недоступен.
    }
    setActiveButton(theme);
  };

  const setActiveButton = (theme) => {
    buttons.forEach((button) => {
      const isActive = button.classList.contains(`header__theme-menu-button_type_${theme}`);
      button.classList.toggle("header__theme-menu-button_active", isActive);
      button.disabled = isActive;
    });
  };

  const savedTheme = getSavedTheme();
  const initialTheme = ["light", "dark", "auto"].includes(savedTheme) ? savedTheme : "auto";
  setTheme(initialTheme);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const themeClass = [...button.classList].find((className) => className.includes("_type_"));
      const theme = themeClass.split("_type_")[1];
      setTheme(theme);
    });
  });
})();
