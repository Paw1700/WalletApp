import { Component, inject, OnInit } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { APP_SERVICE } from './app.service';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { NavBar, NavBarButtonOptions } from './components/nav_bar/nav_bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBar
  ],
  template: `
    <div [@ROUTE_ANIMATION]="getRouteAnimationData()">
      <router-outlet />
    </div>
    <nav_bar [left_side]="nav_bar_left_option" (left_button_clicked)="navBarLeftButtonClicked()" [right_side]="nav_bar_right_option" (right_button_clicked)="navBarRightButtonClicked()" />
  `,
  animations: [
    trigger('ROUTE_ANIMATION', [
      transition('boot => *', [
        group([
          query(":enter", [
            style({ zIndex: 1, opacity: 0 }),
            animate('350ms ease-out', style({
              opacity: 1
            }))
          ]),
          query(":leave", [
            style({ zIndex: 2, opacity: 1 }),
            animate('350ms ease-in', style({
              opacity: 0
            }))
          ], { optional: true })
        ])
      ])
    ])
  ] 
})
export class AppComponent implements OnInit {
  readonly APP = inject(APP_SERVICE)
  private readonly contexts = inject(ChildrenOutletContexts)

  nav_bar_left_option: NavBarButtonOptions | null = null
  nav_bar_right_option: NavBarButtonOptions | null = null

  ngOnInit(): void {
    this.APP.startApp()
    this.APP.STATE.nav_bar_left_button_option$.subscribe(state => {
      this.nav_bar_left_option = state
    })
    this.APP.STATE.nav_bar_right_button_option$.subscribe(state => {
      this.nav_bar_right_option = state
    })
  }

  navBarLeftButtonClicked() {
    // this.APP.STATE.
  }

  navBarRightButtonClicked() {
    this.APP.STATE.nav_bar_right_button_clicked$.next()
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['page_name'];
  }
}
