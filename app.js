// app.js


// Important app screens
const startScreen = "home";
const errorScreen = "404";

// Theme transition speed
const transitionSpeed = 500;

// Days and months
const now = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Use actual date on certain elements
let dateElements = document.getElementsByClassName("js-date");
for (let el of dateElements) {
    el.textContent = el.textContent
        .replaceAll("{day}", days[now.getDay()])
        .replaceAll("{date}", now.getDate())
        .replaceAll("{month}", months[now.getMonth()])
        .replaceAll("{year}", now.getFullYear());
    if (el.tagName == "TIME") {
        el.dateTime = formatDate(now);
    }
}

// Change color mode when system theme also changes
useColorMode();
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
    setColorMode(event.matches ? "dark" : "light");
});

// Returns the given date in YYYY-MM-DD format
function formatDate(date) {
    date = date || new Date();
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
}

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
    const style = document.createElement("style");
    style.id = "temp-theme-transition";
    style.innerHTML = "* {transition: all " + transitionSpeed + "ms ease !important;}";
    document.head.appendChild(style);
    document.body.setAttribute("data-theme", mode || "light");
    setTimeout(() => {
        document.getElementById("temp-theme-transition").remove();
    }, transitionSpeed);
}

// Renders the proper screen
window.addEventListener("DOMContentLoaded", render);
window.addEventListener("hashchange", render);
function render() {
    const app = document.getElementById("app");
    let hash = location.hash;
    if (!hash) location.hash = hash = startScreen;
    hash = hash.replace("#", "");
    const template = document.getElementById("screen-" + hash);
    app.innerHTML = "";
    if (template) {
        app.appendChild(template.content.cloneNode(true));
    } else {
        app.appendChild(document.getElementById("screen-" + errorScreen).content.cloneNode(true));
    }
}