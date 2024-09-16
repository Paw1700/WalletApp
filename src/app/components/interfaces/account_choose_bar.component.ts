import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { OpenAbleComponentInterface } from "./openable.component";
import { Account } from "../../models";

@Component({
    selector: 'account_choose_bar',
    standalone: true,
    template: ''
})
export class AccountChooseBarComponentInterface extends OpenAbleComponentInterface implements OnChanges{
    @Input({required: true}) ACCOUNTS_LIST: AccountChooseBarListItem[] = []
    @Output() choosed_account_id = new EventEmitter<string | null>()
    @Output() choosed_user_account_id = new EventEmitter<string | null>()

    choosed_account_bar_data: AccountChooseBarListItem | null = null

    ngOnChanges(changes: SimpleChanges): void {
        if (this.ACCOUNTS_LIST.length === 0) {
            this.choosed_account_bar_data = null
            this.choosed_account_id.emit(null)
            this.changeComponentOpenessState(false)
        }
    }

    changeAccount(account_bar_data: AccountChooseBarListItem | null) {
        if (this.ACCOUNTS_LIST.length === 0) {
            return
        }
        if(account_bar_data) {
            this.changeComponentOpenessState(false)
            this.choosed_account_bar_data = account_bar_data
            this.choosed_account_id.emit(account_bar_data.account.id)
            if (account_bar_data.user_account_id) {
                this.choosed_user_account_id.emit(account_bar_data.user_account_id)
            }
        } else {
            this.changeComponentOpenessState(true)
            this.choosed_account_bar_data = null
            this.choosed_account_id.emit(null)
            this.choosed_user_account_id.emit(null)
        }
    }
}

export type AccountChooseBarListItem = {
    user_account_id: string | null,
    account: Account
}