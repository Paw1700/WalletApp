import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { AppLocations } from "../models";

@Injectable()
export class APP_STATE {
    nav_bar_left_button_clicked$ = new Subject<void>()
    nav_bar_right_button_clicked$ = new Subject<void>()
    app_current_location$ = new BehaviorSubject<AppLocations>('bootstrap')
}