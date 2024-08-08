import { animate, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";

@Component({
    selector: 'boot_page',
    standalone: true,
    templateUrl: './boot.page.html',
    styleUrl: './boot.page.scss',
    animations: [
        trigger('app_logo', [
            transition('void => *', [
                style({
                    position: 'relative',
                    top: '-2.5vh',
                    opacity: 0
                }),
                animate('300ms 750ms ease-out', style({
                    top: '0',
                    opacity: 1
                }))
            ])
        ]),
        trigger('app_name', [
            transition('void => *', [
                style({
                    position: 'relative',
                    top: '2.5vh',
                    opacity: 0
                }),
                animate('300ms 750ms ease-out', style({
                    top: '0',
                    opacity: 1
                }))
            ])
        ])
    ]
})
export class BootPage {}