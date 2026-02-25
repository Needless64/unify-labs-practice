export function showLoading(show) {
  document.getElementById("loader").style.display = show ? "block" : "none";
}

export function showError(msg) {
  document.getElementById("list").innerHTML = `<p>${msg}</p>`;
}

export function renderList(data, favs) {
  let list = document.getElementById("list");
  list.innerHTML = data
    .map(
      (c) => `
        <div>
            <h3>${c.name}</h3>
            <p>$${c.current_price}</p>
            <button data-id="${c.id}">
                ${favs.includes(c.id) ? "Unfavorite" : "Favorite"}
            </button>
        </div>
    `,
    )
    .join("");
}

export function applyTheme(mode) {
  document.body.style.background = mode === "dark" ? "#111" : "#fff";
  document.body.style.color = mode === "dark" ? "#fff" : "#000";
}
