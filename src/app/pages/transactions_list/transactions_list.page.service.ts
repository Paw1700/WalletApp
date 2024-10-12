import { inject, Injectable } from "@angular/core";
import { APP_SERVICE } from "../../app.service";
import { BehaviorSubject } from "rxjs";
import { Account, Category, Receiver, TransactionType, UserAccount } from "../../models";
import { TransactionBarComponentData } from "../../components/single_components/transaction_bar/transaction_bar.component";
import { TransactionsFilterOptions, TransactionsFilterOptionsList } from "../../services/storage.service";
import { SORTING_TRANSACTIONS_BY_DATE } from "../../constants";
import { AccountChooseBarListItem } from "../../components/interfaces/account_choose_bar.component";

@Injectable()
export class TransactionsListPageService {
    private readonly APP = inject(APP_SERVICE)

    accounts_bar_component_data_list$ = new BehaviorSubject<AccountChooseBarListItem[]>([])
    accounts_list$ = new BehaviorSubject<Account[]>([])
    user_accounts_list$ = new BehaviorSubject<UserAccount[]>([])
    categories_list$ = new BehaviorSubject<Category[]>([])
    receivers_list$ = new BehaviorSubject<Receiver[]>([])
    transactions_list$ = new BehaviorSubject<TransactionBarComponentData[]>([])
    filter_options$ = new BehaviorSubject<TransactionsFilterOptions>({
        user_account_id: null,
        filter_amount: null,
        filter_date: null,
        category_id: null,
        receiver_id: null
    })

    async fetchTransactions() {
        try {
            const transactions_bar_list: TransactionBarComponentData[] = []
            const transactions = await this.APP.TRANSACTION.getAll(this.filter_options$.value)
            transactions.sort(SORTING_TRANSACTIONS_BY_DATE)
            for (let i = 0; i <= transactions.length - 1; i++) {
                const tr = transactions[i]
                const user_account = this.user_accounts_list$.value.filter(acc => acc.id === tr.user_account_id)[0]
                const account = this.accounts_list$.value.filter(acc => acc.id === user_account.account_id)[0]
                transactions_bar_list.push({
                    transaction_id: tr.id,
                    transaction_currency: account.currency,
                    date: tr.date,
                    transaction_price: tr.amount,
                    user_account_id: tr.user_account_id,
                    category: this.categories_list$.value.filter(cat => cat.id === tr.category_id)[0],
                    receiver: this.receivers_list$.value.filter(rec => rec.id === tr.receiver_id)[0],
                    description: tr.description
                })
            }
            this.transactions_list$.next(transactions_bar_list)
        } catch (err) {
            this.APP.STATE.errorHappend(err as Error)
        }
    }

    goToEditTransaction(transaction_id: string) {
        this.APP.STATE.last_app_location$.next('transactions_list')
        this.APP.navigate('add_transaction', { tr_id: transaction_id })
    }

    goToUserAccount() {
        this.APP.STATE.last_app_location$.next('transactions_list')
        this.APP.navigate('account', { user_account_id: this.filter_options$.value.user_account_id })
    }

    setFilterOption(type: TransactionsFilterOptionsList | 'type', payload: any) {
        const filter_options = this.filter_options$.value
        switch (type) {
            case "user_account_id":
                filter_options.user_account_id = payload
                this.setAccentColor(payload)
                break
            case "filter_date":
                break
            case "category_id":
                filter_options.category_id = payload?.id ? payload.id : null
                break
            case "receiver_id":
                filter_options.receiver_id = payload
                break
            case "filter_amount":
                filter_options.filter_amount = payload
                break
            case 'type':
                payload = payload as TransactionType
                switch (payload) {
                    case "income":
                        const upper_limit = filter_options.filter_amount?.to && filter_options.filter_amount.to > 0 ? filter_options.filter_amount.to : null
                        filter_options.filter_amount = { from: 0, to: upper_limit }
                        break
                    case "expense":
                        const bottom_limit = filter_options.filter_amount?.from && filter_options.filter_amount.from < 0 ? filter_options.filter_amount.from : null
                        filter_options.filter_amount = { from: bottom_limit, to: 0 }
                        break
                    case null:
                        filter_options.filter_amount = null
                        break
                }
                break
        }
        this.filter_options$.next(filter_options)
        this.fetchTransactions()
    }

    populateAccountsBarData() {
        const accounts_bar_data_list: AccountChooseBarListItem[] = []
        this.user_accounts_list$.value.forEach( usa => {
            accounts_bar_data_list.push({
                user_account_id: usa.id,
                account: this.accounts_list$.value.filter(acc => acc.id === usa.account_id)[0]
            })
        })
        this.accounts_bar_component_data_list$.next(accounts_bar_data_list)
    }

    private setAccentColor(user_account_id: string | null) {
        if (user_account_id === null) {
            this.APP.APPERANCE.setAppAccentColor(null)
            return
        }
        const account = this.accounts_bar_component_data_list$.value.filter(data => data.user_account_id === user_account_id)[0].account
        this.APP.APPERANCE.setAppAccentColor(this.determinateAccentColor(account))
    }

    private determinateAccentColor(account: Account): string {
        return account.apperance.background_gradient.bottom !== null ? account.apperance.background_gradient.bottom : account.apperance.background_gradient.top
    }
}