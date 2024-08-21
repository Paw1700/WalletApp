import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { AppLocations, ErrorModel } from "../models";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class APP_STATE {
    nav_bar_left_button_clicked$ = new Subject<void>()
    nav_bar_right_button_clicked$ = new Subject<void>()
    app_current_location$ = new BehaviorSubject<AppLocations>('bootstrap')
    error_data$ = new BehaviorSubject<ErrorModel | null>(null)

    private error_list: ErrorModel[] = []

    constructor(private HTTP: HttpClient) {
        this.HTTP.get<ErrorModel[]>('/assets/data/errors.json').subscribe( err_list => {
            this.error_list = err_list
        })
    }

    errorHappend(error_id: string) {
        const err = this.error_list.filter(e => e.id === error_id)[0]
        
        this.error_data$.next(err)

        setTimeout(() => {
            this.error_data$.next(null)
        }, 2000)
    }
}