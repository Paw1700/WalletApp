import { Component } from "@angular/core";
import { TransactionTypeChooseBarComponentInterface } from "../../interfaces/transaction_type_chosse_bar.component";

@Component({
    selector: 'transaction_type_choose_bubble',
    standalone: true,
    templateUrl: './transactions_type_choose_bubble.component.html',
    styleUrl: './transactions_type_choose_bubble.component.scss'
})
export class TransactionTypeChooseBubble extends TransactionTypeChooseBarComponentInterface { }