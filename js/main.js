const areaList = document.getElementById("areaList");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

/*
function renderAreas(keyword = "") {
  const normalized = keyword.trim();
  const filtered = AREAS.filter(area =>
    area.name.includes(normalized) || area.desc.includes(normalized)
  );

  areaList.innerHTML = filtered.map(area => `
    <a class="area-card"
       href="area.html?areaCode=${area.code}&name=${encodeURIComponent(area.name)}"
       style="background:${area.bg}">
      <div class="area-overlay">
        <div class="area-card-icon">${area.icon}</div>
        <h4>${area.name}</h4>
        <p>${area.desc}</p>
      </div>
    </a>
  `).join("");

  searchResult.innerHTML = normalized && filtered.length === 0
    ? `<p>검색 결과가 없습니다. 시도명으로 다시 검색해보세요.</p>`
    : "";
}
*/
function renderAreas(keyword = "") {
  const normalized = keyword.trim();
  const filtered = AREAS.filter(area =>
    area.name.includes(normalized) || area.desc.includes(normalized)
  );

  areaList.innerHTML = filtered.map(area => {
    const bgStyle = area.bgImage
      ? `
        background-image:
          linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
          url('./${area.bgImage}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      `
      : `background: ${area.bg};`;

    return `
      <a class="area-card"
         href="area.html?areaCode=${area.code}&name=${encodeURIComponent(area.name)}"
         style="${bgStyle}">
        <div class="area-overlay">
          <div class="area-card-icon">${area.icon}</div>
          <h4>${area.name}</h4>
          <p>${area.desc}</p>
        </div>
      </a>
    `;
  }).join("");

  searchResult.innerHTML = normalized && filtered.length === 0
    ? `<p>검색 결과가 없습니다. 시도명으로 다시 검색해보세요.</p>`
    : "";
}

searchInput.addEventListener("input", e => {
  renderAreas(e.target.value);
});

renderAreas();
