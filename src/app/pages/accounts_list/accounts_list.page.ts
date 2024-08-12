import { Component, inject, OnInit } from "@angular/core";
import {  Account, UserAccount } from "../../models";
import { APP_SERVICE } from "../../app.service";
import ACCOUNTS_LIST from '../../../../public/assets/data/accounts.json'

@Component({
    selector: 'accounts_list',
    standalone: true,
    templateUrl: './accounts_list.page.html',
    styleUrl: './accounts_list.page.scss'
})
export class AccountsListPage implements OnInit{
    readonly APP = inject(APP_SERVICE)
    readonly ACCOUNTS_LIST = ACCOUNTS_LIST as Account[]

    accounts_list: UserAccount[] = []

    ngOnInit(): void {
        this.APP.DATA.USER_ACCOUNT.getAll()
            .then( list => {
                this.accounts_list = list
            })
    }
}