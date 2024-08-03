import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Bank } from "../../models";
import { animate, style, transition, trigger } from "@angular/animations";
import { OpenAbleComponent } from "../../interfaces/openable.component";

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
export class BankChooseBarComponent extends OpenAbleComponent{
    @Input({required: true}) banks_list: Bank[] = []
    @Output() choosed_bank_id = new EventEmitter<string>()

    choosed_bank: Bank | null = null
    
    chooseBank(bank: Bank | null) {
        this.choosed_bank = bank
        if (bank) {
            this.changeComponentOpenessState(false)
            this.choosed_bank_id.emit(bank.id)
        } else {
            this.changeComponentOpenessState(true)
            this.choosed_bank_id.emit('')
        }
    }
}