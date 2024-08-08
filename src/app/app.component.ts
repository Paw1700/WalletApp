import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_SERVICE } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  APP = inject(APP_SERVICE)

  ngOnInit(): void {
    this.APP.startApp()
  }
}
