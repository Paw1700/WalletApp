import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AccountChooseHorizontal } from "../../components/forms/account_choose_horizontal/account_choose_horizontal.component";
import { TransactionBarComponentData } from "../../components/single_components/transaction_bar/transaction_bar.component";
import { TransactionsFilterOptions } from "../../services/storage.service";
import { TransactionsListPageService } from "./transactions_list.page.service";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";
import { FilterOptions } from "./components/filter_options/filter_options.component";
import { TransactionsList } from "./components/transactions_list/transactions_list.component";
import { AccountChooseBarListItem } from "../../components/interfaces/account_choose_bar.component";

@Component({
    selector: 'transactions_list_page',
    standalone: true,
    imports: [
        AccountChooseHorizontal,
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

    ACCOUNTS_BAR_DATA_LIST: AccountChooseBarListItem[] = []

    receiver_choose_bubble_open = false
    transactions_list: TransactionBarComponentData[] = []
    filter_options: TransactionsFilterOptions = {
        user_account_id: null,
        filter_amount: null,
        filter_date: null,
        category_id: null,
        receiver_id: null
    }

    async ngOnInit() {
        await this.fetchRouteData()
        this.subscribeToAccountsBarDataList()
        this.PAGE_SERVICE.populateAccountsBarData()
        this.PAGE_SERVICE.fetchTransactions()
    }

    handleUserAccountChange(user_account_id: string | null) {
        this.PAGE_SERVICE.setFilterOption('user_account_id', user_account_id)
    }

    goToAccount() {
        this.PAGE_SERVICE.goToUserAccount()
    }

    private fetchRouteData() {
        return new Promise<void>(resolve => {
            this.ROUTE.data.subscribe( resolver_data => {
                this.PAGE_SERVICE.categories_list$.next(resolver_data['categories_list'])
                this.PAGE_SERVICE.receivers_list$.next(resolver_data['receivers_list'])
                this.PAGE_SERVICE.accounts_list$.next(resolver_data['accounts_list'])
                this.PAGE_SERVICE.user_accounts_list$.next(resolver_data['user_accounts_list'])
                resolve()
            })
        })
    }

    private subscribeToAccountsBarDataList() {
        this.PAGE_SERVICE.accounts_bar_component_data_list$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe( accounts_list => {
            this.ACCOUNTS_BAR_DATA_LIST = accounts_list
        })
    }
}