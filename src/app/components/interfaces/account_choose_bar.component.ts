import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { OpenAbleComponentInterface } from "./openable.component";
import { AccountBarComponentData } from "../single_components/account_bar/account_bar.component";

@Component({
    selector: 'account_choose_bar',
    standalone: true,
    template: ''
})
export class AccountChooseBarComponentInterface extends OpenAbleComponentInterface implements OnChanges{
    @Input({required: true}) ACCOUNTS_LIST: AccountBarComponentData[] = []
    @Output() choosed_account_id = new EventEmitter<string | null>()
    @Output() choosed_user_account_id = new EventEmitter<string | null>()

    choosed_account_bar_data: AccountBarComponentData | null = null

    ngOnChanges(changes: SimpleChanges): void {
        if (this.ACCOUNTS_LIST.length === 0 && this.choosed_account_bar_data) {
            this.choosed_account_bar_data = null
            this.choosed_account_id.emit(null)
        }
    }

    changeAccount(account_bar_data: AccountBarComponentData | null) {
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