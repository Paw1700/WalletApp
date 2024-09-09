import { animate, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'confrim_box',
    standalone: true,
    templateUrl: './confirm_box.component.html',
    styleUrl: './confirm_box.component.scss',
    animations: [
        trigger('COMPONENT', [
            transition(':enter', [
                style({
                    opacity: 0
                }),
                animate('350ms ease-out', style({
                    opacity: 1
                }))
            ]),
            transition(':leave', [
                animate('350ms ease-in', style({
                    opacity: 0
                }))
            ])
        ])
    ]
})
export class ConfirmBox {
    @Input({required: true}) box_data: ConfirmBoxData | null = null 
    @Output() decision_made = new EventEmitter<boolean>()
}

export type ConfirmBoxData = {
    title: string,
    desc?: string,
}