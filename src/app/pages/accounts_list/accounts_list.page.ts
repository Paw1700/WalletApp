import { Component, inject, OnInit } from "@angular/core";
import {  Account, UserAccount } from "../../models";
import { APP_SERVICE } from "../../app.service";
import ACCOUNTS_LIST_JSON from '../../../../public/assets/data/accounts.json'
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";
import { AccountBarComponent } from "../../components/account_bar/account_bar.component";

@Component({
    selector: 'accounts_list',
    standalone: true,
    imports: [
        AccountBarComponent
    ],
    templateUrl: './accounts_list.page.html',
    styleUrl: './accounts_list.page.scss'
})
export class AccountsListPage extends NgUnsubscriber implements OnInit{
    readonly APP = inject(APP_SERVICE)
    readonly ACCOUNTS_LIST = ACCOUNTS_LIST_JSON as Account[]

    user_accounts_list: UserAccount[] = []
    user_accounts_list_to_display: {account: Account, user_account: UserAccount}[] = []

    ngOnInit(): void {
        this.fetchAllUserAccounts()
        this.listenToNavBarRightButtonClick()
    }

    private async fetchAllUserAccounts() {
        try {
            this.user_accounts_list = await this.APP.DATA.USER_ACCOUNT.getAll()
            this.user_accounts_list_to_display = []
            this.user_accounts_list.forEach( user_acc => {
                let account = this.ACCOUNTS_LIST.filter(acc => acc.id === user_acc.account_id)[0]
                this.user_accounts_list_to_display.push({account: account, user_account: user_acc})
            })
        } catch (err) {
            console.error(err)
        }
        // this.APP.DATA.USER_ACCOUNT.getAll()
        //     .then( list => {
        //         this.user_accounts_list = list
        //     })
    }

    private listenToNavBarRightButtonClick() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            this.APP.navigate('add_account')
        })
    }
}