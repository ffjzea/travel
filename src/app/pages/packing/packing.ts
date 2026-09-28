import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PACKING_GROUPS, PACKING_RULES, PACKING_TIPS } from '../../packing-data';

const STORAGE_KEY = 'okinawa-packing-v1';

@Component({
  selector: 'app-packing',
  imports: [RouterLink],
  templateUrl: './packing.html',
})
export class PackingPage {
  readonly groups = PACKING_GROUPS;
  readonly rules = PACKING_RULES;
  readonly tips = PACKING_TIPS;

  readonly total = PACKING_GROUPS.reduce((n, g) => n + g.items.length, 0);

  private readonly checked = signal<ReadonlySet<string>>(loadChecked());

  readonly checkedCount = computed(() => this.checked().size);

  readonly percent = computed(() =>
    this.total === 0 ? 0 : Math.round((this.checkedCount() / this.total) * 100),
  );

  readonly allDone = computed(() => this.total > 0 && this.checkedCount() === this.total);

  isChecked(id: string): boolean {
    return this.checked().has(id);
  }

  groupChecked(groupId: string): number {
    const g = PACKING_GROUPS.find((x) => x.id === groupId);
    if (!g) return 0;
    const set = this.checked();
    return g.items.reduce((n, item) => n + (set.has(item.id) ? 1 : 0), 0);
  }

  toggle(id: string): void {
    const next = new Set(this.checked());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.commit(next);
  }

  checkAll(): void {
    this.commit(new Set(PACKING_GROUPS.flatMap((g) => g.items.map((i) => i.id))));
  }

  clearAll(): void {
    this.commit(new Set());
  }

  private commit(next: Set<string>): void {
    this.checked.set(next);
    saveChecked(next);
  }
}

function loadChecked(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((x): x is string => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

function saveChecked(set: ReadonlySet<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // 無痕模式或空間不足時忽略
  }
}
