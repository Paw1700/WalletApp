import { Component, inject, OnInit } from "@angular/core";
import { TransactionTypeChooseBar } from "../../components/transaction_type_choose_bar/transaction_type_chosse_bar.component";
import { CategoryChooseBar } from "../../components/category_choose_bar/category_choose_bar.component";
import { NumberInputComponent } from "../../components/number_input_bar/number_input_bar.component";
import { ReceiverChooseBar } from "../../components/receiver_choose_bar/receiver_choose_bar.component";
import { Category, Receiver, Transaction, Transaction_Type } from "../../models";
import { TextInputBar } from "../../components/text_input_bar/text_input_bar.component";
import { ActivatedRoute } from "@angular/router";
import { DateChooseBar } from "../../components/date_choose_bar/date_choose_bar.component";
import { APP_SERVICE } from "../../app.service";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";
import { AccountBarComponent, AccountBarComponentData } from "../../components/account_bar/account_bar.component";

@Component({
    selector: 'add_transaction_page',
    standalone: true,
    imports: [
        TransactionTypeChooseBar,
        CategoryChooseBar,
        NumberInputComponent,
        ReceiverChooseBar,
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
    ACCOUNT_BAR_DATA!: AccountBarComponentData

    transaction_type: Transaction_Type = 'expense'
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
                this.new_transaction.category_id = payload
                break
            case 'receiver_id':
                this.new_transaction.receiver_id = payload
                break
            case 'amount':
                if (this.transaction_type === 'expense') {
                    this.new_transaction.amount = -Math.abs(payload)
                } else if (this.transaction_type = 'income') {
                    this.new_transaction.amount = Math.abs(payload)
                }
                break
            case 'desc':
                this.new_transaction.description = payload
                break
        }
    }

    changeTransactionType(type: Transaction_Type) {
        this.transaction_type = type
    }

    private fetchRouteData() {
        this.ROUTE.queryParamMap.subscribe(data => {
            this.new_transaction.user_account_id = data.get('id')!
        })
        this.ROUTE.data.subscribe( route_data => {
            this.RECEIVERS_LIST = route_data['receivers']
            this.CATEGORIES_LIST = route_data['categories']
            this.ACCOUNT_BAR_DATA = route_data['account_bar_data']
        })
    }

    private reactToNavBarLeftButtonClicked() {
        this.APP.STATE.nav_bar_left_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            this.APP.navigate('home')
        })
    }
    
    private reactToNavBarRightButtonClicked() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            this.APP.DATA.newTransaction(this.new_transaction)
                .then(() => {
                    this.APP.navigate('home')
                })
                .catch((err) => {
                    this.APP.STATE.errorHappend(err)
                })
        })
    }
}