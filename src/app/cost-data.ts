/**
 * 花費估算
 *
 * 估算基準：4 大 1 小（小孩以兒童票或半價估算）
 * 不含：機票、住宿（已訂）、購物伴手禮
 *
 * 餐點價格來源：各店菜單／官網公告（2026/10 查詢，税込），實際依現場為準。
 */

export type CostKind = 'food' | 'ticket' | 'transport' | 'other';

/** 餐廳的單一餐點 */
export interface CostItem {
  name: string;
  /** 單價說明，例如「¥390 × 4」 */
  note?: string;
  jpy: number;
}

export interface CostRow {
  label: string;
  detail?: string;
  kind: CostKind;
  /** 該項目「全家」的日幣總額 */
  jpy: number;
  /** 餐廳會列出實際餐點與單價 */
  items?: CostItem[];
}

export interface CostDay {
  day: number;
  title: string;
  rows: CostRow[];
}

/** 參考匯率：1 日圓 ≈ 0.202 台幣（2026/10 查詢，實際依換匯當下為準） */
export const JPY_TO_TWD = 0.202;
export const EXCHANGE_AS_OF = '2026 年 10 月';

export const COST_DAYS: CostDay[] = [
  {
    day: 1,
    title: '桃園 → 那霸 → 北谷',
    rows: [
      {
        label: '早餐／點心：POTAMA 豬肉蛋飯糰',
        detail: '那霸機場國內線 1F，帶上接駁車吃',
        kind: 'food',
        jpy: 2010,
        items: [
          { name: 'ポークたまごおにぎり（ノーマル）', note: '¥390 × 4', jpy: 1560 },
          { name: '明太マヨおにぎり', note: '¥450 × 1', jpy: 450 },
        ],
      },
      {
        label: 'TK05 北谷直行接駁',
        detail: '那霸機場 → 北谷 GATEWAY｜大人 ¥1,500 × 4 + 小孩 ¥800',
        kind: 'transport',
        jpy: 6800,
      },
      {
        label: '晚餐：琉球的牛 北谷店',
        detail: '燒肉 course（已訂位 4 大 1 小）',
        kind: 'food',
        jpy: 25420,
        items: [
          { name: '焼肉12種コース（焼きすき2種）', note: '¥5,980 × 4', jpy: 23920 },
          { name: '小孩單點（白飯、湯品等）', note: '約 ¥1,500', jpy: 1500 },
        ],
      },
      { label: '便利商店飲料零食', detail: '約 ¥1,000', kind: 'other', jpy: 1000 },
    ],
  },
  {
    day: 2,
    title: '北谷 → 國際通（那霸）',
    rows: [
      { label: '飯店早餐', detail: '含在房價', kind: 'food', jpy: 0 },
      {
        label: 'TK05 北谷 → 國際通',
        detail: '大人 ¥1,500 × 4 + 小孩 ¥800',
        kind: 'transport',
        jpy: 6800,
      },
      {
        label: '午餐：暖暮拉麵（那覇牧志店）',
        detail: '國際通排隊名店',
        kind: 'food',
        jpy: 4450,
        items: [
          { name: '豚骨ラーメン', note: '¥830 × 4', jpy: 3320 },
          { name: '味噌ラーメン（小孩）', note: '¥830 × 1', jpy: 830 },
          { name: '替玉', note: '¥150 × 2', jpy: 300 },
        ],
      },
      {
        label: '牧志市場／國際通小吃',
        detail: 'サーターアンダギー、海ぶどう、Blue Seal 等',
        kind: 'food',
        jpy: 1500,
      },
      {
        label: '晚餐：阿古豬涮涮鍋',
        detail: '島しゃぶしゃぶ NAKAMA／砂浜島黑豬／Ocean Boo!',
        kind: 'food',
        jpy: 19400,
        items: [
          { name: 'あぐー豚しゃぶしゃぶ course', note: '約 ¥4,400 × 4', jpy: 17600 },
          { name: '小孩單點（白飯、島野菜等）', note: '約 ¥1,800', jpy: 1800 },
        ],
      },
    ],
  },
  {
    day: 3,
    title: '國際通 → DMM 水族館 → 瀨長島',
    rows: [
      { label: '飯店早餐', detail: '含在房價', kind: 'food', jpy: 0 },
      {
        label: 'TK02 國際通入口 → IIAS',
        detail: '¥470 × 5（約 35–45 分鐘）',
        kind: 'transport',
        jpy: 2350,
      },
      {
        label: '門票：DMM かりゆし水族館',
        detail: '大人 ¥2,800 × 4 + 小人 ¥1,700 × 1（官網事前購票約 9 折）',
        kind: 'ticket',
        jpy: 12900,
      },
      {
        label: '午餐：IIAS 美食街',
        detail: 'イーアス沖縄豊崎，水族館同棟',
        kind: 'food',
        jpy: 4500,
        items: [
          { name: 'タコライス', note: '¥950 × 2', jpy: 1900 },
          { name: '沖縄そば', note: '¥900 × 2', jpy: 1800 },
          { name: 'キッズセット（小孩）', note: '¥800 × 1', jpy: 800 },
        ],
      },
      { label: 'TK02 IIAS → 瀨長島', detail: '¥190 × 5', kind: 'transport', jpy: 950 },
      {
        label: '瀨長島 ウミカジテラス 下午茶',
        detail: '看飛機起降、海景咖啡',
        kind: 'food',
        jpy: 4800,
        items: [
          { name: 'パンケーキ／スイーツ', note: '約 ¥1,200 × 3', jpy: 3600 },
          { name: 'ドリンク', note: '約 ¥600 × 2', jpy: 1200 },
        ],
      },
      {
        label: 'TK02 瀨長島 → 國際通',
        detail: '約 ¥500 × 5',
        kind: 'transport',
        jpy: 2500,
      },
    ],
  },
  {
    day: 4,
    title: '那霸市區：波上宮・國際通採買',
    rows: [
      { label: '飯店早餐', detail: '含在房價', kind: 'food', jpy: 0 },
      {
        label: '計程車 國際通 → 波上宮',
        detail: '約 ¥1,000 × 2（來回）；也可步行約 20 分鐘',
        kind: 'transport',
        jpy: 2000,
      },
      { label: '波上宮、波之上海灘', detail: '免費參拜／免費海灘', kind: 'ticket', jpy: 0 },
      {
        label: '午餐：國際通',
        detail: '沖繩麵／塔可飯等在地小吃',
        kind: 'food',
        jpy: 4600,
        items: [
          { name: '沖縄そば', note: '¥950 × 2', jpy: 1900 },
          { name: 'タコライス', note: '¥950 × 2', jpy: 1900 },
          { name: 'キッズセット（小孩）', note: '¥800 × 1', jpy: 800 },
        ],
      },
      {
        label: '晚餐：88 牛排 國際通店',
        detail: 'ステーキハウス88（國際通正中央）',
        kind: 'food',
        jpy: 11770,
        items: [
          { name: 'テンダーロインステーキ 200g', note: '¥3,410 × 2', jpy: 6820 },
          { name: 'カットステーキ', note: '¥1,650 × 3', jpy: 4950 },
        ],
      },
      { label: '便利商店／飲料', detail: '約 ¥1,000', kind: 'other', jpy: 1000 },
    ],
  },
  {
    day: 5,
    title: '那霸 → 桃園（賦歸）',
    rows: [
      { label: '飯店早餐', detail: '含在房價', kind: 'food', jpy: 0 },
      {
        label: 'ゆいレール 縣廳前 → 那霸機場',
        detail: '大人 ¥290 × 4 + 小人 ¥150（約 13 分鐘）',
        kind: 'transport',
        jpy: 1310,
      },
      {
        label: '機場輕食／伴手禮',
        detail: '那霸機場 3F 餐廳或便利商店',
        kind: 'food',
        jpy: 4600,
        items: [
          { name: '空港 軽食セット', note: '約 ¥1,000 × 4', jpy: 4000 },
          { name: '子供セット（小孩）', note: '約 ¥600 × 1', jpy: 600 },
        ],
      },
    ],
  },
];

/** 餐廳／門票價位參考（估價依據，皆為税込） */
export const MENU_REFS: { label: string; value: string }[] = [
  {
    label: '琉球的牛 北谷店',
    value: '燒肉 course：10 種 ¥4,980／12 種 ¥5,980／14 種 ¥6,980',
  },
  { label: '暖暮拉麵 那覇牧志店', value: '豚骨ラーメン ¥830、味噌ラーメン ¥830、替玉 ¥150' },
  { label: 'POTAMA 豬肉蛋飯糰', value: 'ポークたまごおにぎり ¥390〜、明太マヨ ¥450' },
  {
    label: 'ステーキハウス 88 國際通店',
    value: 'カットステーキ ¥1,650〜、赤身ステーキ 150g ¥2,365、テンダーロイン 200g ¥3,410',
  },
  {
    label: '阿古豬涮涮鍋（NAKAMA 等）',
    value: 'あぐー豚しゃぶしゃぶ course 約 ¥3,300–5,500／人（食べ放題 約 ¥4,700–5,500）',
  },
  {
    label: 'DMM かりゆし水族館',
    value: '大人 ¥2,800／中人 ¥2,200／小人 ¥1,700（官網事前購票約 9 折）',
  },
  { label: 'ゆいレール', value: '縣廳前 → 那霸機場 ¥290（小人 ¥150）／1 日券 ¥800' },
];

export const COST_NOTES: string[] = [
  '不含機票與住宿（已另外訂好），也不含購物與伴手禮。',
  '小孩票價以兒童票或半價估算，實際依現場公告為準。',
  '餐廳價格為菜單標價，實際會因加點、飲料、服務費而增加。',
  '巴士、牧志市場與部分小店只收現金，建議帶約 ¥60,000 現金（≈ NT$12,100），其餘刷卡。',
  '伴手禮／購物建議另備 ¥20,000–30,000（≈ NT$4,000–6,100）。',
  '若 Day 3 改搭計程車（海報版本）：飯店 → DMM 約 ¥2,000–2,500、IIAS → 瀨長島約 ¥1,000–1,500。',
  `匯率以 ${EXCHANGE_AS_OF} 的 1 日圓 ≈ ${JPY_TO_TWD} 台幣估算，實際依換匯當下為準。`,
];
