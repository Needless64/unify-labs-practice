import fetchCoins from "./Api.js";
import { showLoading, showError, renderList, applyTheme } from "./Ui.js";

export let State = {
  coins: [],
  filtered: [],
  favorites: JSON.parse(localStorage.getItem("favs")) || [],
  theme: localStorage.getItem("theme") || "light",
};

applyTheme(State.theme);

async function init() {
  try {
    showLoading(true);
    State.coins = await fetchCoins();
    State.filtered = State.coins;
    renderList(State.filtered, State.favorites);
  } catch (e) {
    showError("Failed to load data");
  } finally {
    showLoading(false);
  }
}

document.getElementById("search").addEventListener("input", (e) => {
  let q = e.target.value.toLowerCase();
  State.filtered = State.coins.filter((c) => c.name.toLowerCase().includes(q));
  renderList(State.filtered, State.favorites);
});

document.getElementById("sort").addEventListener("change", (e) => {
  let v = e.target.value;
  State.filtered.sort((a, b) => {
    if (v === "name") return a.name.localeCompare(b.name);
    return a.current_price - b.current_price;
  });
  renderList(State.filtered, State.favorites);
});

document.getElementById("list").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    let id = e.target.dataset.id;
    if (State.favorites.includes(id)) {
      State.favorites = State.favorites.filter((f) => f !== id);
    } else {
      State.favorites.push(id);
    }
    localStorage.setItem("favs", JSON.stringify(State.favorites));
    renderList(State.filtered, State.favorites);
  }
});

document.getElementById("themeToggle").addEventListener("click", () => {
  State.theme = State.theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", State.theme);
  applyTheme(State.theme);
});

init();
