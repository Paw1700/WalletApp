import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AccountBarComponent } from "../account_bar/account_bar.component";
import { Account } from "../../models";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'account_choose_bar',
    standalone: true,
    imports: [AccountBarComponent],
    templateUrl: './account_choose_bar.component.html',
    styleUrl: './account_choose_bar.component.scss',
    animations: [
        trigger('anima', [
            transition(":leave", [
                animate('100ms 50ms ease-in', style({
                    height: 0,
                    opacity: 0
                }))
            ]),
            transition(":enter", [
                style({
                    opacity: 0,
                    height: 0
                }),
                animate('250ms 50ms ease-out', style({
                    height: '*',
                    opacity: 1
                }))
            ])
        ])
    ]
})
export class AccountChooseBarComponent {
    @Input() accounts_list: Account[] = []
    @Input() component_open: boolean = false
    @Output() choosed_account_id = new EventEmitter<string>()
    @Output() component_openess_state = new EventEmitter<boolean>()

    choosed_account: Account | null = null

    changeAccount(account: Account | null) {
        if(account) {
            this.changeComponentOpenessState(false)
            this.choosed_account = account
        } else {
            this.changeComponentOpenessState(true)
            this.choosed_account = null
        }
    }

    private changeComponentOpenessState(open: boolean) {
        this.component_open = open
        this.component_openess_state.emit(open)
    }
}