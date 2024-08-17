import { Component, inject, OnInit } from "@angular/core";
import { TransactionTypeChooseBar } from "../../components/transaction_type_choose_bar/transaction_type_chosse_bar.component";
import { CategoryChooseBar } from "../../components/category_choose_bar/category_choose_bar.component";
import { NumberInputComponent } from "../../components/number_input_bar/number_input_bar.component";
import { ReceiverChooseBar } from "../../components/receiver_choose_bar/receiver_choose_bar.component";
import { Transaction, Transaction_Type } from "../../models";
import { TextInputBar } from "../../components/text_input_bar/text_input_bar.component";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'add_transaction_page',
    standalone: true,
    imports: [
        TransactionTypeChooseBar,
        CategoryChooseBar,
        NumberInputComponent,
        ReceiverChooseBar,
        TextInputBar
    ],
    templateUrl: './add_transaction.page.html',
    styleUrl: './add_transaction.page.scss'
})
export class AddTransactionPage implements OnInit{
    readonly ROUTE = inject(ActivatedRoute)

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
        this.ROUTE.queryParamMap.subscribe( data => {
            this.new_transaction.user_account_id = data.get('id')!
        })
    }

    handleFormInput(type: 'transaction_type' | 'category_id' | 'receiver_id' | 'amount' | 'desc', payload: any) {
        switch(type) {
            case 'transaction_type':
                this.transaction_type = payload
                break
            case 'category_id':
                this.new_transaction.category_id = payload
                break
            case 'receiver_id':
                this.new_transaction.receiver_id = payload
                break
            case 'amount':
                if (this.transaction_type === 'expense'){
                    this.new_transaction.amount = -Number(payload)
                } else {
                    this.new_transaction.amount = Number(payload)
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
}