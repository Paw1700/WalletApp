import { Component, inject, OnInit } from "@angular/core";
import { BankChooseBarComponent } from "../../components/bank_choose_bar/bank_choose_bar.component";
import { HttpClient } from "@angular/common/http";
import { Account, Bank } from "../../models";
import { AccountChooseBarComponent } from "../../components/account_choose_bar/account_choose_bar.component";
import { NumberInputComponent } from "../../components/number_input_bar/number_input_bar.component";

@Component({
    selector: 'add_account_page',
    standalone: true,
    imports: [
        BankChooseBarComponent,
        AccountChooseBarComponent,
        NumberInputComponent
    ],
    templateUrl: './add_account.page.html',
    styleUrl: './add_account.page.scss'
})
export class AddAccountPage implements OnInit {
    http = inject(HttpClient)
    banks_list: Bank[] = []
    accounts_list: Account[] = []

    ngOnInit(): void {
        this.http.get<Bank[]>('/assets/data/banks.json').subscribe(banks => {
            this.banks_list = banks
        })
    }

    receiveAccounts(bank_id: any) {
        if (bank_id !== '') {
            this.getAccountsList(bank_id).then(list => this.accounts_list = list)
        }
    }

    private getAccountsList(bank_id: string): Promise<Account[]> {
        return new Promise((resolve, reject) => {
            this.http.get<Account[]>('/assets/data/accounts.json').subscribe(accounts => {
                resolve(accounts.filter(v => v.bank_id == bank_id))
            })
        })
    }
}