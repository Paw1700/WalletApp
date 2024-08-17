import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OpenAbleComponent } from "../../interfaces/openable.component";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
    selector: 'date_choose_bar',
    standalone: true,
    templateUrl: './date_choose_bar.component.html',
    styleUrl: './date_choose_bar.component.scss',
    animations: [
        trigger('badge', [
            transition(":enter", [
                style({
                    opacity: 0,
                    width: 0
                }),
                animate('250ms 50ms ease-out', style({
                    opacity: 1,
                    width: "*"
                }))
            ]),
            transition(":leave", [
                animate('250ms 50ms ease-out', style({
                    opacity: 0,
                    width: 0
                }))
            ])
        ]),
        trigger('input', [
            transition(":enter", [
                style({
                    opacity: 0,
                    height: 0
                }),
                animate('250ms 50ms ease-out', style({
                    opacity: 1,
                    height: "*"
                }))
            ]),
            transition(":leave", [
                animate('250ms 50ms ease-out', style({
                    opacity: 0,
                    height: 0
                }))
            ])
        ])
    ]
})
export class DateChooseBar extends OpenAbleComponent{
    @Input() inputed_date = new Date()
    @Output() choosed_date = new EventEmitter<Date>()

    handleDateChange(e: any) {
        const date = e.target.valueAsDate
        if (date) {
            this.inputed_date = date
            this.choosed_date.emit(date)
        }
    }
}