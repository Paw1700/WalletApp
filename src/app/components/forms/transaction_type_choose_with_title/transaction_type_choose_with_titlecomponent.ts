import { Component } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { TransactionTypeChooseBarComponentInterface } from "../../interfaces/transaction_type_chosse_bar.component";

@Component({
    selector: 'transaction_type_choose_with_title',
    standalone: true,
    templateUrl: './transaction_type_choose_with_title.component.html',
    styleUrl: './transaction_type_choose_with_title.component.scss',
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
export class TransactionTypeChooseWithTitle extends TransactionTypeChooseBarComponentInterface { }