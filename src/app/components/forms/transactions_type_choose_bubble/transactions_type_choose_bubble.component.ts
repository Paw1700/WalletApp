import { Component } from "@angular/core";
import { TransactionTypeChooseBarComponentInterface } from "../../interfaces/transaction_type_chosse_bar.component";

@Component({
    selector: 'transaction_type_choose_bubble',
    standalone: true,
    templateUrl: './transactions_type_choose_bubble.component.html',
    styleUrl: './transactions_type_choose_bubble.component.scss'
})
export class TransactionTypeChooseBubble extends TransactionTypeChooseBarComponentInterface {
    // @Output() choosed_transactions_type = new EventEmitter<Transaction_Type | null>()
    // is_box_open = false
    // transaction_type: Transaction_Type | null = null

    // openBox() {
    //     this.is_box_open = true
    // }

    // changeTransactionsType(type: Transaction_Type | null) {
    //     if (type === this.transaction_type) {
    //         this.transaction_type = null
    //     } else {
    //         this.transaction_type = type
    //     }
    //     this.is_box_open = false
    //     this.choosed_transactions_type.emit(this.transaction_type)
    // }
}