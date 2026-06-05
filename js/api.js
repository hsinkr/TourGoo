const API_BASE = "https://apis.data.go.kr/B551011/KorService2";

function hasServiceKey() {
  return SERVICE_KEY && !SERVICE_KEY.includes("여기에_본인");
}

async function fetchTourApi(path, params = {}) {
  if (!hasServiceKey()) {
    throw new Error("SERVICE_KEY가 설정되지 않았습니다. js/config.js 파일에 TourAPI 서비스키를 입력하세요.");
  }

  const query = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    MobileOS: "ETC",
    MobileApp: "TourRo",
    _type: "json",
    ...params
  });

  const url = `${API_BASE}/${path}?${query.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API 호출 실패: ${res.status}`);
  }

  const json = await res.json();
  const header = json?.response?.header;

  if (header && header.resultCode !== "0000") {
    throw new Error(header.resultMsg || "TourAPI 응답 오류");
  }

  return json.response.body;
}

function normalizeItems(items) {
  if (!items) return [];
  if (Array.isArray(items)) return items;
  return [items];
}
