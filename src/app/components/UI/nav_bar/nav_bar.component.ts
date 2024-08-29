import { Component, EventEmitter, inject, OnInit } from "@angular/core";
import { OvalButton } from "./components/oval_button.component";
import { RectangleButton } from "./components/rectangle_button.component";
import { APP_SERVICE } from "../../../app.service";

@Component({
    selector: 'nav_bar',
    standalone: true,
    imports: [
        OvalButton,
        RectangleButton
    ],
    templateUrl: './nav_bar.component.html',
    styleUrl: './nav_bar.component.scss'
})
export class NavBar implements OnInit{
    readonly APP = inject(APP_SERVICE)

    left_side: NavBarButtonOptions | null = null
    right_side: NavBarButtonOptions | null = null

    ngOnInit(): void {
        this.listenToNavBarState()
    }

    left_button_clicked() {
        this.APP.STATE.nav_bar_left_button_clicked$.next()
    }

    right_button_clicked() {
        this.APP.STATE.nav_bar_right_button_clicked$.next()
    }

    private listenToNavBarState() {
        this.APP.APPERANCE.nav_bar_left_button_option$.subscribe(state => {
            this.left_side = state
        })
        this.APP.APPERANCE.nav_bar_right_button_option$.subscribe(state => {
            this.right_side = state
        })
    }
}

export type NavBarButtonOptions = 'arrow_left' | 'arrow_right' | 'menu' | 'add_transaction' | 'add_account' | 'save'