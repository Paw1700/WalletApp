import { Component } from "@angular/core";
import { AccountBarComponent } from "../../components/account_bar/account_bar.component";
import { TransactionBarComponent } from "../../components/transaction_bar/transaction_bar.component";

@Component({
    selector: 'home_page',
    standalone: true,
    imports: [AccountBarComponent, TransactionBarComponent],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss'
})
export class HomePage {

}