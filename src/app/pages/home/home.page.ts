import { Component, inject, OnInit } from "@angular/core";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { Category, ErrorID, Profile, Receiver } from "../../models";
import { APP_SERVICE } from "../../app.service";
import { AccountsCarousel } from "./components/accounts-carousel/accounts-carousel.component";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs";
import { TransactionBar, TransactionBarComponentData } from "../../components/single_components/transaction_bar/transaction_bar.component";
import { AccountBarComponentData } from "../../components/single_components/account_bar/account_bar.component";
import { ClickedTransactionEmittedValue, HomeTransactionList } from "./components/home_transactions_list/home_transaction_list.component";
import { ConfirmBox, ConfirmBoxData } from "../../components/UI/confirm_box/confirm_box.component";
import { DAYS_OFFSET, SORTING_TRANSACTIONS_BY_DATE } from "../../constants";

@Component({
    selector: 'home_page',
    standalone: true,
    imports: [
        AccountsCarousel,
        TransactionBar,
        HomeTransactionList,
        ConfirmBox
    ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss'
})
export class HomePage extends NgUnsubscriber implements OnInit {
    readonly APP = inject(APP_SERVICE)
    readonly ROUTE = inject(ActivatedRoute)
    PROFILE: Profile = { id: '', name: '', surname: '', image: '' }

    ACCOUNTS_CAROUSEL_DATA: AccountBarComponentData[] = []
    CATEGORIES_LIST: Category[] = []
    RECEIVERS_LIST: Receiver[] = []
    FULL_ACCOUNTS_TRANSACTIONS_LIST: TransactionBarComponentData[] = []
    CONFIRM_BOX_DATA: ConfirmBoxData | null = null

    active_user_account_index = -1
    account_transactions_list: TransactionBarComponentData[] = []
    transaction_id_to_delete: string | null = null

    async ngOnInit() {
        this.fetchRouteData()
        this.fetchUserAccountTransactions(null)
        this.reactToNavBarRightButtonClicked()
        this.APP.APPERANCE.setAppAccentColor(null)
    }

    handleActiveAccountChange(account_list_index: number) {
        if (this.active_user_account_index === account_list_index) {
            return
        }
        this.active_user_account_index = account_list_index
        if (account_list_index < 0) {
            this.APP.APPERANCE.nav_bar_right_button_option$.next(null)
            this.APP.APPERANCE.setAppAccentColor(null)
            this.account_transactions_list = this.FULL_ACCOUNTS_TRANSACTIONS_LIST
            this.fetchUserAccountTransactions(null)
        } else {
            this.APP.APPERANCE.nav_bar_right_button_option$.next('add_transaction')
            const account = this.ACCOUNTS_CAROUSEL_DATA[account_list_index].account
            this.APP.APPERANCE.setAppAccentColor(account.apperance.background_gradient.bottom ? account.apperance.background_gradient.bottom : account.apperance.background_gradient.top)
            const user_account_id = this.ACCOUNTS_CAROUSEL_DATA[account_list_index].user_account_id ? this.ACCOUNTS_CAROUSEL_DATA[account_list_index].user_account_id : null
            this.fetchUserAccountTransactions(user_account_id)
        }
    }

    handleTransactionClicked(emitted_value: ClickedTransactionEmittedValue) {
        switch (emitted_value.type) {
            case "edit":
                this.APP.navigate('add_transaction', { tr_id: emitted_value.id })
                break
            case "delete":
                this.transaction_id_to_delete = emitted_value.id
                this.CONFIRM_BOX_DATA = { title: 'Na pewno chcesz usunąć transakcje?', desc: 'Nie mozna tej operacji cofnąć!' }
                break
        }
    }

    handleConfirmBoxDecision(decision: boolean) {
        if (decision) {
            this.deleteTransaction()
            .then(() => {
                this.transaction_id_to_delete = null
                this.CONFIRM_BOX_DATA = null
                this.fetchUserAccountTransactions(this.getActiveUserAccountID())
            })
        } else {
            this.transaction_id_to_delete = null
            this.CONFIRM_BOX_DATA = null
        }
    }

    private fetchRouteData(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.ROUTE.data.subscribe(route_data => {
                this.PROFILE = route_data['profile']
                this.ACCOUNTS_CAROUSEL_DATA = route_data['accounts_carousel']
                this.RECEIVERS_LIST = route_data['receivers']
                this.CATEGORIES_LIST = route_data['categories']
                resolve()
            })
        })
    }

    private reactToNavBarRightButtonClicked() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            if (this.active_user_account_index > -1) {
                this.APP.navigate('add_transaction', { usa_id: this.ACCOUNTS_CAROUSEL_DATA[this.active_user_account_index].user_account_id })
            }
        })
    }

    private fetchUserAccountTransactions(user_account_id: string | null) {
        this.account_transactions_list = []
        this.APP.TRANSACTION.getAll({
            filter_date: { from: new Date(new Date().getTime() - DAYS_OFFSET * 30), to: null },
            user_account_id: user_account_id,
            category_id: null,
            receiver_id: null,
            filter_amount: null
        })
        .then( tr_list => {
            tr_list.sort(SORTING_TRANSACTIONS_BY_DATE)
            tr_list.forEach(tr => {
                this.account_transactions_list.push({
                    transaction_id: tr.id,
                    user_account_id: tr.user_account_id,
                    date: tr.date,
                    category: this.CATEGORIES_LIST.filter(ct => ct.id === tr.category_id)[0],
                    description: tr.description,
                    receiver: this.RECEIVERS_LIST.filter(r => r.id === tr.receiver_id)[0],
                    transaction_price: tr.amount,
                    transaction_currency: 'PLN'
                })
            })
        })
    }

    private deleteTransaction() {
        return new Promise<void>(async (resolve) => {
            try {
                if (this.transaction_id_to_delete === null) {
                    throw new Error('APP-DATA-TRANSACTION-DELETE')
                }
                const transaction = await this.APP.TRANSACTION.getOne(this.transaction_id_to_delete)
                await this.APP.USER_ACCOUNT.changeAvaibleAmount(transaction.user_account_id, -transaction.amount)
                await this.APP.TRANSACTION.delete(transaction.id)
                resolve()
            } catch (err) {
                this.APP.STATE.errorHappend(err as ErrorID)
            }
        })
    }

    private getActiveUserAccountID(): string | null {
        const account_carouse_data = this.ACCOUNTS_CAROUSEL_DATA[this.active_user_account_index]
        const user_account_id = account_carouse_data.user_account_id ? account_carouse_data.user_account_id : null
        return user_account_id
    }
}