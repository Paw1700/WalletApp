import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddAccountPage } from './pages/add_account/add_account.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddAccountPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
}
