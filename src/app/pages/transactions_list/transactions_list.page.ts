import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AccountBarComponentData } from "../../components/single_components/account_bar/account_bar.component";
import { UserAccount, Account, Category, Receiver, Transaction, ErrorID, TransactionType } from "../../models";
import { AccountChooseByScroll } from "../../components/forms/account_choose_by_scroll/account_choose_by_scroll.component";
import { TransactionTypeChooseBubble } from "../../components/forms/transactions_type_choose_bubble/transactions_type_choose_bubble.component";
import { AmountFilterChooseBubble } from "../../components/forms/amount_filter_choose_bubble/amount_filter_choose_bubble.component";
import { ReceiverChooseBubble } from "../../components/forms/receiver_choose_bubble/receiver_choose_bubble.component";
import { CategoryChooseBubble } from "../../components/forms/categorie_choose_bubble/categorie_choose_bubble.component";
import { APP_SERVICE } from "../../app.service";
import { TransactionBar, TransactionBarComponentData } from "../../components/single_components/transaction_bar/transaction_bar.component";
import { SORTING_TRANSACTIONS_BY_DATE } from "../../constants";
import { TransactionsFilterOptions, TransactionsFilterOptionsList } from "../../services/storage.service";

@Component({
    selector: 'transactions_list_page',
    standalone: true,
    imports: [
        AccountChooseByScroll,
        TransactionTypeChooseBubble,
        AmountFilterChooseBubble,
        ReceiverChooseBubble,
        CategoryChooseBubble,
        TransactionBar
    ],
    templateUrl: './transactions_list.page.html',
    styleUrl: './transactions_list.page.scss'
})
export class TransactionsListPage {
    private readonly APP = inject(APP_SERVICE)
    private readonly ROUTE = inject(ActivatedRoute)

    ACCOUNTS_BAR_DATA_LIST: AccountBarComponentData[] = []
    CATEGORIES_LIST: Category[] = []
    RECEIVERS_LIST: Receiver[] = []

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
        this.readResolverDataAndPopulateData()
        this.fetchTransactions()
    }

    handleFilterChange(type: TransactionsFilterOptionsList | 'type', payload: any) {
        switch(type) {
            case 'type':
                payload = payload as TransactionType
                switch(payload) {
                    case "income":
                        const upper_limit = this.filter_options.filter_amount?.to && this.filter_options.filter_amount.to > 0 ? this.filter_options.filter_amount.to : null
                        this.filter_options.filter_amount = {from: 0, to: upper_limit}
                        break
                    case "expense":
                        const bottom_limit = this.filter_options.filter_amount?.from && this.filter_options.filter_amount.from < 0 ? this.filter_options.filter_amount.from : null
                        this.filter_options.filter_amount = {from: bottom_limit, to: 0}
                        break
                    case null:
                        this.filter_options.filter_amount = null
                        break
                }
                break
            case "user_account_id":
                this.filter_options.user_account_id = payload
                break
            case "category_id":
                this.filter_options.category_id = payload?.id ? payload.id : null
                break
            case "receiver_id":
                this.filter_options.receiver_id = payload
                break
            case "filter_amount":
                this.filter_options.filter_amount = payload
                break
        }
        this.fetchTransactions()
    }

    reactToReceiverBubbleOpenStateChange(e: boolean) {
        this.receiver_choose_bubble_open = e
    }
    
    private async fetchTransactions() {
        try {
            this.transactions_list = []
            const transactions = await this.APP.TRANSACTION.getAll(this.filter_options)
            transactions.sort(SORTING_TRANSACTIONS_BY_DATE)
            transactions.forEach( tr => {
                this.transactions_list.push({
                    transaction_id: tr.id,
                    transaction_currency: "PLN",
                    date: tr.date,
                    transaction_price: tr.amount,
                    user_account_id: tr.user_account_id,
                    category: this.CATEGORIES_LIST.filter(cat => cat.id === tr.category_id)[0],
                    description: tr.description,
                    receiver: this.RECEIVERS_LIST.filter(rec => rec.id === tr.receiver_id)[0]
                })
            })
        } catch (err) {
            this.APP.STATE.errorHappend(err as ErrorID)
            console.error(err);
        }
    }

    private readResolverDataAndPopulateData() {
        this.ROUTE.data.subscribe( resolver_data => {
            this.CATEGORIES_LIST = resolver_data['categories_list']
            this.RECEIVERS_LIST = resolver_data['receivers_list']
            this.populateAccountsBarData(resolver_data['user_accounts_data'] as UserAccount[], resolver_data['accounts_data'] as Account[])
        })
    }

    private populateAccountsBarData(user_accounts_list: UserAccount[], accounts_data: Account[]) {
        user_accounts_list.forEach( usa => {
            this.ACCOUNTS_BAR_DATA_LIST.push({
                user_account_id: usa.id,
                account: accounts_data.filter(acc => acc.id === usa.account_id)[0],
                funds_data: {
                    avaible_funds: usa.avaible_funds
                }
            })
        })
    }
}