import { Component, inject, OnInit } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { APP_SERVICE } from './app.service';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { NavBar } from './components/UI/nav_bar/nav_bar.component';
import { MenuPage } from './pages/menu/menu.page';
import { ErrorBar } from './components/UI/error_bar/error_bar.component';
import { TransactionTypeChooseBubble } from './components/forms/transactions_type_choose_bubble/transactions_type_choose_bubble.component';
import { ScrollSideOptions } from './components/embeddable_components/scroll_side_options/scroll_side_options.component';
import { TransactionBar } from './components/single_components/transaction_bar/transaction_bar.component';
import { FadeInPageAnimation, SlideToLeftPageAnimation, SlideToRightPageAnimation } from './util/animation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBar,
    MenuPage,
    ErrorBar,
    TransactionTypeChooseBubble,
    ScrollSideOptions,
    TransactionBar
  ],
  template: `
    <div [@ROUTE_ANIMATION]="getRouteAnimationData()">
      <router-outlet />
    </div>
    <nav_bar />
    <menu_page />
    <error_bar />
  `,
  styles: `
    scroll_side_options {
      width: 91.34vw;
    }
  `,
  animations: [
    trigger('ROUTE_ANIMATION', [
      // ** FADE */
      transition('boot => *, home <=> transactions_list, home <=> accounts_list, accounts_list <=> transactions_list', FadeInPageAnimation),

      //** SLIDE TO LEFT */
      transition('accounts_list => add_account, home => add_transaction, transactions_list => add_transaction', SlideToLeftPageAnimation),

      //** SLIDE TO RIGHT */
      transition('add_account => accounts_list, add_transaction => home, add_transaction => transactions_list', SlideToRightPageAnimation),
    ])
  ]
})
export class AppComponent implements OnInit {
  readonly APP = inject(APP_SERVICE)
  private readonly contexts = inject(ChildrenOutletContexts)

  ngOnInit(): void {
    this.APP.startApp()
  }

  protected getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['page_name'];
  }
}
