import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTransactionPage } from './pages/add_transaction/add_transaction.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddTransactionPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
}
