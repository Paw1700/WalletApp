import { Component, inject, OnInit } from "@angular/core";
import { TransactionTypeChooseWithTitle } from "../../components/forms/transaction_type_choose_with_title/transaction_type_choose_with_titlecomponent";
import { CategoryChooseScroll } from "../../components/forms/category_choose_scroll/category_choose_scroll.component";
import { NumberInput } from "../../components/forms/number_input_bar/number_input_bar.component";
import { ReceiverChooseList } from "../../components/forms/receiver_choose_list/receiver_choose_list.component";
import { Account, Category, ErrorID, Receiver, Transaction, TransactionType } from "../../models";
import { TextInputBar } from "../../components/forms/text_input_bar/text_input_bar.component";
import { ActivatedRoute } from "@angular/router";
import { DateChooseBar } from "../../components/forms/date_choose_bar/date_choose_bar.component";
import { APP_SERVICE } from "../../app.service";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";
import { AccountBarComponent, AccountBarFundsData } from "../../components/single_components/account_bar/account_bar.component";

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
    ACCOUNT_BAR_DATA!: AddTransactionPageAccountData

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
        this.fetchRouteData()
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
                if (this.transaction_type === 'expense') {
                    this.new_transaction.amount = -Math.abs(this.new_transaction.amount)
                } else if (this.transaction_type = 'income') {
                    this.new_transaction.amount = Math.abs(this.new_transaction.amount)
                }
                break
            case 'category_id':
                this.new_transaction.category_id = payload.id
                break
            case 'receiver_id':
                this.new_transaction.receiver_id = payload
                break
            case 'amount':
                if (payload !== null) {
                    if (this.transaction_type === 'expense') {
                        this.new_transaction.amount = -Math.abs(payload)
                    } else if (this.transaction_type = 'income') {
                        this.new_transaction.amount = Math.abs(payload)
                    }
                } else {
                    this.new_transaction.amount = 0
                }
                break
            case 'desc':
                this.new_transaction.description = payload
                break
        }
    }

    changeTransactionType(type: TransactionType) {
        this.transaction_type = type
    }

    private fetchRouteData() {
        this.ROUTE.queryParamMap.subscribe(data => {
            const user_account_id = data.get('usa_id')
            const transaction_id = data.get('tr_id')
            if (user_account_id !== null && transaction_id === null) {
                this.new_transaction.user_account_id = user_account_id
            } else if (user_account_id === null && transaction_id !== null) {
                this.APP.TRANSACTION.getOne(transaction_id)
                    .then( transaction => {
                        this.transaction_type = transaction.amount > 0 ? 'income' : 'expense'
                        this.new_transaction = {
                            id: transaction.id,
                            date: transaction.date,
                            user_account_id: transaction.user_account_id,
                            category_id: transaction.category_id,
                            receiver_id: transaction.receiver_id,
                            amount: transaction.amount,
                            description: transaction.description
                        }
                    })
            } else {
                console.error('Lack of user account id or transaction id!');
                // !!! ADD ERROR CODE !!!
            }
        })
        this.ROUTE.data.subscribe( route_data => {
            this.RECEIVERS_LIST = route_data['receivers']
            this.CATEGORIES_LIST = route_data['categories']
            this.ACCOUNT_BAR_DATA = route_data['account_bar_data']
        })
    }

    private setAccentColor() {
        const account_gradient_background = this.ACCOUNT_BAR_DATA.account.apperance.background_gradient
        this.APP.APPERANCE.setAppAccentColor(account_gradient_background.bottom !== null ? account_gradient_background.bottom : account_gradient_background.top)
    }

    private reactToNavBarLeftButtonClicked() {
        this.APP.STATE.nav_bar_left_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            if (this.APP.STATE.last_app_location$.value !== null) {
                this.APP.navigate(this.APP.STATE.last_app_location$.value)
                this.APP.STATE.last_app_location$.next(null)
            } else {
                this.APP.navigate('home')
            }
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
                if (this.APP.STATE.last_app_location$.value !== null) {
                    this.APP.navigate(this.APP.STATE.last_app_location$.value)
                    this.APP.STATE.last_app_location$.next(null)
                } else {
                    this.APP.navigate('home')
                }
            } catch (err) {
                this.APP.STATE.errorHappend(err as ErrorID)
            }
        })
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

export type AddTransactionPageAccountData = {
    account: Account,
    funds_data: AccountBarFundsData
}