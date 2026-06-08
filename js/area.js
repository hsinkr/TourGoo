const params = new URLSearchParams(location.search);
const areaCode = params.get("areaCode") || "1";
const areaName = params.get("name") || "서울";
const areaInfo = findArea(areaCode);

let selectedSigunguCode = "";
let selectedContentTypeId = "";
let pageNo = 1;
let totalCount = 0;
let isLoading = false;

const areaHero = document.getElementById("areaHero");
const placeList = document.getElementById("placeList");
const totalCountEl = document.getElementById("totalCount");
const moreBtn = document.getElementById("moreBtn");

document.getElementById("areaTitle").innerText = areaInfo?.name || areaName;
document.getElementById("areaDesc").innerText = areaInfo?.desc || "";
document.getElementById("areaIcon").innerText = areaInfo?.icon || "";
//areaHero.style.background = `${areaInfo?.bg || "linear-gradient(135deg,#333,#777)"}`;
if (areaInfo?.bgImage) {
  areaHero.style.backgroundImage = `
    linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
    url('./${areaInfo.bgImage}')
  `;
  areaHero.style.backgroundSize = "cover";
  areaHero.style.backgroundPosition = "center center";
  areaHero.style.backgroundRepeat = "no-repeat";
} else {
  areaHero.style.background = areaInfo?.bg || "linear-gradient(135deg,#333,#777)";
}

async function loadSigungu() {
  const filter = document.getElementById("sigunguFilter");

  try {
    const body = await fetchTourApi("areaCode2", {
      areaCode,
      numOfRows: "100"
    });

    const items = normalizeItems(body?.items?.item);

    filter.innerHTML = `
      <button class="active" data-code="">전체</button>
      ${items.map(item => `<button data-code="${item.code}">${item.name}</button>`).join("")}
    `;

    filter.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedSigunguCode = btn.dataset.code || "";
        filter.querySelectorAll("button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        resetAndLoad();
      });
    });
  } catch (e) {
    filter.innerHTML = `<button class="active" data-code="">전체</button>`;
    console.warn(e);
  }
}

document.querySelectorAll("#typeFilter button").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedContentTypeId = btn.dataset.type || "";
    document.querySelectorAll("#typeFilter button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    resetAndLoad();
  });
});

function resetAndLoad() {
  pageNo = 1;
  placeList.innerHTML = "";
  loadItems();
}

async function loadItems() {
  if (isLoading) return;
  isLoading = true;
  moreBtn.disabled = true;
  moreBtn.innerText = "불러오는 중...";

  if (pageNo === 1) {
    placeList.innerHTML = `<div class="loading">장소 정보를 불러오는 중입니다...</div>`;
  }

  try {
    let items = [];
    let body = null;

    try {
      body = await fetchTourApi("areaBasedList2", {
        numOfRows: "20",
        pageNo: String(pageNo),
        arrange: "O",
        areaCode,
        ...(selectedSigunguCode ? { sigunguCode: selectedSigunguCode } : {}),
        ...(selectedContentTypeId ? { contentTypeId: selectedContentTypeId } : {})
      });

      items = normalizeItems(body?.items?.item);
      totalCount = Number(body?.totalCount || 0);
    } catch (apiError) {
      //if (!USE_SAMPLE_WHEN_API_FAILS) throw apiError;
      //items = pageNo === 1 ? SAMPLE_ITEMS : [];
      //totalCount = SAMPLE_ITEMS.length;
      //console.warn(apiError);
      console.error(apiError);
      throw apiError;
    }

    totalCountEl.innerText = totalCount.toLocaleString();

    if (pageNo === 1) placeList.innerHTML = "";

    if (!items.length && pageNo === 1) {
      placeList.innerHTML = `<p class="empty">조회된 장소가 없습니다.</p>`;
      moreBtn.style.display = "none";
      return;
    }

    placeList.insertAdjacentHTML("beforeend", items.map(renderPlaceCard).join(""));

    const loadedCount = placeList.querySelectorAll(".place-card").length;
    moreBtn.style.display = loadedCount < totalCount ? "inline-block" : "none";
    pageNo++;
  } catch (e) {
    placeList.innerHTML = `<p class="empty">데이터를 불러오지 못했습니다.<br>${escapeHtml(e.message)}</p>`;
    moreBtn.style.display = "none";
  } finally {
    isLoading = false;
    moreBtn.disabled = false;
    moreBtn.innerText = "더 보기";
  }
}

function renderPlaceCard(item) {
  const contentId = encodeURIComponent(item.contentid || "");
  const contentTypeId = encodeURIComponent(item.contenttypeid || "");
  const image = item.firstimage
    ? `<img src="${item.firstimage}" alt="${escapeHtml(item.title)}" loading="lazy">`
    : `<div class="no-img">▧</div>`;

  return `
    <a class="place-card" href="detail.html?contentId=${contentId}&contentTypeId=${contentTypeId}">
      <div class="thumb">
        ${image}
        <span class="tag">${getTypeName(item.contenttypeid)}</span>
      </div>
      <div class="place-info">
        <h3 title="${escapeHtml(item.title)}">${escapeHtml(item.title || "제목 없음")}</h3>
        <p>⌖ ${escapeHtml(item.addr1 || "주소 정보 없음")}</p>
        <p>☏ ${escapeHtml(item.tel || "전화번호 없음")}</p>
      </div>
    </a>
  `;
}

moreBtn.addEventListener("click", loadItems);

loadSigungu();
loadItems();
