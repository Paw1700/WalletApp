import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BootPage } from './pages/boot/boot.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BootPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
