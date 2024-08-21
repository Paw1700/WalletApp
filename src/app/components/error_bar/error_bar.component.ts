import { Component, inject, OnInit } from "@angular/core";
import { APP_SERVICE } from "../../app.service";
import { ErrorModel } from "../../models";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'error_bar',
    standalone: true,
    templateUrl: './error_bar.component.html',
    styleUrl: './error_bar.component.scss',
    animations: [
        trigger('bar', [
            transition(":enter", [
                style({
                    top: '-12.5vh'
                }),
                animate('300ms ease-out', style({
                    top: '2.5vh'
                }))
            ]),
            transition(':leave', [
                animate('300ms ease-in', style({
                    top: '-12.5vh'
                }))
            ])
        ])
    ]
})
export class ErrorBar implements OnInit{
    private APP = inject(APP_SERVICE)

    error_data: ErrorModel | null = null
    bar_color: 'red' | 'orange' | 'blue' = 'red' 

    ngOnInit(): void {
        this.APP.STATE.error_data$.subscribe( data => {
            if (data) {
                switch(data.type) {
                    case "FATAL":
                        this.bar_color = 'red'
                        break
                    case "MAIN":
                        this.bar_color = 'orange'
                        break
                    case "MINOR":
                        this.bar_color = 'blue'
                        break
                } 
            }
            this.error_data = data
        })
    }
}