import { Component, inject, OnInit } from "@angular/core";
import {  Account, UserAccount } from "../../models";
import { APP_SERVICE } from "../../app.service";
import ACCOUNTS_LIST from '../../../../public/assets/data/accounts.json'
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";

@Component({
    selector: 'accounts_list',
    standalone: true,
    templateUrl: './accounts_list.page.html',
    styleUrl: './accounts_list.page.scss'
})
export class AccountsListPage extends NgUnsubscriber implements OnInit{
    readonly APP = inject(APP_SERVICE)
    readonly ACCOUNTS_LIST = ACCOUNTS_LIST as Account[]

    accounts_list: UserAccount[] = []

    ngOnInit(): void {
        this.fetchAllUserAccounts()
        this.listenToNavBarRightButtonClick()
    }

    private fetchAllUserAccounts() {
        this.APP.DATA.USER_ACCOUNT.getAll()
            .then( list => {
                this.accounts_list = list
            })
    }

    private listenToNavBarRightButtonClick() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            this.APP.navigate('add_account')
        })
    }
}