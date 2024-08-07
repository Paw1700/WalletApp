import { Component } from "@angular/core";
import { TransactionTypeChooseBar } from "../../components/transaction_type_choose_bar/transaction_type_chosse_bar.component";
import { CategoryChooseBar } from "../../components/category_choose_bar/category_choose_bar.component";
import { NumberInputComponent } from "../../components/number_input_bar/number_input_bar.component";
import { ReceiverChooseBar } from "../../components/receiver_choose_bar/receiver_choose_bar.component";
import { Transaction_Type } from "../../models";
import { TextInputBar } from "../../components/text_input_bar/text_input_bar.component";

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
export class AddTransactionPage {
    transaction_type: Transaction_Type = 'expense'

    changeTransactionType(type: Transaction_Type) {
        this.transaction_type = type
    }
}