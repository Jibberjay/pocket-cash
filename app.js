// app.js

// Change color mode when system theme also changes
useColorMode();
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
    setColorMode(event.matches ? "dark" : "light");
});

// Gets user preferences and system themes to set the appropriate color mode
function useColorMode() {
    const userPreference = localStorage.getItem("preferredTheme");
    const systemIsDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (userPreference === "light") {
        setColorMode("light");
    } else if (userPreference === "dark") {
        setColorMode("dark");
    } else {
        localStorage.setItem("preferredTheme", "system");
        setColorMode(systemIsDark ? "dark" : "light");
    }
}

// Sets the given color mode
function setColorMode(mode) {
    document.body.setAttribute("data-bs-theme", mode || "light");
}