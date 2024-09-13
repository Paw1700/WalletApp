import { animate, animateChild, group, query, stagger, style, transition, trigger } from "@angular/animations";
import { Component, inject, OnInit } from "@angular/core";
import { APP_SERVICE } from "../../app.service";
import { AppLocationListItem } from "../../models";
import { NavBarButtonOptions } from "../../components/UI/nav_bar/nav_bar.component";

@Component({
    selector: 'menu_page',
    standalone: true,
    templateUrl: './menu.page.html',
    styleUrl: './menu.page.scss',
    animations: [
        trigger('PAGE', [
            transition(':enter', [
                style({
                    opacity: 0
                }),
                group([
                    animate('300ms ease-out', style({
                        opacity: 1
                    })),
                    query("@LIST_OF_LOCATIONS", animateChild())
                ])
            ]),
            transition(':leave', [
                animate('100ms ease-in', style({
                    opacity: 0
                })),
            ])
        ]),
        trigger('LIST_OF_LOCATIONS', [
            transition(':enter', [
                query(":enter", [
                    style({
                        position: 'relative',
                        left: '-100vw'
                    }),
                    stagger(100, [
                        animate('200ms cubic-bezier(.7,.6,.4,1)', style({
                            left: 0
                        }))
                    ])
                ])
            ])
        ])
    ]
})
export class MenuPage implements OnInit {
    readonly APP = inject(APP_SERVICE)

    show_page = false
    app_locations: AppLocationListItem[] = [
        { name: 'Strona główna', active: true },
        { name: 'Transakcje', active: false},
        { name: 'Konta', active: false },
        { name: 'Kredyty', active: false },
        { name: 'Giełda', active: false },
        { name: 'Statystyka', active: false },
        { name: 'Ustawienia', active: false }
    ]
    private right_button_last_state: NavBarButtonOptions | null = null

    ngOnInit(): void {
        this.resetAppLocationList()
        this.listenToMenuPageShowState()
        this.listenToAppLocationState()
    }

    changeAppLocation(location_number: number) {
        switch (location_number) {
            case 0:
                this.APP.navigate('home')
                break
            case 1:
                this.APP.navigate('transactions_list')
                break
            case 2:
                this.APP.navigate('accounts_list')
                break
            default:
                this.APP.navigate('home') 
                break
        }
        this.show_page = false
    }

    private listenToMenuPageShowState() {
        this.APP.STATE.nav_bar_left_button_clicked$.subscribe(() => {
            if (this.APP.APPERANCE.nav_bar_left_button_option$.value === 'menu' && !this.show_page) {
                this.showMenuPage()
            } else if (this.APP.APPERANCE.nav_bar_left_button_option$.value === 'arrow_left' && this.show_page) {
                this.hideMenuPage()
            }
        })
    }

    private listenToAppLocationState() {
        this.APP.STATE.app_current_location$.subscribe(location => {
            this.resetAppLocationList()
            switch (location) {
                case "home":
                    this.app_locations[0].active = true
                    break
                case 'transactions_list':
                    this.app_locations[1].active = true
                    break
                case 'accounts_list':
                    this.app_locations[2].active = true
                    break
            }
        })
    }

    private resetAppLocationList() {
        this.app_locations.forEach(location => location.active = false)
    }

    private showMenuPage() {
        this.show_page = true
        this.APP.APPERANCE.nav_bar_left_button_option$.next('arrow_left')
        this.right_button_last_state = this.APP.APPERANCE.nav_bar_right_button_option$.value
        this.APP.APPERANCE.nav_bar_right_button_option$.next(null)
    }

    private hideMenuPage() {
        this.show_page = false
        this.APP.APPERANCE.nav_bar_left_button_option$.next('menu')
        this.APP.APPERANCE.nav_bar_right_button_option$.next(this.right_button_last_state)
    }
}

