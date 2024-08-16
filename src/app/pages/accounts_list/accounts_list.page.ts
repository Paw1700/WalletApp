import { Component, inject, OnInit } from "@angular/core";
import { Account, UserAccount } from "../../models";
import { APP_SERVICE } from "../../app.service";
import ACCOUNTS_LIST_JSON from '../../../../public/assets/data/accounts.json'
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";
import { AccountBar_Data, AccountBarComponent } from "../../components/account_bar/account_bar.component";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'accounts_list',
    standalone: true,
    imports: [
        AccountBarComponent
    ],
    templateUrl: './accounts_list.page.html',
    styleUrl: './accounts_list.page.scss'
})
export class AccountsListPage extends NgUnsubscriber implements OnInit {
    readonly APP = inject(APP_SERVICE)
    readonly ROUTE = inject(ActivatedRoute)
    readonly ACCOUNTS_LIST = ACCOUNTS_LIST_JSON as Account[]

    user_accounts_list: UserAccount[] = []
    user_accounts_list_to_display: AccountBar_Data[] = []

    ngOnInit(): void {
        this.fetchAllUserAccounts()
        this.listenToNavBarRightButtonClick()
    }

    private async fetchAllUserAccounts() {
        this.ROUTE.data.subscribe( route_data => {
            this.user_accounts_list = route_data['user_accounts']
        })
        this.user_accounts_list_to_display = []
        this.user_accounts_list.forEach(user_acc => {
            let account = this.ACCOUNTS_LIST.filter(acc => acc.id === user_acc.account_id)[0]
            this.user_accounts_list_to_display.push({ account: account, funds_data: { avaible_funds: user_acc.avaible_funds, stats_data: { plus: 0, minus: 0 } } })
        })
    }

    private listenToNavBarRightButtonClick() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            this.APP.navigate('add_account')
        })
    }
}