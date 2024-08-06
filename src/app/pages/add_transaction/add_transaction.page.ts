import { Component } from "@angular/core";
import { TransactionTypeChooseBar } from "../../components/transaction_type_choose_bar/transaction_type_chosse_bar.component";
import { CategoryChooseBar } from "../../components/category_choose_bar/category_choose_bar.component";

@Component({
    selector: 'add_transaction_page',
    standalone: true,
    imports: [
        TransactionTypeChooseBar,
        CategoryChooseBar
    ],
    templateUrl: './add_transaction.page.html',
    styleUrl: './add_transaction.page.scss'
})
export class AddTransactionPage {

}