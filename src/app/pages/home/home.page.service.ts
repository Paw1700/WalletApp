import { inject, Injectable } from "@angular/core";
import { APP_SERVICE } from "../../app.service";
import { BehaviorSubject } from "rxjs";
import { Account, Profile } from "../../models";
import { TransactionBarComponentData } from "../../components/single_components/transaction_bar/transaction_bar.component";
import { DAYS_OFFSET, SORTING_TRANSACTIONS_BY_DATE } from "../../constants";
import { ConfirmBoxData } from "../../components/UI/confirm_box/confirm_box.component";
import { AccountsCarouselListItem } from "./components/accounts-carousel/accounts-carousel.component";

@Injectable()
export class HomePageService {
    private readonly APP = inject(APP_SERVICE)

    profile$ = new BehaviorSubject<Profile>({ id: '', name: '', surname: '', image: '' })
    accounts_bar_carousel_list$ = new BehaviorSubject<AccountsCarouselListItem[]>([])
    active_account_carousel_list_index$ = new BehaviorSubject<number>(-1)
    transaction_bar_list$ = new BehaviorSubject<TransactionBarComponentData[] | null>(null)
    confirm_box_data$ = new BehaviorSubject<ConfirmBoxData | null>(null)
    transaction_id_to_delete$ = new BehaviorSubject<string | null>(null)

    changeActiveUserAccount(accounts_bar_list_index: number) {
        this.active_account_carousel_list_index$.next(accounts_bar_list_index)
        if (accounts_bar_list_index < 0) {
            this.APP.APPERANCE.nav_bar_right_button_option$.next(null)
            this.APP.APPERANCE.setAppAccentColor(null)
        } else {
            this.APP.APPERANCE.nav_bar_right_button_option$.next('add_transaction')
            this.APP.APPERANCE.setAppAccentColor(this.determinedAccentColor(this.accounts_bar_carousel_list$.value[accounts_bar_list_index].account))
        }
        this.fetchTransactionBarList()
    }

    showConfirmBox(show: boolean) {
        if (show) {
            this.confirm_box_data$.next({ title: 'Czy napewno?', desc: 'Tej operacji nie mozna cofnąć!' })
        } else {
            this.confirm_box_data$.next(null)
        }
    }

    goToEditTransaction(transaction_id: string) {
        this.APP.navigate('add_transaction', {tr_id: transaction_id})
    }

    goToAddTransaction() {
        if (this.active_account_carousel_list_index$.value > -1 ) {
            this.APP.navigate('add_transaction', {usa_id: this.accounts_bar_carousel_list$.value[this.active_account_carousel_list_index$.value].user_account_id})
        }
    }

    async deleteTransaction() {
        const transaction_id = this.transaction_id_to_delete$.value
        if (transaction_id === null) {
            console.error('Dont have transactio id');
            return
        }
        const transaction = await this.APP.TRANSACTION.getOne(transaction_id)
        await this.APP.USER_ACCOUNT.changeAvaibleAmount(transaction.user_account_id, -transaction.amount)
        await this.APP.TRANSACTION.delete(transaction_id)
        this.fetchBarUserAccount()
        this.confirm_box_data$.next(null)
        this.transaction_id_to_delete$.next(null)
    }

    async fetchBarUserAccount() {
        const accounts_data = await this.APP.STORAGE.getAccounts()
        const user_accounts_data = await this.APP.USER_ACCOUNT.getAll()
        const bar_accounts_data: AccountsCarouselListItem[] = []
        user_accounts_data.forEach(us_acc => {
            const account_data = accounts_data.filter(acc => acc.id === us_acc.account_id)[0]
            bar_accounts_data.push({
                user_account_id: us_acc.id,
                account: account_data,
                account_funds_data: {
                    avaible_funds: us_acc.avaible_funds,
                    debet_limit: us_acc.debet.limit,
                    account_currency: account_data.currency
                },
                stats_data: {
                    plus: 0,
                    minus: 0
                }
            })
        })
        this.accounts_bar_carousel_list$.next(bar_accounts_data)
    }

    async fetchTransactionBarList() {
        const CATEGORIES_LIST = await this.APP.STORAGE.getCategories()
        const RECEIVERS_LIST = await this.APP.STORAGE.getReceivers()
        const usa_id = this.active_account_carousel_list_index$.value > -1 ? this.accounts_bar_carousel_list$.value[this.active_account_carousel_list_index$.value].user_account_id : null
        const transaction = await this.APP.TRANSACTION.getAll({
            filter_date: { from: new Date(new Date().getTime() - DAYS_OFFSET * 30), to: null },
            user_account_id: usa_id,
            category_id: null,
            receiver_id: null,
            filter_amount: null
        })
        transaction.sort(SORTING_TRANSACTIONS_BY_DATE)
        const new_transaction_bar_list: TransactionBarComponentData[] = []
        transaction.forEach(tr => {
            new_transaction_bar_list.push({
                transaction_id: tr.id,
                user_account_id: tr.user_account_id,
                date: tr.date,
                category: CATEGORIES_LIST.filter(ct => ct.id === tr.category_id)[0],
                description: tr.description,
                receiver: RECEIVERS_LIST.filter(r => r.id === tr.receiver_id)[0],
                transaction_price: tr.amount,
                transaction_currency: 'PLN'
            })
        })
        this.transaction_bar_list$.next(new_transaction_bar_list)
    }

    private determinedAccentColor(account: Account): string {
        if (account.apperance.background_gradient.bottom === null) {
            return account.apperance.background_gradient.top
        } else {
            return account.apperance.background_gradient.bottom
        }
    }
}