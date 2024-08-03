import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AccountBarComponent } from "../account_bar/account_bar.component";
import { Account } from "../../models";
import { animate, style, transition, trigger } from "@angular/animations";
import { OpenAbleComponent } from "../../interfaces/openable.component";

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
export class AccountChooseBarComponent extends OpenAbleComponent{
    @Input() accounts_list: Account[] = []
    @Output() choosed_account_id = new EventEmitter<string>()

    choosed_account: Account | null = null

    changeAccount(account: Account | null) {
        if (this.accounts_list.length === 0) {
            return
        }
        if(account) {
            this.changeComponentOpenessState(false)
            this.choosed_account = account
        } else {
            this.changeComponentOpenessState(true)
            this.choosed_account = null
        }
    }
}