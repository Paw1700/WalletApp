import { Component } from "@angular/core";
import { OpenAbleComponent } from "../../interfaces/openable.component";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'transaction_choose_bar',
    standalone: true,
    templateUrl: './transaction_type_chosse_bar.component.html',
    styleUrl: './transaction_type_chosse_bar.component.scss',
    animations: [
        trigger('switch', [
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
        ]),
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
        ])
    ]
})
export class TransactionTypeChooseBar extends OpenAbleComponent {
    choosed_option: number = 0

    setOption(option: number) {
        this.choosed_option = option
    }
}