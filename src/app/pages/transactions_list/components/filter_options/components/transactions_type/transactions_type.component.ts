import { Component, EventEmitter, Output } from "@angular/core";
import { Transaction_Type } from "../../../../../../models";

@Component({
    selector: 'transaction_type_filter',
    standalone: true,
    templateUrl: './transactions_type.component.html',
    styleUrl: './transactions_type.component.scss'
})
export class TransactionTypeFilter {
    @Output() choosed_transactions_type = new EventEmitter<Transaction_Type | null>()
    is_box_open = false
    transaction_type: Transaction_Type | null = null

    openBox() {
        this.is_box_open = true
    }

    changeTransactionsType(type: Transaction_Type | null) {
        if (type === this.transaction_type) {
            this.transaction_type = null
        } else {
            this.transaction_type = type
        }
        this.is_box_open = false
        this.choosed_transactions_type.emit(this.transaction_type)
    }
}