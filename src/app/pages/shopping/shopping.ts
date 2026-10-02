import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONVENIENCE, DAY_SHOPPING, SHOP_TIPS, SOUVENIRS } from '../../shopping-data';

@Component({
  selector: 'app-shopping',
  imports: [RouterLink],
  templateUrl: './shopping.html',
})
export class ShoppingPage {
  readonly convenience = CONVENIENCE;
  readonly dayShopping = DAY_SHOPPING;
  readonly souvenirs = SOUVENIRS;
  readonly tips = SHOP_TIPS;

  readonly totalItems =
    CONVENIENCE.reduce((n, g) => n + g.items.length, 0) +
    DAY_SHOPPING.reduce((n, d) => n + d.buy.length, 0) +
    SOUVENIRS.length;
}
