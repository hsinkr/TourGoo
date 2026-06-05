const AREAS = [
  { code: 1, name: "서울", desc: "경복궁·한강·남산", icon: "🏙️", bg: "linear-gradient(135deg,#596270,#2f3542)" },
  { code: 2, name: "인천", desc: "인천공항·차이나타운", icon: "✈️", bg: "linear-gradient(135deg,#2f80ed,#56ccf2)" },
  { code: 3, name: "대전", desc: "엑스포·한밭수목원", icon: "🏢", bg: "linear-gradient(135deg,#8e9eab,#eef2f3)" },
  { code: 4, name: "대구", desc: "동성로·서문시장", icon: "🌹", bg: "linear-gradient(135deg,#8e2de2,#4a00e0)" },
  { code: 5, name: "광주", desc: "무등산·국립아시아문화전당", icon: "🌕", bg: "linear-gradient(135deg,#141e30,#243b55)" },
  { code: 6, name: "부산", desc: "해운대·광안리", icon: "🌊", bg: "linear-gradient(135deg,#0052d4,#65c7f7,#9cecfb)" },
  { code: 7, name: "울산", desc: "대왕암·간절곶", icon: "🌊", bg: "linear-gradient(135deg,#00c6ff,#0072ff)" },
  { code: 8, name: "세종", desc: "세종호수공원·정부청사", icon: "🏛️", bg: "linear-gradient(135deg,#485563,#29323c)" },
  { code: 31, name: "경기", desc: "수원화성·남이섬", icon: "🏯", bg: "linear-gradient(135deg,#4568dc,#b06ab3)" },
  { code: 32, name: "강원", desc: "설악산·경포대", icon: "⛰️", bg: "linear-gradient(135deg,#11998e,#38ef7d)" },
  { code: 33, name: "충북", desc: "단양팔경·청남대", icon: "🏞️", bg: "linear-gradient(135deg,#76b852,#8dc26f)" },
  { code: 34, name: "충남", desc: "공주·부여·보령", icon: "⛩️", bg: "linear-gradient(135deg,#232526,#414345)" },
  { code: 35, name: "경북", desc: "경주·안동하회마을", icon: "🏛️", bg: "linear-gradient(135deg,#334d50,#cbcaa5)" },
  { code: 36, name: "경남", desc: "통영·거제·남해", icon: "🎵", bg: "linear-gradient(135deg,#1d976c,#93f9b9)" },
  { code: 37, name: "전북", desc: "전주한옥마을·변산반도", icon: "🌅", bg: "linear-gradient(135deg,#614385,#516395)" },
  { code: 38, name: "전남", desc: "여수밤바다·순천만", icon: "🌼", bg: "linear-gradient(135deg,#f7971e,#ffd200)" },
  { code: 39, name: "제주", desc: "한라산·성산일출봉", icon: "🌸", bg: "linear-gradient(135deg,#00b09b,#96c93d)" }
];

const TYPE_NAMES = {
  12: "관광지",
  14: "문화시설",
  15: "축제/행사",
  25: "둘레길",
  28: "레포츠",
  32: "숙박",
  38: "쇼핑",
  39: "맛집"
};

const SAMPLE_ITEMS = [
  {
    contentid: "sample-1",
    contenttypeid: "39",
    title: "가나돈까스의집",
    addr1: "서울특별시 강남구 언주로 608",
    tel: "02-000-0000",
    firstimage: "",
    mapx: "127.0377755568",
    mapy: "37.5099674377",
    overview: "언주역과 선정릉역 중간쯤에 위치한 돈까스 맛집입니다. 대표메뉴는 돈까스로 전형적인 옛날 돈까스의 비주얼과 맛을 선보입니다."
  },
  {
    contentid: "sample-2",
    contenttypeid: "25",
    title: "북한산둘레길 1구간",
    addr1: "서울특별시 은평구 진관동",
    tel: "02-357-9688",
    firstimage: "",
    mapx: "126.941",
    mapy: "37.629",
    overview: "북한산 주변을 따라 걷는 둘레길 코스입니다. 도심 가까이에서 자연을 느낄 수 있습니다."
  }
];

function getTypeName(id) {
  return TYPE_NAMES[String(id)] || "기타";
}

function findArea(code) {
  return AREAS.find(area => String(area.code) === String(code));
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, s => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[s]));
}
