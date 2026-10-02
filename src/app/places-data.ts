/**
 * 重要地點 中英日對照表
 *
 * 用途：旅途中直接拿給司機、店員或路人看。
 * `query` 是 Google Maps 查詢字串（用日文原名查最準）。
 */

export interface TriRow {
  zh: string;
  en: string;
  ja: string;
}

export interface PlaceRow extends TriRow {
  query?: string;
}

export interface PlaceGroup {
  id: string;
  icon: string;
  title: string;
  rows: PlaceRow[];
}

export const PLACE_GROUPS: PlaceGroup[] = [
  {
    id: 'stay',
    icon: '🏨',
    title: '住宿',
    rows: [
      {
        zh: '沖繩坎帕納船飯店',
        en: 'Vessel Hotel Campana Okinawa',
        ja: 'ベッセルホテルカンパーナ沖縄',
        query: 'ベッセルホテルカンパーナ沖縄',
      },
      {
        zh: 'JR 九州飯店 Blossom 那霸',
        en: 'JR Kyushu Hotel Blossom Naha',
        ja: 'JR九州ホテル ブラッサム那覇',
        query: 'JR九州ホテル ブラッサム那覇',
      },
    ],
  },
  {
    id: 'transit',
    icon: '🚌',
    title: '機場與交通',
    rows: [
      { zh: '那霸機場', en: 'Naha Airport', ja: '那覇空港', query: '那覇空港' },
      {
        zh: '國際線航廈',
        en: 'International Terminal',
        ja: '国際線ターミナル',
        query: '那覇空港 国際線ターミナル',
      },
      {
        zh: '國內線航廈',
        en: 'Domestic Terminal',
        ja: '国内線ターミナル',
        query: '那覇空港 国内線ターミナル',
      },
      {
        zh: '公車站 ⑤（TK05 上車處）',
        en: 'Bus Stop 5 (TK05)',
        ja: 'バス乗り場 ⑤',
        query: '那覇空港 バス乗り場 5番',
      },
      {
        zh: '1 號乘車口（利木津巴士）',
        en: 'Bus Stop 1 (Limousine Bus)',
        ja: 'バス乗り場 ①',
        query: '那覇空港 バス乗り場 1番',
      },
      {
        zh: '計程車乘車處',
        en: 'Taxi Stand',
        ja: 'タクシー乗り場',
        query: '那覇空港 タクシー乗り場',
      },
      {
        zh: '單軌電車 那霸機場站',
        en: 'Yui Rail Naha Airport Station',
        ja: 'ゆいレール 那覇空港駅',
        query: 'ゆいレール 那覇空港駅',
      },
      {
        zh: '單軌電車 縣廳前站',
        en: 'Yui Rail Kencho-mae Station',
        ja: 'ゆいレール 県庁前駅',
        query: 'ゆいレール 県庁前駅',
      },
      {
        zh: '單軌電車 牧志站',
        en: 'Yui Rail Makishi Station',
        ja: 'ゆいレール 牧志駅',
        query: 'ゆいレール 牧志駅',
      },
      {
        zh: '北谷 GATEWAY',
        en: 'Chatan Gateway',
        ja: '北谷ゲートウェイ',
        query: '北谷ゲートウェイ',
      },
      {
        zh: '國際通入口（巴士站）',
        en: 'Kokusai-dori Entrance (Bus Stop)',
        ja: '国際通り入口（バス停）',
        query: '国際通り入口 バス停',
      },
    ],
  },
  {
    id: 'sight',
    icon: '📍',
    title: '景點',
    rows: [
      {
        zh: '美國村',
        en: 'American Village',
        ja: '美浜アメリカンビレッジ',
        query: '美浜アメリカンビレッジ',
      },
      {
        zh: '北谷公園日落海灘',
        en: 'Chatan Park Sunset Beach',
        ja: '北谷公園サンセットビーチ',
        query: '北谷公園サンセットビーチ',
      },
      {
        zh: '國際通',
        en: 'Kokusai-dori (International Street)',
        ja: '国際通り',
        query: '国際通り 那覇',
      },
      {
        zh: '牧志公設市場',
        en: 'Makishi Public Market',
        ja: '牧志公設市場',
        query: '牧志公設市場',
      },
      {
        zh: 'DMM かりゆし水族館',
        en: 'DMM Kariyushi Aquarium',
        ja: 'DMMかりゆし水族館',
        query: 'DMMかりゆし水族館',
      },
      {
        zh: 'IIAS 沖繩豐崎購物中心',
        en: 'IIAS Okinawa Toyosaki',
        ja: 'イーアス沖縄豊崎',
        query: 'イーアス沖縄豊崎',
      },
      {
        zh: '瀨長島 海香露台',
        en: 'Senagajima Umikaji Terrace',
        ja: '瀬長島ウミカジテラス',
        query: '瀬長島ウミカジテラス',
      },
      { zh: '波上宮', en: 'Naminoue Shrine', ja: '波上宮', query: '波上宮' },
      { zh: '波之上海灘', en: 'Naminoue Beach', ja: '波の上ビーチ', query: '波の上ビーチ' },
      {
        zh: '泊港漁市場',
        en: 'Tomari Iyumachi Fish Market',
        ja: '泊いゆまち',
        query: '泊いゆまち',
      },
    ],
  },
  {
    id: 'food',
    icon: '🍽️',
    title: '餐廳',
    rows: [
      {
        zh: '琉球的牛 北谷店',
        en: 'Ryukyu no Ushi (Chatan)',
        ja: '琉球の牛 北谷店',
        query: '琉球の牛 北谷店',
      },
      {
        zh: '暖暮拉麵',
        en: 'Danbo Ramen',
        ja: '暖暮ラーメン',
        query: '暖暮ラーメン 牧志店',
      },
      {
        zh: '豬肉蛋飯糰（POTAMA）',
        en: 'Pork Tamago Onigiri (Potama)',
        ja: 'ポーたま',
        query: 'ポーたま 那覇空港店',
      },
      {
        zh: '88 牛排 國際通店',
        en: 'Steak House 88 (Kokusai-dori)',
        ja: 'ステーキハウス88 国際通り店',
        query: 'ステーキハウス88 国際通り店',
      },
    ],
  },
  {
    id: 'shop',
    icon: '🛍️',
    title: '購物',
    rows: [
      {
        zh: '永旺 北谷店',
        en: 'AEON Chatan',
        ja: 'イオン北谷店',
        query: 'イオン北谷店',
      },
      {
        zh: 'Blue Seal 冰淇淋',
        en: 'Blue Seal Ice Cream',
        ja: 'ブルーシールアイスクリーム',
        query: 'ブルーシールアイスクリーム 国際通り',
      },
      {
        zh: '唐吉訶德 國際通店',
        en: 'Don Quijote Kokusai-dori',
        ja: 'ドン・キホーテ 国際通り店',
        query: 'ドン・キホーテ 国際通り店',
      },
    ],
  },
];

/** 實用短句：可直接指給對方看 */
export const PHRASES: TriRow[] = [
  { zh: '請載我到這裡', en: 'Please take me here.', ja: 'ここまでお願いします' },
  { zh: '請在這裡停車', en: 'Please stop here.', ja: 'ここで止めてください' },
  { zh: '多少錢？', en: 'How much is it?', ja: 'いくらですか？' },
  { zh: '可以刷卡嗎？', en: 'Do you accept credit cards?', ja: 'カードは使えますか？' },
  { zh: '請給我收據', en: 'Could I have a receipt?', ja: '領収書をお願いします' },
  { zh: '兩位大人、一位小孩', en: 'Two adults and one child.', ja: '大人2名、子供1名' },
  { zh: '洗手間在哪裡？', en: 'Where is the restroom?', ja: 'トイレはどこですか？' },
  { zh: '不好意思', en: 'Excuse me.', ja: 'すみません' },
  { zh: '謝謝', en: 'Thank you.', ja: 'ありがとうございます' },
];
