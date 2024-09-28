import { Component, inject, OnInit } from "@angular/core";
import { Account, UserAccount } from "../../models";
import { APP_SERVICE } from "../../app.service";
import ACCOUNTS_LIST_JSON from '../../../../public/assets/data/accounts.json'
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";
import { AccountBarComponent, AccountBarFundsData } from "../../components/single_components/account_bar/account_bar.component";
import { ActivatedRoute } from "@angular/router";
import { AccountStatsData } from "../../components/single_components/account_bar/components/account_bar_stats.component";

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
    user_accounts_list_to_display: AccountsPageListItem[] = []

    ngOnInit(): void {
        this.fetchAllUserAccounts()
        this.listenToNavBarRightButtonClick()
    }

    goToAccount(user_account_id: string) {
        this.APP.STATE.last_app_location$.next('accounts_list')
        this.APP.navigate('account', {user_account_id: user_account_id})
    }

    private async fetchAllUserAccounts() {
        this.ROUTE.data.subscribe( route_data => {
            this.user_accounts_list = route_data['user_accounts']
        })
        this.user_accounts_list_to_display = []
        this.user_accounts_list.forEach( async user_acc => {
            let account = this.ACCOUNTS_LIST.filter(acc => acc.id === user_acc.account_id)[0]
            this.user_accounts_list_to_display.push({ 
                user_account_id: user_acc.id , 
                account: account, 
                funds_data: { 
                    avaible_funds: user_acc.avaible_funds, 
                    debet_limit: user_acc.debet.limit
                },
                stats_data: await this.APP.USER_ACCOUNT.getAccountFundsStats(user_acc.id)
            })
        })
    }

    private listenToNavBarRightButtonClick() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            this.APP.navigate('add_account')
        })
    }
}

export type AccountsPageListItem = {
    user_account_id: string,
    account: Account,
    funds_data: AccountBarFundsData,
    stats_data: AccountStatsData
}