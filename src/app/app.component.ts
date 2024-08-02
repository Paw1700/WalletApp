import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BankChooseBarComponent } from './components/bank_choose_bar/bank_choose_bar.component';
import { HttpClient } from '@angular/common/http';
import { Bank } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BankChooseBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  http = inject(HttpClient)
  banks: Bank[] = []

  ngOnInit() {
    this.http.get<Bank[]>('/assets/data/banks.json').subscribe( banks => {
      this.banks = banks
    })
  }
}
