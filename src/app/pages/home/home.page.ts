import { Component, inject, OnInit } from "@angular/core";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { Profile } from "../../models";
import { APP_SERVICE } from "../../app.service";
import { AccountsCarousel } from "./components/accounts-carousel/accounts-carousel.component";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs";
import { TransactionBar, TransactionBarComponentData } from "../../components/single_components/transaction_bar/transaction_bar.component";
import { AccountBarComponentData } from "../../components/single_components/account_bar/account_bar.component";
import { ClickedTransactionEmittedValue, HomeTransactionList } from "./components/home_transactions_list/home_transaction_list.component";
import { ConfirmBox, ConfirmBoxData } from "../../components/UI/confirm_box/confirm_box.component";

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
    FULL_ACCOUNTS_TRANSACTIONS_LIST: TransactionBarComponentData[] = []
    CONFIRM_BOX_DATA: ConfirmBoxData | null = null

    active_user_account_index = -1
    account_transactions_list: TransactionBarComponentData[] = []
    transaction_id_to_delete: string | null = null

    ngOnInit(): void {
        this.fetchRouteData()
        this.reactToNavBarRightButtonClicked()
        this.APP.APPERANCE.setAppAccentColor(null)
    }

    handleActiveAccountChange(account_list_index: number) {
        this.active_user_account_index = account_list_index
        if (account_list_index < 0) {
            this.APP.APPERANCE.nav_bar_right_button_option$.next(null)
            this.APP.APPERANCE.setAppAccentColor(null)
            this.account_transactions_list = this.FULL_ACCOUNTS_TRANSACTIONS_LIST
            this.populatedUserAccountsTransactions()
        } else {
            this.APP.APPERANCE.nav_bar_right_button_option$.next('add_transaction')
            const account = this.ACCOUNTS_CAROUSEL_DATA[account_list_index].account
            this.APP.APPERANCE.setAppAccentColor(account.apperance.background_gradient.bottom ? account.apperance.background_gradient.bottom : account.apperance.background_gradient.top)
            this.populatedUserAccountsTransactions(this.ACCOUNTS_CAROUSEL_DATA[account_list_index].user_account_id)
        }
    }

    handleTransactionClicked(emitted_value: ClickedTransactionEmittedValue) {
        switch(emitted_value.type) {
            case "edit":
                this.APP.navigate('add_transaction', {tr_id: emitted_value.id})
                break
            case "delete":
                this.transaction_id_to_delete = emitted_value.id
                this.CONFIRM_BOX_DATA = {title: 'Na pewno chcesz usunąć transakcje?', desc: 'Nie mozna tej operacji cofnąć!'}
                break
        }
    }

    handleConfirmBoxDecision(decision: boolean) {
        if (decision) {
            
        } else {
            this.transaction_id_to_delete = null
            this.CONFIRM_BOX_DATA = null
        }
    }

    private fetchRouteData() {
        this.ROUTE.data.subscribe(route_data => {
            this.PROFILE = route_data['profile']
            this.ACCOUNTS_CAROUSEL_DATA = route_data['accounts_carousel']
            this.FULL_ACCOUNTS_TRANSACTIONS_LIST = route_data['accounts_transactions']
            this.populatedUserAccountsTransactions()
        })
    }

    private populatedUserAccountsTransactions(user_account_id?: string | null) {
        if (user_account_id) {
            this.account_transactions_list = this.FULL_ACCOUNTS_TRANSACTIONS_LIST.filter(tr => tr.user_account_id === user_account_id)
        } else {
            this.account_transactions_list = this.FULL_ACCOUNTS_TRANSACTIONS_LIST
        }
    }

    private reactToNavBarRightButtonClicked() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            if (this.active_user_account_index > -1) {
                this.APP.navigate('add_transaction', {usa_id: this.ACCOUNTS_CAROUSEL_DATA[this.active_user_account_index].user_account_id})
            }
        })
    }
}