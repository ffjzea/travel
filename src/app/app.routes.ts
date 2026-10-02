import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/trip/trip').then((m) => m.TripPage),
    title: '沖繩家族旅行 · 五天四夜行程',
  },
  {
    path: 'packing',
    loadComponent: () => import('./pages/packing/packing').then((m) => m.PackingPage),
    title: '行李打包清單 · 沖繩家族旅行',
  },
  {
    path: 'shopping',
    loadComponent: () => import('./pages/shopping/shopping').then((m) => m.ShoppingPage),
    title: '採買指南 · 沖繩家族旅行',
  },
  { path: '**', redirectTo: '' },
];
