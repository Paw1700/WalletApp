import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AccountBarComponentData } from "../../components/single_components/account_bar/account_bar.component";
import { AccountChooseByScroll } from "../../components/forms/account_choose_by_scroll/account_choose_by_scroll.component";
import { TransactionBarComponentData } from "../../components/single_components/transaction_bar/transaction_bar.component";
import { TransactionsFilterOptions } from "../../services/storage.service";
import { TransactionsListPageService } from "./transactions_list.page.service";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";
import { FilterOptions } from "./components/filter_options/filter_options.component";
import { TransactionsList } from "./components/transactions_list/transactions_list.component";
import { Account, UserAccount } from "../../models";

@Component({
    selector: 'transactions_list_page',
    standalone: true,
    imports: [
        AccountChooseByScroll,
        FilterOptions,
        TransactionsList
    ],
    templateUrl: './transactions_list.page.html',
    styleUrl: './transactions_list.page.scss',
    viewProviders: [
        TransactionsListPageService
    ]
})
export class TransactionsListPage extends NgUnsubscriber implements OnInit {
    private readonly ROUTE = inject(ActivatedRoute)
    private readonly PAGE_SERVICE = inject(TransactionsListPageService)

    ACCOUNTS_BAR_DATA_LIST: AccountBarComponentData[] = []

    receiver_choose_bubble_open = false
    transactions_list: TransactionBarComponentData[] = []
    filter_options: TransactionsFilterOptions = {
        user_account_id: null,
        filter_amount: null,
        filter_date: null,
        category_id: null,
        receiver_id: null
    }

    ngOnInit(): void {
        this.fetchRouteData()
        this.subscribeToAccountsBarDataList()
        this.PAGE_SERVICE.fetchTransactions()
    }

    handleUserAccountChange(user_account_id: string | null) {
        this.PAGE_SERVICE.setFilterOption('user_account_id', user_account_id)
    }

    private fetchRouteData() {
        this.ROUTE.data.subscribe( resolver_data => {
            this.PAGE_SERVICE.categories_list$.next(resolver_data['categories_list'])
            this.PAGE_SERVICE.receivers_list$.next(resolver_data['receivers_list'])
            this.populateAccountsBarData(resolver_data['user_accounts_data'] as UserAccount[], resolver_data['accounts_data'] as Account[])
        })
    }

    private subscribeToAccountsBarDataList() {
        this.PAGE_SERVICE.accounts_bar_component_data_list$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe( accounts_list => {
            this.ACCOUNTS_BAR_DATA_LIST = accounts_list
        })
    }

    private populateAccountsBarData(user_accounts_list: UserAccount[], accounts_data: Account[]) {
        const accounts_bar_data_list: AccountBarComponentData[] = []
        user_accounts_list.forEach( usa => {
            accounts_bar_data_list.push({
                user_account_id: usa.id,
                account: accounts_data.filter(acc => acc.id === usa.account_id)[0],
                funds_data: {
                    avaible_funds: usa.avaible_funds
                }
            })
        })
        this.PAGE_SERVICE.accounts_bar_component_data_list$.next(accounts_bar_data_list)
    }
}