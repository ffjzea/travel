import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHRASES, PLACE_GROUPS } from '../../places-data';
import {
  AIRPORT_GUIDE,
  DAYS,
  DayPlan,
  EntryKind,
  Photo,
  RefBlock,
  TransitStop,
  mapsUrl,
} from '../../trip-data';

/** tab 識別：數字代表第幾天，其餘為資訊頁 */
export type TabId = number | 'airport' | 'places';

/** 取本地時區的 YYYY-MM-DD（避免 toISOString 的 UTC 偏移問題） */
function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

const WEEKDAY = ['日', '一', '二', '三', '四', '五', '六'];

@Component({
  selector: 'app-trip',
  imports: [RouterLink],
  templateUrl: './trip.html',
})
export class TripPage {
  readonly days = DAYS;
  readonly airport = AIRPORT_GUIDE;
  readonly placeGroups = PLACE_GROUPS;
  readonly phrases = PHRASES;

  /** 今天的日期（本地時區） */
  readonly todayISO = toISODate(new Date());

  /** 今天落在行程的第幾天；-1 表示不在旅程區間內 */
  readonly todayIndex = DAYS.findIndex((d) => d.date === this.todayISO);

  /** 目前選取的 tab */
  readonly activeTab = signal<TabId>(this.resolveInitialTab());

  readonly isAirport = computed(() => this.activeTab() === 'airport');

  readonly isPlaces = computed(() => this.activeTab() === 'places');

  readonly activeDay = computed<DayPlan>(
    () => DAYS.find((d) => d.id === this.activeTab()) ?? DAYS[0],
  );

  /** 目前要顯示的參考資訊區塊 */
  readonly activeRefs = computed<RefBlock[]>(() => {
    if (this.isAirport()) return this.airport.refs;
    if (this.isPlaces()) return [];
    return this.activeDay().refs;
  });

  /** 目前要顯示的搭車資訊 */
  readonly activeTransit = computed<TransitStop[]>(() => {
    if (this.isAirport()) return this.airport.transit;
    if (this.isPlaces()) return [];
    return this.activeDay().transit;
  });

  mapUrl(query: string): string {
    return mapsUrl(query);
  }

  /** 行程是否已開始／進行中／已結束 */
  readonly tripStatus = computed<'before' | 'during' | 'after'>(() => {
    if (this.todayIndex >= 0) return 'during';
    return this.todayISO < DAYS[0].date ? 'before' : 'after';
  });

  /** 距出發天數（僅在出發前有意義） */
  readonly daysToGo = computed<number | null>(() => {
    if (this.tripStatus() !== 'before') return null;
    const diff = parseISODate(DAYS[0].date).getTime() - parseISODate(this.todayISO).getTime();
    return Math.round(diff / 86_400_000);
  });

  readonly hasToday = this.todayIndex >= 0;

  /** 圖片放大檢視 */
  readonly lightbox = signal<Photo | null>(null);

  openPhoto(photo: Photo): void {
    this.lightbox.set(photo);
  }

  closePhoto(): void {
    this.lightbox.set(null);
  }

  readonly icons: Record<EntryKind, string> = {
    flight: '✈️',
    transport: '🚌',
    hotel: '🏨',
    food: '🍽️',
    sight: '📍',
    shopping: '🛍️',
    note: '📝',
  };

  /* ---------------------------------------------------------------- */

  dateLabel(day: DayPlan): string {
    const d = parseISODate(day.date);
    return `${d.getMonth() + 1}/${d.getDate()}（${WEEKDAY[d.getDay()]}）`;
  }

  /** tab 專用的精簡日期，例如 10/5 */
  shortDate(day: DayPlan): string {
    const d = parseISODate(day.date);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  isToday(day: DayPlan): boolean {
    return day.date === this.todayISO;
  }

  select(id: TabId): void {
    this.activeTab.set(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('day', String(id));
      window.history.replaceState({}, '', url);
    }
  }

  goToToday(): void {
    if (this.todayIndex >= 0) this.select(DAYS[this.todayIndex].id);
  }

  /** 前一天／後一天（僅在日期 tab 之間移動） */
  step(delta: number): void {
    const i = DAYS.findIndex((d) => d.id === this.activeTab());
    if (i < 0) return;
    const next = DAYS[i + delta];
    if (next) this.select(next.id);
  }

  readonly isFirst = computed(() => this.activeTab() === DAYS[0].id);
  readonly isLast = computed(() => this.activeTab() === DAYS[DAYS.length - 1].id);

  /* ---------------------------------------------------------------- */

  private resolveInitialTab(): TabId {
    const fromUrl = this.tabFromUrl();
    if (fromUrl !== null) return fromUrl;
    if (this.todayIndex >= 0) return DAYS[this.todayIndex].id;
    // 今天不在旅程區間內 → 從第一天開始看
    return DAYS[0].id;
  }

  /** 支援 ?day=2、?day=airport 或 ?day=places 直接開啟指定 tab（方便分享） */
  private tabFromUrl(): TabId | null {
    if (typeof window === 'undefined') return null;
    const raw = new URLSearchParams(window.location.search).get('day');
    if (!raw) return null;
    if (raw === 'airport' || raw === 'places') return raw;
    const id = Number(raw);
    return DAYS.some((d) => d.id === id) ? id : null;
  }
}
