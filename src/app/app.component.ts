import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BankChooseBarComponent } from './components/bank_choose_bar/bank_choose_bar.component';
import { HttpClient } from '@angular/common/http';
import { Account, Bank } from './models';
import { AccountChooseBarComponent } from './components/account_choose_bar/account_choose_bar.component';
import { NumberInputComponent } from './components/number_input_bar/number_input_bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BankChooseBarComponent, AccountChooseBarComponent, NumberInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  http = inject(HttpClient)
  banks: Bank[] = []
  accounts: Account[] = []

  ngOnInit() {
    this.http.get<Bank[]>('/assets/data/banks.json').subscribe( banks => {
      this.banks = banks
      this.getBanksAccountsList(banks[0].id)
    })
  }

  getBanksAccountsList(bank_id: string) {
    this.http.get<Account[]>('/assets/data/accounts.json').subscribe( accounts => {
      this.accounts = accounts.filter(account => account.bank_id === bank_id)
    })
  }
}
