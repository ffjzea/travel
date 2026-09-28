/**
 * 沖繩家族旅行 — 行程資料
 *
 * ✏️ 要改行程內容或日期，只需要動這個檔案。
 *    日期格式為 ISO `YYYY-MM-DD`（用於「依今天日期預設 tab」）。
 *    日期一改，畫面上的星期幾與「今天」標記會自動跟著更新。
 */

export type EntryKind =
  | 'flight'
  | 'transport'
  | 'hotel'
  | 'food'
  | 'sight'
  | 'shopping'
  | 'note';

export interface Link {
  label: string;
  url: string;
}

export interface Photo {
  src: string;
  caption: string;
}

export interface Entry {
  time?: string;
  kind: EntryKind;
  title: string;
  detail?: string;
  links?: Link[];
  photos?: Photo[];
}

export interface RefBlock {
  title: string;
  rows?: { k: string; v: string }[];
  bullets?: string[];
  photos?: Photo[];
  links?: Link[];
}

export interface DayPlan {
  id: number;
  /** ISO 日期，YYYY-MM-DD */
  date: string;
  title: string;
  area: string;
  stay: string;
  entries: Entry[];
  /** 當天的上下車／轉乘位置 */
  transit: TransitStop[];
  refs: RefBlock[];
}

/** 搭車資訊的一列 */
export interface TransitStop {
  /** 角色標籤：出發／抵達／上車／下車／轉乘／步行／單軌／計程車／回程 */
  role: string;
  name: string;
  detail?: string;
  /** 有值時顯示「🗺️ 地圖」按鈕 */
  query?: string;
}

/* ------------------------------------------------------------------ */
/* 小工具                                                              */
/* ------------------------------------------------------------------ */

/** Google Maps 搜尋連結：手機點一下就開地圖，可直接導航 */
export const mapsUrl = (query: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const map = (query: string): Link => ({
  label: '🗺️ 地圖',
  url: mapsUrl(query),
});

/* ------------------------------------------------------------------ */
/* 共用參考資料（多天重複使用）                                        */
/* ------------------------------------------------------------------ */

const AGU_PORK: RefBlock = {
  title: '國際通餐廳推薦（阿古豬涮涮鍋 & 牛排）',
  bullets: [
    '島しゃぶしゃぶ NAKAMA — 國際通人氣店，可同時享用阿古豬涮涮鍋與石垣牛，常有沖繩島唄 Live 演唱。位置：那霸市久茂地 3-3-1（近縣廳前站）。營業 11:30–15:00、17:00–22:30',
    '砂浜島黑豬涮涮鍋 — 被譽為國際通阿古豬天花板，100% 純血統島黑阿古豬，套餐搭配多種創意雙拼湯底。位置：那霸市牧志 3-12-8（近牧志站，步行 2 分鐘）。營業 12:00–23:00',
    '豬肉涮涮鍋專門店 Ocean Boo！國際通店 — 在地人氣連鎖，獨家清爽湯底，交通便利。位置：近單軌牧志站，步行約 5 分鐘（大樓 3 樓）',
    'ステーキハウス 88（88 牛排）國際通店 — 老牌鐵板牛排，國際通正中央、逛累了直接吃。位置：那霸市牧志 3-1-6 勉強堂ビル 2F（牧志站步行約 5 分）',
  ],
  links: [
    map('島しゃぶしゃぶNAKAMA 那覇'),
    map('砂浜島黒豚しゃぶしゃぶ 牧志'),
    map('Ocean Boo 国際通り店 那覇'),
    map('ステーキハウス88 国際通り店'),
  ],
};

const AIRPORT_BUS_PHOTOS: Photo[] = [
  {
    src: 'images/naha-terminal-1f.png',
    caption: '那霸機場國內線航廈 1 樓：國內線抵達大廳 → 出口 2 → 公車站 ⑤',
  },
  {
    src: 'images/naha-bus-stop-5.png',
    caption: '前往乘車處的路線：前行約 50 公尺即抵達「公車站 ⑤」',
  },
];

const TK05_PHOTOS: Photo[] = [
  { src: 'images/tk05-timetable.png', caption: 'TK05 北谷直行接駁巴士時刻表（去／回程）' },
  { src: 'images/tk05-sign.png', caption: 'TK05 站牌：空港／國際通 ⇄ 北谷 Gateway' },
];

/* ------------------------------------------------------------------ */
/* 那霸機場攻略（獨立 tab）                                            */
/* ------------------------------------------------------------------ */

export interface AirportGuide {
  title: string;
  floors: { k: string; v: string }[];
  transit: TransitStop[];
  refs: RefBlock[];
}

export const AIRPORT_GUIDE: AirportGuide = {
  title: '那霸機場攻略',
  floors: [
    { k: '1F', v: '入境大廳、交通與租車服務' },
    { k: '2F', v: '出境大廳、伴手禮商店街' },
    { k: '3F', v: '報到櫃檯、觀景台、餐廳' },
    { k: '4F', v: '觀景台、餐廳' },
  ],
  transit: [
    {
      role: '單軌',
      name: '那霸機場站（ゆいレール）',
      detail: '2 樓出口直通。往市區（縣廳前 約 13 分／290 日圓）。',
      query: '那覇空港駅 ゆいレール',
    },
    {
      role: '上車',
      name: '1 號乘車口（國內線航廈 1 樓外）',
      detail: '利木津巴士 A 區：往宜野灣、北谷美國村。',
      query: '那覇空港 国内線ターミナル バス乗り場',
    },
    {
      role: '上車',
      name: '5 號乘車處（國內線航廈 1 樓外）',
      detail: 'TK05 北谷直行接駁巴士。從出口 2 步行約 50 公尺。',
      query: '那覇空港 バス乗り場 5番',
    },
    {
      role: '上車',
      name: '3 號乘車處（國內線航廈 1 樓外）',
      detail: '路線巴士 120 號：往「桑江」，鄰近 A&W 美濱店。',
      query: '那覇空港 バス乗り場 3番',
    },
    {
      role: '步行',
      name: '國內線航廈 1 樓｜POTAMA 豬肉蛋飯糰',
      detail: '抵達後先買一顆帶上車吃。',
      query: 'ポーたま 那覇空港店',
    },
  ],
  refs: [
    {
      title: '各樓層說明',
      bullets: [
        '1F｜入境大廳與往返各地的交通匯流重心。由於國際線部分區域在施工，建議移往接駁機能完善的「國內線航廈」。旅客可在此搭乘前往那霸市區、人氣觀光景點，或搭乘接駁巴士至租車公司據點取車。',
        '2F｜國內線、國際線共通的出發樓層，從 2 樓出口可直通單軌電車「那霸機場站」，不論是出發或抵達，都能輕鬆接軌市區交通。',
        '3F｜聚集各大航空公司的報到櫃檯，旅客可在此辦理登機手續並託運行李。',
      ],
      links: [map('那覇空港'), { label: '那霸機場官網', url: 'https://www.naha-airport.co.jp/' }],
    },
    {
      title: '入境流程說明',
      bullets: [
        '從國際線抵達那霸機場後，先通過檢疫櫃檯；若有發燒等不適症狀請務必主動通報。',
        '於入境審查區出示護照辦理入境手續。',
        '在行李轉盤提領託運行李。',
        '即使沒有攜帶超過免稅額的物品，仍需填寫並提交「攜帶品・寄送品申報單」給海關。',
        '若有攜帶動植物產品，請配合相關檢疫規定。',
        '最後從海關出口進入 1 樓到達大廳，即可轉乘巴士、計程車、租車，或經由 2 樓連通道前往單軌電車「那霸機場站」前往市區，開始旅程！',
      ],
    },
    {
      title: '出境流程說明',
      bullets: [
        '搭乘國際線離境時，先前往 3 樓的航空公司櫃檯辦理報到與託運行李，領取登機證。',
        '再移動至 2 樓的安檢與出境區。',
        '通過安全檢查時，需取出電子設備、金屬物品與液體類品項（每瓶不得超過 100ml、總量不得超過 1 公升）。',
        '如有攜帶高額現金、貴重物品（如名錶、珠寶）等超過免稅額度的物品，請主動向海關申報。',
        '完成出境審查後，務必確認登機證上的登機門資訊，並留意現場廣播與電子看板是否有異動。',
        '依航空公司人員引導登機，便可順利返家。',
      ],
    },
    {
      title: '國內線 1F 必吃：豬肉蛋飯糰「pork tamago onigiri」',
      bullets: [
        '位置：國內線航廈 1 樓。抵達後先買一顆帶上車吃，是第一天行程的固定安排。',
        '常見排隊人潮，建議先點餐再等叫號。',
      ],
      links: [map('ポーたま 那覇空港店')],
    },
    {
      title: '機場動線（國際線 → 國內線）',
      bullets: [
        '國際線部分區域施工中，建議移往接駁機能完善的「國內線航廈」。',
        '動線：國內線抵達大廳 → 出口 2 → 公車站 ⑤。',
      ],
      photos: AIRPORT_BUS_PHOTOS,
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 五天行程                                                            */
/* ------------------------------------------------------------------ */

export const DAYS: DayPlan[] = [
  {
    id: 1,
    date: '2026-10-05',
    title: '桃園 → 那霸 → 北谷',
    area: '北谷・美國村',
    stay: 'Vessel Hotel Campana Okinawa',
    entries: [
      {
        time: '08:00',
        kind: 'flight',
        title: '桃園機場出發',
        detail: '國際線航班。建議提前 2.5 小時抵達辦理報到與託運行李。',
        links: [map('桃園國際機場')],
      },
      {
        time: '10:00',
        kind: 'flight',
        title: '抵達那霸機場',
        detail:
          '辦理出關後，從國際線走到國內線航廈一樓搭乘巴士，買 POTAMA（豬肉蛋飯糰）車上吃。',
        links: [map('那覇空港')],
      },
      {
        time: '11:45',
        kind: 'transport',
        title: '搭乘 TK05 北谷直達接駁巴士',
        detail: '乘車處：國內線 5 號乘車處（步行約 50 公尺）。',
        photos: TK05_PHOTOS,
      },
      {
        time: '12:45',
        kind: 'transport',
        title: '抵達北谷 GATEWAY（Chatan Gateway）',
        detail: '下車後步行 10–15 分鐘到飯店。對面即是永旺北谷店。',
        links: [map('北谷ゲートウェイ')],
        photos: [{ src: 'images/chatan-mihama-map.png', caption: '北谷「美濱」區域地圖（含飯店位置）' }],
      },
      {
        time: '14:00',
        kind: 'hotel',
        title: '飯店 Check-in',
        detail: 'Vessel Hotel Campana Okinawa（沖繩坎帕納船飯店）',
        links: [map('Vessel Hotel Campana Okinawa')],
      },
      {
        time: '17:30',
        kind: 'food',
        title: '晚餐：琉球的牛北谷店',
        detail: '距離飯店步行約 10 分鐘。已訂位 4 大 1 小。',
        links: [
          { label: '🔗 店家資訊', url: 'https://maps.app.goo.gl/YpLytGbJm5Gzt9f98' },
          map('琉球の牛 北谷店'),
        ],
      },
      {
        time: '晚上',
        kind: 'sight',
        title: '美國村、北谷公園日落海灘',
        detail: '飯店周邊散步、看夕陽。',
        links: [map('美浜アメリカンビレッジ'), map('北谷公園 サンセットビーチ')],
      },
    ],
    transit: [
      {
        role: '出發',
        name: '桃園國際機場',
        detail: '國際線航班，建議提前 2.5 小時抵達辦理報到。',
        query: '桃園國際機場',
      },
      {
        role: '抵達',
        name: '那霸機場（那覇空港）',
        detail: '出關後由國際線走至國內線航廈 1 樓。',
        query: '那覇空港',
      },
      {
        role: '上車',
        name: '國內線 5 號乘車處',
        detail: 'TK05 北谷直行接駁巴士｜11:45 發車。從出口 2 步行約 50 公尺。',
        query: '那覇空港 バス乗り場 5番',
      },
      {
        role: '下車',
        name: '北谷 GATEWAY（Chatan Gateway）',
        detail: '12:45 抵達。下車後步行 10–15 分鐘到飯店。',
        query: '北谷ゲートウェイ',
      },
      {
        role: '步行',
        name: 'Vessel Hotel Campana Okinawa',
        detail: '本日住宿。',
        query: 'Vessel Hotel Campana Okinawa',
      },
      {
        role: '步行',
        name: '琉球的牛 北谷店',
        detail: '17:30 晚餐，距飯店步行約 10 分鐘。',
        query: '琉球の牛 北谷店',
      },
    ],
    refs: [
      {
        title: 'Vessel Hotel Campana Okinawa（第 1–2 晚）',
        rows: [
          { k: '地址', v: '沖縄縣中頭郡北谷町字美浜 9-22' },
          { k: '入退時間', v: '入住 14:00／退房 11:00' },
          { k: '參考價格', v: '雙人房一晚 32,200 日圓起（含稅）' },
          { k: '交通方式', v: '利木津巴士 A 區至「レクー沖縄北谷スパ＆リゾート」站；單程大人 1,000 日圓、兒童 500 日圓' },
        ],
        links: [map('Vessel Hotel Campana Okinawa')],
      },
      {
        title: '那霸機場 → 美國村 交通比較',
        rows: [
          { k: '利木津巴士（A 區）', v: '約 60 分鐘｜單程約 1,000 日圓｜A 區乘車處 →「Chatan Gateway」下車，對面即永旺北谷店' },
          { k: '路線巴士 120 號', v: '約 80 分鐘｜單程約 900 日圓｜3 號乘車處 →「桑江」站下車，鄰近 A&W 美濱店' },
          { k: '北谷接駁巴士 Chatan Direct Express', v: '約 50 分鐘｜單程 1,500 日圓｜GOO Chatan 營運，可線上預約；機場發車 11:50、12:50、13:50、15:50、16:50' },
        ],
        bullets: [
          '⚠️ 利木津巴士自 2025 年 4 月起已取消停靠 Vessel Hotel Campana 門口，改在鄰近的「LeQu 沖繩北谷溫泉度假飯店」上下車，下車後步行約 3 分鐘。',
          '利木津巴士 A 路線乘車位置：那霸機場國內線航廈 1 樓外 1 號乘車口。',
        ],
        photos: [
          { src: 'images/limousine-timetable.png', caption: '沖繩中南部度假酒店（A 區域）利木津巴士時刻表' },
        ],
      },
      {
        title: '那霸機場動線（國際線 → 國內線）',
        bullets: [
          '國際線部分區域施工中，建議移往接駁機能完善的「國內線航廈」。',
          '動線：國內線抵達大廳 → 出口 2 → 公車站 ⑤。',
        ],
        photos: AIRPORT_BUS_PHOTOS,
      },
      {
        title: '北谷 GATEWAY 官方網站',
        links: [
          { label: 'chatan-gateway.com', url: 'https://chatan-gateway.com/zh-tw/' },
        ],
      },
    ],
  },
  {
    id: 2,
    date: '2026-10-06',
    title: '北谷 → 國際通（那霸）',
    area: '那霸・國際通',
    stay: 'JR Kyushu Hotel Blossom Naha',
    entries: [
      { time: '08:00', kind: 'food', title: '吃早餐', detail: '飯店早餐。' },
      { time: '11:00', kind: 'hotel', title: '退房', detail: 'Check-out。' },
      {
        time: '11:40',
        kind: 'transport',
        title: '離開飯店前往美國村北谷站搭車',
        detail: '回程的巴士在 1 號站牌等待。',
      },
      {
        time: '12:00',
        kind: 'transport',
        title: 'TK05 發車',
        links: [map('北谷ゲートウェイ')],
      },
      {
        time: '12:45',
        kind: 'transport',
        title: '抵達國際通入口',
        detail:
          '單軌列車 7. 縣廳前站。步行約 10 分鐘至 JR 九州飯店 Blossom 那霸（JR Kyushu Hotel Blossom Naha）。',
        links: [map('国際通り 那覇'), map('県庁前駅 ゆいレール')],
      },
      {
        time: '13:00',
        kind: 'food',
        title: '午餐：暖暮拉麵',
        links: [map('暖暮ラーメン 牧志店 那覇')],
      },
      {
        time: '14:00',
        kind: 'sight',
        title: '國際通逛街（牧志市場）',
        detail: '國際通全長約 1.6 公里，邊逛邊吃。',
        links: [map('国際通り 那覇'), map('牧志公設市場')],
      },
      {
        time: '晚上',
        kind: 'food',
        title: '晚餐：國際通阿古豬涮涮鍋',
        detail: '三家人氣店可選，詳見下方參考資訊。',
        links: [map('国際通り 那覇')],
      },
    ],
    transit: [
      {
        role: '上車',
        name: '美國村 北谷站 1 號站牌',
        detail: 'TK05 回程｜12:00 發車（回程在 1 號站牌等待）。',
        query: '北谷ゲートウェイ バス乗り場',
      },
      {
        role: '下車',
        name: '國際通入口',
        detail: '12:45 抵達。近單軌「縣廳前站」（7 號出口）。',
        query: '国際通り入口 バス停 那覇',
      },
      {
        role: '步行',
        name: 'JR 九州飯店 Blossom 那霸',
        detail: '自國際通入口步行約 10 分鐘。本日起住宿。',
        query: 'JR九州ホテル ブラッサム那覇',
      },
      {
        role: '單軌',
        name: '縣廳前站（ゆいレール）',
        detail: '往那霸市區各站；1 日券 800 日圓。',
        query: '県庁前駅 ゆいレール',
      },
      {
        role: '步行',
        name: '暖暮拉麵／牧志公設市場',
        detail: '午餐與逛街都在國際通徒步區內。',
        query: '牧志公設市場',
      },
    ],
    refs: [
      {
        title: 'JR Kyushu Hotel Blossom Naha（第 2–4 晚）',
        rows: [
          { k: '位置', v: '那霸市國際通，近單軌「縣廳前站」，步行約 10 分鐘' },
          { k: '入退時間', v: '入住 14:00／退房 11:00（依飯店公告為準）' },
        ],
        links: [map('JR九州ホテル ブラッサム那覇')],
      },
      {
        title: 'TK05 回程時刻表（北谷 Gateway → 那霸機場）',
        rows: [
          { k: '2 班', v: '12:00 北谷 Gateway 發 → 國際通入口 12:45 → 那霸機場 13:00' },
          { k: '4 班', v: '13:30 → 14:15 → 14:30' },
          { k: '6 班', v: '15:30 → 16:15 → 16:30' },
          { k: '8 班', v: '17:00 → 17:45 → 18:00' },
          { k: '10 班', v: '19:00 → 19:45 → 20:00' },
        ],
        bullets: ['去程（那霸機場 → 北谷 Gateway）：11:45、13:45、15:15、17:15、18:45；國際通入口發車 12:00 等（詳見時刻表）。'],
        photos: TK05_PHOTOS,
      },
      AGU_PORK,
    ],
  },
  {
    id: 3,
    date: '2026-10-07',
    title: '國際通 → DMM 水族館 → 瀨長島',
    area: '豐崎・瀨長島',
    stay: 'JR Kyushu Hotel Blossom Naha',
    entries: [
      { time: '07:30', kind: 'food', title: '吃早餐', detail: '飯店早餐。' },
      {
        time: '08:25',
        kind: 'transport',
        title: '飯店出發，步行至國際通入口站搭車',
        detail: '琉貿百貨旁，藍白色站牌（東京巴士 国際通り入口）。',
        links: [map('国際通り入口 バス停 那覇')],
      },
      {
        time: '08:50',
        kind: 'transport',
        title: '搭乘 TK02 前往 DMM 水族館',
        detail: '車程約 35–45 分鐘。',
        links: [map('DMMかりゆし水族館')],
      },
      {
        time: '09:40',
        kind: 'sight',
        title: 'DMM 水族館參觀',
        detail: 'DMM かりゆし水族館（位於 IIAS 沖繩豐崎購物中心內）。可體驗餵食水獺或企鵝。',
        links: [map('DMMかりゆし水族館')],
      },
      {
        time: '11:40',
        kind: 'shopping',
        title: 'IIAS 購物中心午餐、購物',
        detail: 'イーアス沖縄豊崎。',
        links: [map('イーアス沖縄豊崎')],
      },
      {
        time: '15:00',
        kind: 'transport',
        title: '搭乘 TK02 前往瀨長島',
        links: [map('瀬長島ウミカジテラス')],
      },
      {
        time: '15:00–17:00',
        kind: 'sight',
        title: '瀨長島 ウミカジテラス（海香露台）',
        detail: '白色地中海風商店街，看飛機起降與海景。',
        links: [map('瀬長島ウミカジテラス')],
      },
      {
        time: '17:20',
        kind: 'transport',
        title: '搭乘 TK02 回國際通',
        detail: '於「瀬長島ホテル(ウミカジテラス)」站上車（與下車同站）。',
        links: [map('瀬長島ホテル ウミカジテラス バス停')],
      },
    ],
    transit: [
      {
        role: '步行',
        name: '國際通入口站（琉貿百貨旁）',
        detail: '藍白色站牌（東京巴士 国際通り入口）｜08:25 出發。',
        query: '国際通り入口 バス停 那覇',
      },
      {
        role: '上車',
        name: '國際通入口（東京巴士 国際通り入口）',
        detail: 'TK02｜08:50 發車，往 IIAS 沖繩豐崎（DMM 水族館）。車程約 35–45 分鐘。',
        query: '国際通り入口 バス停 那覇',
      },
      {
        role: '下車',
        name: 'IIAS 沖繩豐崎（イーアス沖縄豊崎）',
        detail: 'DMM 水族館同棟。11:40 午餐、購物。',
        query: 'イーアス沖縄豊崎',
      },
      {
        role: '上車',
        name: 'IIAS 沖繩豐崎',
        detail: 'TK02 往瀨長島｜15:00 發車。單程 190 日圓。',
        query: 'イーアス沖縄豊崎 バス停',
      },
      {
        role: '下車',
        name: '瀬長島ホテル(ウミカジテラス)',
        detail: '⚠️ 這裡同時是 17:20 回程的上車點，別跑錯。',
        query: '瀬長島ホテル ウミカジテラス バス停',
      },
      {
        role: '回程',
        name: 'TK02 回國際通',
        detail: '17:20 發車。',
        query: '瀬長島ウミカジテラス',
      },
    ],
    refs: [
      {
        title: 'TK02 票價與路線',
        rows: [
          { k: '國際通入口 → IIAS 沖繩豐崎', v: '大人 470 日圓｜車程約 35–45 分鐘' },
          { k: 'IIAS 沖繩豐崎 → 瀨長島', v: '190 日圓（東京巴士 TK02）' },
          { k: '計程車：飯店 → 水族館', v: '約 2,000–2,500 日圓（約 NT$420–530）｜車程 20–25 分鐘' },
          { k: '計程車：IIAS → 瀨長島', v: '約 1,000–1,500 日圓' },
        ],
      },
      {
        title: '瀨長島下車點',
        bullets: [
          '目的地站牌：「瀬長島ホテル(ウミカジテラス)」。',
          '⚠️ 這個下車點同時也是回程（搭回國際通）的上車點，千萬不要跑錯。',
        ],
        photos: [
          { src: 'images/senagajima-bus-stop.png', caption: '瀨長島「東京バス」站牌位置' },
        ],
      },
    ],
  },
  {
    id: 4,
    date: '2026-10-08',
    title: '那霸市區：波上宮・國際通採買',
    area: '那霸市區・國際通',
    stay: 'JR Kyushu Hotel Blossom Naha',
    entries: [
      { time: '08:30', kind: 'food', title: '吃早餐', detail: '飯店早餐。' },
      {
        time: '10:00',
        kind: 'sight',
        title: '波上宮、波之上海灘',
        detail:
          '波上宮是那霸總鎮守，朱紅神社建於斷崖之上；下方就是波之上海灘，可散步看海。',
        links: [map('波上宮'), map('波の上ビーチ')],
      },
      {
        time: '14:00',
        kind: 'shopping',
        title: '國際通採買',
        detail:
          '伴手禮最後補貨：御菓子御殿紅薯塔、雪鹽、泡盛、海葡萄、Blue Seal 冰淇淋。',
        links: [map('国際通り 那覇'), map('牧志公設市場')],
      },
      {
        time: '18:30',
        kind: 'food',
        title: '國際通晚餐',
        detail: '阿古豬涮涮鍋或牛排，詳見下方「國際通餐廳推薦」。',
        links: [map('国際通り 那覇')],
      },
    ],
    transit: [
      {
        role: '步行',
        name: '國際通 → 波上宮',
        detail: '步行約 20 分鐘；搭計程車約 10 分鐘。',
        query: '波上宮',
      },
      {
        role: '計程車',
        name: '波上宮、波之上海灘',
        detail: '10:00 出發，車程約 10 分鐘。',
        query: '波の上ビーチ',
      },
      {
        role: '單軌',
        name: '美榮橋站（ゆいレール）',
        detail: '近泊港漁市場（泊いゆまち），備選行程。',
        query: '美栄橋駅 ゆいレール',
      },
      {
        role: '步行',
        name: '國際通（採買）',
        detail: '14:00 起在國際通徒步區採買伴手禮。',
        query: '国際通り 那覇',
      },
      {
        role: '回程',
        name: 'JR 九州飯店 Blossom 那霸',
        detail: '晚餐後步行回飯店。',
        query: 'JR九州ホテル ブラッサム那覇',
      },
    ],
    refs: [
      {
        title: '國際通採買清單',
        bullets: [
          '御菓子御殿「紅いもタルト」（紅薯塔）— 國際通有多家分店，可免稅。',
          'Blue Seal 冰淇淋 — 沖繩限定口味（紫薯、雪鹽、甘蔗）。',
          '泡盛、Orion 啤酒周邊、海葡萄（海ぶどう）、雪鹽（ぬちまーす）。',
          '牧志公設市場：1 樓買海鮮、2 樓食堂可代客料理（需另付料理費）。',
        ],
      },
      AGU_PORK,
      {
        title: '備選景點：泊港漁市場（泊いゆまち）',
        bullets: [
          '那霸在地漁市場，海鮮丼與生魚片便宜新鮮，多為早上～傍晚營業。',
          '若 10:00 波上宮行程提早結束，可順路前往（車程約 5–10 分鐘）。',
        ],
        links: [map('泊いゆまち')],
      },
      {
        title: '市區交通',
        bullets: [
          '波上宮、波之上海灘可由國際通步行（約 20 分鐘）或搭計程車（約 10 分鐘）。',
          '泊港漁市場（泊いゆまち）位於那霸港旁，近單軌「美榮橋站」。',
          '單軌電車（ゆいレール）單程 230–370 日圓，可買一日券（800 日圓）。',
        ],
      },
    ],
  },
  {
    id: 5,
    date: '2026-10-09',
    title: '那霸 → 桃園（賦歸）',
    area: '那霸 → 桃園',
    stay: '—',
    entries: [
      { time: '07:30', kind: 'food', title: '吃早餐', detail: '飯店早餐。' },
      {
        time: '08:30',
        kind: 'transport',
        title: '退房，搭乘單軌電車（輕軌）前往機場',
        detail:
          '由「縣廳前站」搭 ゆいレール 至「那霸機場站」，車程約 13 分鐘、290 日圓。有行李建議避開通勤尖峰。',
        links: [map('県庁前駅 ゆいレール'), map('那覇空港駅')],
      },
      {
        time: '09:20',
        kind: 'flight',
        title: '抵達那霸機場',
        detail:
          '國際線請至 3 樓航空公司櫃檯辦理報到與託運行李，再至 2 樓安檢、出境。建議預留 2 小時以上。',
        links: [map('那覇空港')],
      },
      {
        time: '11:50',
        kind: 'flight',
        title: '中華航空起飛（那霸 → 桃園）',
        detail: '表訂時間為日本時間。',
      },
      {
        time: '12:25',
        kind: 'flight',
        title: '抵達桃園機場',
        detail: '表訂時間為台灣時間。那霸比台灣快 1 小時，所以回程表定時間看起來很短。',
        links: [map('桃園國際機場')],
      },
      {
        time: '—',
        kind: 'note',
        title: '期待下次沖繩之旅 🎉',
        detail: '記得檢查免稅品、行李重量與伴手禮是否都帶齊。',
      },
    ],
    transit: [
      {
        role: '上車',
        name: '縣廳前站（ゆいレール）',
        detail: '08:30 退房後出發，往那霸機場方向。',
        query: '県庁前駅 ゆいレール',
      },
      {
        role: '下車',
        name: '那霸機場站（ゆいレール）',
        detail: '車程約 13 分鐘｜290 日圓。2 樓出口直通機場。',
        query: '那覇空港駅 ゆいレール',
      },
      {
        role: '抵達',
        name: '那霸機場 3 樓 報到櫃檯',
        detail: '09:20 抵達。辦理報到與託運行李，再至 2 樓安檢、出境。',
        query: '那覇空港',
      },
      {
        role: '出發',
        name: '那霸機場 國際線',
        detail: '11:50 中華航空起飛（日本時間）。',
        query: '那覇空港 国際線ターミナル',
      },
      {
        role: '抵達',
        name: '桃園國際機場',
        detail: '12:25 抵達（台灣時間）。',
        query: '桃園國際機場',
      },
    ],
    refs: [
      {
        title: '那霸機場出境流程',
        bullets: [
          '先至 3 樓航空公司櫃檯辦理報到與託運行李，領取登機證後再到 2 樓安檢與出境區。',
          '安檢需取出電子設備、金屬物品與液體（每瓶不超過 100ml、總量不超過 1 公升）。',
          '完成出境審查後確認登機門，留意現場廣播與電子看板是否有異動。',
        ],
      },
      {
        title: '單軌電車（ゆいレール）',
        rows: [
          { k: '縣廳前 → 那霸機場', v: '約 13 分鐘｜290 日圓（兒童 150 日圓）' },
          { k: '首班車', v: '約 06:00 起發車（依各站公告為準）' },
          { k: '付款方式', v: '可用現金、OKICA、Suica／ICOCA 等 IC 卡' },
        ],
        links: [{ label: 'ゆいレール 官網', url: 'https://www.yui-rail.co.jp/' }],
      },
      {
        title: '回程打包提醒',
        bullets: [
          '液體、果醬、酒類請放託運行李；行動電源與鋰電池必須手提。',
          '免稅品（含菸酒）注意台灣入境免稅額度：酒 1 公升、菸 200 支。',
        ],
      },
    ],
  },
];
