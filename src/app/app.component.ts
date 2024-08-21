import { Component, inject, OnInit } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { APP_SERVICE } from './app.service';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { NavBar, NavBarButtonOptions } from './components/nav_bar/nav_bar.component';
import { MenuPage } from './pages/menu/menu.page';
import { ErrorBar } from './components/error_bar/error_bar.component';

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
  animations: [
    trigger('ROUTE_ANIMATION', [
      // ** FADE */
      transition('boot => *', [
        group([
          query(":enter", [
            style({ zIndex: 1, opacity: 0 }),
            animate('350ms ease-out', style({
              opacity: 1
            }))
          ], { optional: true }),
          query(":leave", [
            style({ zIndex: 2, opacity: 1 }),
            animate('350ms ease-in', style({
              opacity: 0
            }))
          ], { optional: true })
        ])
      ]),

      //** SLIDE TO LEFT */
      transition('accounts_list => add_account, home => add_transaction',[
        group([
          query(":enter", [
            style({ position: 'absolute', left: '100vw', zIndex: 2 }),
            animate('350ms linear', style({
              left: 0
            }))
          ], { optional: true }),
          query(":leave", [
            style({ zIndex: 1, position: 'absolute', left: 0, opacity: 1}),
            animate('350ms linear', style({
              left: '-100vw',
              opacity: 0
            }))
          ], { optional: true })
        ])
      ]),

      //** SLIDE TO RIGHT */
      transition('add_account => accounts_list, add_transaction => home',[
        group([
          query(":enter", [
            style({ zIndex: 1, position: 'absolute', left: '-100vw'}),
            animate('350ms linear', style({
              left: 0
            }))
          ], { optional: true }),
          query(":leave", [
            style({ zIndex: 2, position: 'absolute', left: 0, opacity: 1 }),
            animate('350ms linear', style({
              left: '100vw',
              opacity: 0
            }))
          ], { optional: true })
        ])
      ]),
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
