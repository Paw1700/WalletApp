import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Bank } from "../../models";
import { animate, style, transition, trigger } from "@angular/animations";

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
export class BankChooseBarComponent {
    @Input() banks_list: Bank[] = []
    @Input() component_open: boolean = false
    @Output() choosed_bank_id = new EventEmitter<string>()
    @Output() component_openess_state = new EventEmitter<boolean>()

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

    private changeComponentOpenessState(open: boolean) {
        this.component_open = open
        this.component_openess_state.emit(open)
    }
}