import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountBarComponent } from './components/account_bar/account_bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccountBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
