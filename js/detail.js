const detailParams = new URLSearchParams(location.search);
const contentId = detailParams.get("contentId");
const contentTypeId = detailParams.get("contentTypeId");

const loadingEl = document.getElementById("detailLoading");
const contentEl = document.getElementById("detailContent");

async function loadDetail() {
  try {
    let item;

    if (String(contentId).startsWith("sample")) {
      item = SAMPLE_ITEMS.find(x => x.contentid === contentId) || SAMPLE_ITEMS[0];
    } else {
      const body = await fetchTourApi("detailCommon2", {
        contentId,
        contentTypeId,
        defaultYN: "Y",
        firstImageYN: "Y",
        addrinfoYN: "Y",
        mapinfoYN: "Y",
        overviewYN: "Y"
      });
      item = normalizeItems(body?.items?.item)[0];
    }

    if (!item) throw new Error("상세 정보가 없습니다.");

    renderDetail(item);
  } catch (e) {
    loadingEl.innerHTML = `상세 정보를 불러오지 못했습니다.<br>${escapeHtml(e.message)}`;
  }
}

function renderDetail(item) {
  const img = document.getElementById("detailImage");
  img.src = item.firstimage || "";
  img.alt = item.title || "상세 이미지";
  if (!item.firstimage) img.classList.add("image-placeholder");

  document.getElementById("detailTitle").innerText = item.title || "";
  document.getElementById("detailAddr").innerText = `⌖ ${item.addr1 || "주소 정보 없음"}`;
  document.getElementById("detailOverview").innerHTML = item.overview || "소개 정보가 없습니다.";
  document.getElementById("detailMapText").innerText =
    item.mapy && item.mapx ? `${item.mapy}, ${item.mapx}` : "좌표 정보가 없습니다.";

  const kakaoUrl = item.mapx && item.mapy
    ? `https://map.kakao.com/link/map/${encodeURIComponent(item.title)},${item.mapy},${item.mapx}`
    : `https://map.kakao.com/link/search/${encodeURIComponent(item.title || "")}`;

  const naverUrl = item.mapx && item.mapy
    ? `https://map.naver.com/p/search/${encodeURIComponent(item.title || item.addr1 || "")}`
    : `https://map.naver.com/p/search/${encodeURIComponent(item.title || "")}`;

  document.getElementById("kakaoMapBtn").href = kakaoUrl;
  document.getElementById("naverMapBtn").href = naverUrl;

  loadingEl.classList.add("hidden");
  contentEl.classList.remove("hidden");
}

loadDetail();
