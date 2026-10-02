/**
 * 花費估算
 *
 * 估算基準：4 大 1 小（小孩以兒童票或半價估算）
 * 不含：機票、住宿（已訂）、購物伴手禮
 *
 * 價格來源：各餐廳菜單／官網公告（2026/10 查詢），實際依現場為準。
 */

export type CostKind = 'food' | 'ticket' | 'transport' | 'other';

export interface CostRow {
  label: string;
  detail?: string;
  kind: CostKind;
  /** 該項目「全家」的日幣總額 */
  jpy: number;
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
        label: 'POTAMA 豬肉蛋飯糰',
        detail: '機場國內線 1F，約 ¥500 × 5 個',
        kind: 'food',
        jpy: 2500,
      },
      {
        label: 'TK05 北谷直行接駁',
        detail: '那霸機場 → 北谷 GATEWAY｜大人 ¥1,500 × 4 + 小孩 ¥800',
        kind: 'transport',
        jpy: 6800,
      },
      {
        label: '晚餐：琉球的牛 北谷店',
        detail: '燒肉 course，大人約 ¥6,000 × 4 + 小孩 ¥2,000',
        kind: 'food',
        jpy: 26000,
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
        label: '午餐：暖暮拉麵',
        detail: '拉麵約 ¥900 × 4 + 小孩 ¥500',
        kind: 'food',
        jpy: 4100,
      },
      { label: '牧志市場／國際通小吃', detail: '約 ¥1,500', kind: 'food', jpy: 1500 },
      {
        label: '晚餐：阿古豬涮涮鍋',
        detail: 'course 約 ¥4,500 × 4 + 小孩 ¥1,500（島しゃぶしゃぶ NAKAMA 等）',
        kind: 'food',
        jpy: 19500,
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
        detail: '約 ¥1,200 × 4 + 小孩 ¥800',
        kind: 'food',
        jpy: 5600,
      },
      { label: 'TK02 IIAS → 瀨長島', detail: '¥190 × 5', kind: 'transport', jpy: 950 },
      {
        label: '瀨長島 ウミカジテラス 下午茶',
        detail: '鬆餅／飲料約 ¥1,200 × 4 + ¥600',
        kind: 'food',
        jpy: 5400,
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
      {
        label: '波上宮、波之上海灘',
        detail: '免費參拜／免費海灘',
        kind: 'ticket',
        jpy: 0,
      },
      {
        label: '午餐：國際通',
        detail: '約 ¥1,200 × 4 + 小孩 ¥800',
        kind: 'food',
        jpy: 5600,
      },
      {
        label: '晚餐：88 牛排 國際通店',
        detail: '約 ¥2,500 × 4 + 小孩 ¥1,200',
        kind: 'food',
        jpy: 11200,
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
        detail: '約 ¥1,000 × 4 + 小孩 ¥600',
        kind: 'food',
        jpy: 4600,
      },
    ],
  },
];

/** 餐廳／門票價位參考（估價依據） */
export const MENU_REFS: { label: string; value: string }[] = [
  { label: '琉球的牛 北谷店', value: '燒肉 course 約 ¥6,000–8,000／人（另有 ¥6,980 的燒肉 14 種 course）' },
  { label: '暖暮拉麵', value: '拉麵約 ¥800–950／碗' },
  { label: 'POTAMA 豬肉蛋飯糰', value: '約 ¥400–600／個' },
  { label: 'ステーキハウス 88 國際通店', value: '約 ¥2,000–3,000／人' },
  { label: '阿古豬涮涮鍋（NAKAMA 等）', value: 'course 約 ¥4,000–5,500／人' },
  {
    label: 'DMM かりゆし水族館',
    value: '大人 ¥2,800／中人 ¥2,200／小人 ¥1,700（官網事前購票約 9 折）',
  },
  { label: 'ゆいレール', value: '縣廳前 → 那霸機場 ¥290（小人 ¥150）／1 日券 ¥800' },
];

export const COST_NOTES: string[] = [
  '不含機票與住宿（已另外訂好），也不含購物與伴手禮。',
  '小孩票價以兒童票或半價估算，實際依現場公告為準。',
  '巴士、牧志市場與部分小店只收現金，建議帶約 ¥60,000 現金（≈ NT$12,100），其餘刷卡。',
  '伴手禮／購物建議另備 ¥20,000–30,000（≈ NT$4,000–6,100）。',
  '若 Day 3 改搭計程車（海報版本）：飯店 → DMM 約 ¥2,000–2,500、IIAS → 瀨長島約 ¥1,000–1,500。',
  `匯率以 ${EXCHANGE_AS_OF} 的 1 日圓 ≈ ${JPY_TO_TWD} 台幣估算，實際依換匯當下為準。`,
];
