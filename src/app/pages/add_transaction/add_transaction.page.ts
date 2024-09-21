import { Component, inject, OnInit } from "@angular/core";
import { TransactionTypeChooseWithTitle } from "../../components/forms/transaction_type_choose_with_title/transaction_type_choose_with_titlecomponent";
import { CategoryChooseScroll } from "../../components/forms/category_choose_scroll/category_choose_scroll.component";
import { NumberInput } from "../../components/forms/number_input_bar/number_input_bar.component";
import { ReceiverChooseList } from "../../components/forms/receiver_choose_list/receiver_choose_list.component";
import { Category, ErrorID, Receiver, Transaction, TransactionType } from "../../models";
import { TextInputBar } from "../../components/forms/text_input_bar/text_input_bar.component";
import { ActivatedRoute } from "@angular/router";
import { DateChooseBar } from "../../components/forms/date_choose_bar/date_choose_bar.component";
import { APP_SERVICE } from "../../app.service";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";
import { AccountBarComponent, AccountBarWithLimitData } from "../../components/single_components/account_bar/account_bar.component";
import { AddTransactionPageData } from "./resolvers/add_transaction_data_resolver.resolver";

@Component({
    selector: 'add_transaction_page',
    standalone: true,
    imports: [
        TransactionTypeChooseWithTitle,
        CategoryChooseScroll,
        NumberInput,
        ReceiverChooseList,
        TextInputBar,
        DateChooseBar,
        AccountBarComponent
    ],
    templateUrl: './add_transaction.page.html',
    styleUrl: './add_transaction.page.scss'
})
export class AddTransactionPage extends NgUnsubscriber implements OnInit {
    readonly APP = inject(APP_SERVICE)
    readonly ROUTE = inject(ActivatedRoute)
    
    RECEIVERS_LIST: Receiver[] = []
    CATEGORIES_LIST: Category[] = []
    ACCOUNT_BAR_DATA!: AccountBarWithLimitData

    transaction_type: TransactionType = 'expense'
    new_transaction: Transaction = {
        id: "",
        date: new Date(),
        user_account_id: "",
        category_id: "",
        receiver_id: "",
        amount: 0,
        description: ""
    }

    ngOnInit(): void {
        this.fetchRouteDataAndPreparePageData()
        this.reactToNavBarLeftButtonClicked()
        this.reactToNavBarRightButtonClicked()
        this.setAccentColor()
    }

    handleFormInput(type: 'date' | 'transaction_type' | 'category_id' | 'receiver_id' | 'amount' | 'desc', payload: any) {
        switch (type) {
            case 'date':
                this.new_transaction.date = payload
                break
            case 'transaction_type':
                this.transaction_type = payload
                this.setTransactionAmount()
                break
            case 'category_id':
                this.new_transaction.category_id = payload.id
                break
            case 'receiver_id':
                this.new_transaction.receiver_id = payload
                break
            case 'amount':
                this.setTransactionAmount(payload)
                break
            case 'desc':
                this.new_transaction.description = payload
                break
        }
    }

    changeTransactionType(type: TransactionType) {
        this.transaction_type = type
    }

    private setTransactionAmount(amount?: number | null) {
        if (amount !== undefined) {
            if (amount !== null) {
                if (this.transaction_type === 'expense') {
                    this.new_transaction.amount = -Math.abs(amount)
                } else if (this.transaction_type = 'income') {
                    this.new_transaction.amount = Math.abs(amount)
                }
            } else {
                this.new_transaction.amount = 0
            }
        } else {
            if (this.transaction_type === 'expense') {
                this.new_transaction.amount = -Math.abs(this.new_transaction.amount)
            } else if (this.transaction_type = 'income') {
                this.new_transaction.amount = Math.abs(this.new_transaction.amount)
            }
        }
    }

    private fetchRouteDataAndPreparePageData() {
        this.ROUTE.data.subscribe(route_data => {
            const PAGE_DATA: AddTransactionPageData = route_data['add_transaction_page_data']
            this.RECEIVERS_LIST = PAGE_DATA.receivers
            this.CATEGORIES_LIST = PAGE_DATA.categories
            this.ACCOUNT_BAR_DATA = PAGE_DATA.user_account_bar_data
            if (PAGE_DATA.transaction !== null) {
                this.new_transaction = PAGE_DATA.transaction
                this.transaction_type = PAGE_DATA.transaction.amount > 0 ? 'income' : 'expense'
            } else {
                this.new_transaction.user_account_id = this.ACCOUNT_BAR_DATA.user_account_id
            }
        })
    }

    private setAccentColor() {
        const account_gradient_background = this.ACCOUNT_BAR_DATA.account.apperance.background_gradient
        this.APP.APPERANCE.setAppAccentColor(account_gradient_background.bottom !== null ? account_gradient_background.bottom : account_gradient_background.top)
    }

    private reactToNavBarLeftButtonClicked() {
        this.APP.STATE.nav_bar_left_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            this.navigateBack()
        })
    }
    
    private reactToNavBarRightButtonClicked() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(async () => {
            try {
                if (this.new_transaction.id !== '') {
                    await this.updateTransaction()
                } else {
                    await this.newTransaction()
                }
                this.navigateBack()
            } catch (err) {
                this.APP.STATE.errorHappend(err as ErrorID)
            }
        })
    }

    private navigateBack() {
        if (this.APP.STATE.last_app_location$.value !== null) {
            this.APP.navigate(this.APP.STATE.last_app_location$.value)
            this.APP.STATE.last_app_location$.next(null)
        } else {
            this.APP.navigate('home')
        }
    }

    private updateTransaction(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const transaction_old_data = await this.APP.TRANSACTION.getOne(this.new_transaction.id)
                const amount_diff = - (transaction_old_data.amount - this.new_transaction.amount)
                await this.APP.USER_ACCOUNT.changeAvaibleAmount(this.new_transaction.user_account_id, amount_diff)
                await this.APP.TRANSACTION.update(this.new_transaction)
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    private newTransaction(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.APP.USER_ACCOUNT.changeAvaibleAmount(this.new_transaction.user_account_id, this.new_transaction.amount)
                await this.APP.TRANSACTION.save(this.new_transaction)
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }
}