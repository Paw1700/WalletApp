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
import { SideOptionsComponent, SideOptionsComponentData } from './components/embeddable_components/side_options/side_options.component';
import { SLIDE_TO_LEFT_ANIMATION_PAGES, SLIDE_TO_RIGHT_ANIMATION_PAGES } from './constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBar,
    MenuPage,
    ErrorBar
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
  `,
  animations: [
    trigger('ROUTE_ANIMATION', [
      // ** FADE */
      transition('boot => *, home <=> transactions_list, home <=> accounts_list, accounts_list <=> transactions_list', FadeInPageAnimation),

      //** SLIDE TO LEFT */
      transition(SLIDE_TO_LEFT_ANIMATION_PAGES, SlideToLeftPageAnimation),

      //** SLIDE TO RIGHT */
      transition(SLIDE_TO_RIGHT_ANIMATION_PAGES, SlideToRightPageAnimation),
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
