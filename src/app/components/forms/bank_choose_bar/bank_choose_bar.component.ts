import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Bank } from "../../../models";
import { animate, style, transition, trigger } from "@angular/animations";
import { OpenAbleComponentInterface } from "../../interfaces/openable.component";

@Component({
    selector: 'bank_choose_bar',
    standalone: true,
    templateUrl: './bank_choose_bar.component.html',
    styleUrl: './bank_choose_bar.component.scss',
    animations: [
        trigger('banks_list', [
            transition("void => *", [
                style({
                    height: 0,
                    opacity: 0
                }),
                animate('100ms 50ms ease-out', style({
                    height: "*",
                    opacity: 1
                }))
            ]),
            transition('* => void', [
                animate('100ms 50ms ease-out', style({
                    height: 0,
                    opacity: 0
                }))
            ])
        ])
    ]
})
export class BankChooseBar extends OpenAbleComponentInterface {
    @Input({required: true}) BANKS_LIST: Bank[] = []
    @Output() choosen_bank = new EventEmitter<Bank | null>()

    choosed_bank: Bank | null = null
    
    chooseBank(bank: Bank | null) {
        this.choosed_bank = bank
        if (bank) {
            this.changeComponentOpenessState(false)
            this.choosen_bank.emit(bank)
        } else {
            this.changeComponentOpenessState(true)
            this.choosen_bank.emit(null)
        }
    }
}