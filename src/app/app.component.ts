import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserProfileSetupPage } from './pages/user_profile_setup/user_profile_setup.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserProfileSetupPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
