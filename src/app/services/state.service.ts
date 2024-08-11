import { Injectable } from "@angular/core";
import { NavBarButtonOptions } from "../components/nav_bar/nav_bar.component";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class APP_STATE {
    nav_bar_left_button_option$ = new BehaviorSubject<NavBarButtonOptions | null>(null)
    nav_bar_right_button_option$ = new BehaviorSubject<NavBarButtonOptions | null>(null)
    nav_bar_right_button_clicked$ = new Subject<void>()
}