import { Component, Input } from "@angular/core";
import { OvalButton } from "./components/oval_button.component";
import { RectangleButton } from "./components/rectangle_button.component";

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
export class NavBar {
    @Input() left_side: NavBarButtonOptions = 'arrow_left'
    @Input() right_side: NavBarButtonOptions = 'save'
}

export type NavBarButtonOptions = 'arrow_left' | 'arrow_right' | 'menu' | 'add_transaction' | 'add_account' | 'save'