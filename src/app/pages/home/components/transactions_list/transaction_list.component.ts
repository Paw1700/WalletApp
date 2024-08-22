import { Component, Input } from "@angular/core";
import { TransactionBarComponent, TransactionBarComponentData } from "../../../../components/transaction_bar/transaction_bar.component";

@Component({
    selector: 'transaction_list',
    standalone: true,
    imports: [
        TransactionBarComponent
    ],
    templateUrl: './transaction_list.component.html',
    styleUrl: './transaction_list.component.scss'
})
export class TransactionList {
    @Input({required: true}) transactions_list: TransactionBarComponentData[] = []
}