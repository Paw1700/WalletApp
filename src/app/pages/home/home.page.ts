import { Component, inject, OnInit } from "@angular/core";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { Account, Category, Profile, Receiver, Transaction, UserAccount } from "../../models";
import { APP_SERVICE } from "../../app.service";
import { AccountsCarousel } from "./components/accounts-carousel/accounts-carousel.component";
import { AccountBar_Data, AccountFundsData } from "../../components/account_bar/account_bar.component";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs";
import { TransactionBarComponent, TransactionBarComponent_Data } from "../../components/transaction_bar/transaction_bar.component";

@Component({
    selector: 'home_page',
    standalone: true,
    imports: [
        AccountsCarousel,
        TransactionBarComponent
    ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss'
})
export class HomePage extends NgUnsubscriber implements OnInit {
    readonly APP = inject(APP_SERVICE)
    readonly ROUTE = inject(ActivatedRoute)
    private ACCOUNTS_LIST: Account[] = []
    PROFILE: Profile = { id: '', name: '', surname: '', image: '' }
    USER_ACCOUNTS: UserAccount[] = []
    CATEGORIES_LIST: Category[] = []
    RECEIVERS_LIST: Receiver[] = []
    TRANSACTION_LIST: Transaction[] = []

    accounts_carousel_data: AccountBar_Data[] = []
    active_user_account = -1
    account_transactions_list: TransactionBarComponent_Data[] = []

    ngOnInit(): void {
        this.fetchRouteData()
        this.reactToNavBarRightButtonClicked()
        this.fetchUserAccountsTransactions()
        this.APP.APPERANCE.setAppAccentColor(null)
    }

    handleActiveAccountChange(account_list_number: number) {
        this.active_user_account = account_list_number
        if (account_list_number < 0) {
            this.APP.APPERANCE.nav_bar_right_button_option$.next(null)
            this.APP.APPERANCE.setAppAccentColor(null)
        } else {
            this.APP.APPERANCE.nav_bar_right_button_option$.next('add_transaction')
            const account = this.ACCOUNTS_LIST.filter(acc => acc.id === this.USER_ACCOUNTS[this.active_user_account].account_id)[0]
            this.APP.APPERANCE.setAppAccentColor(account.apperance.background_gradient.bottom ? account.apperance.background_gradient.bottom : account.apperance.background_gradient.top)
        }
        this.fetchUserAccountsTransactions()
    }

    private fetchRouteData() {
        this.ROUTE.data.subscribe(route_data => {
            this.USER_ACCOUNTS = route_data['user_accounts']
            this.PROFILE = route_data['profile']
            this.ACCOUNTS_LIST = route_data['accounts']
            this.CATEGORIES_LIST = route_data['categories']
            this.TRANSACTION_LIST = route_data['transactions']
            this.RECEIVERS_LIST = route_data['receivers']
        })
        this.updateAccountCarouselData()
        this.fetchUserAccountsTransactions()
    }

    private updateAccountCarouselData() {
        this.accounts_carousel_data = []
        this.USER_ACCOUNTS.forEach(us_acc => {
            let account = this.ACCOUNTS_LIST.filter(acc => acc.id === us_acc.account_id)[0] as Account
            let funds_d: AccountFundsData = { avaible_funds: us_acc.avaible_funds, stats_data: { plus: 0, minus: 0 } }
            this.accounts_carousel_data.push({ account: account, funds_data: funds_d })
        })
    }

    private reactToNavBarRightButtonClicked() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            if (this.active_user_account > -1) {
                this.APP.navigate('add_transaction', this.USER_ACCOUNTS[this.active_user_account].id)
            }
        })
    }

    private async fetchUserAccountsTransactions() {
        this.account_transactions_list = []
        let transaction_list_to_add_date: Transaction[] = []
        if (this.active_user_account >= 0) {
            this.TRANSACTION_LIST.forEach(tr => {
                if (tr.user_account_id === this.USER_ACCOUNTS[this.active_user_account].id) {
                    transaction_list_to_add_date.push(tr)
                }
            })
        } else {
            transaction_list_to_add_date = this.TRANSACTION_LIST
        }

        transaction_list_to_add_date.sort((a, b) => {
            if (a.date > b.date) {
                return -1
            } else if (a.date < b.date) {
                return 1
            } else {
                return 0
            }
        })

        transaction_list_to_add_date.forEach((tr) => {
            const category: Category = this.CATEGORIES_LIST.filter(cat => cat.id === tr.category_id)[0]
            const receiver: Receiver = this.RECEIVERS_LIST.filter(r => r.id === tr.receiver_id)[0]
    
            this.account_transactions_list.push({
                transaction_id: tr.id,
                category: category,
                description: tr.description === '' ? category.name : tr.description,
                receiver_name: receiver.name,
                transaction_price: tr.amount,
                transaction_currency: "PLN"
            })
        })
    }
}