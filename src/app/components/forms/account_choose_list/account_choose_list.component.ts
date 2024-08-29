import { Component } from "@angular/core";
import { AccountBarComponent } from "../../single_components/account_bar/account_bar.component";
import { animate, style, transition, trigger } from "@angular/animations";
import { AccountChooseBarComponentInterface } from "../../interfaces/account_choose_bar.component";

@Component({
    selector: 'account_choose_list',
    standalone: true,
    imports: [
        AccountBarComponent
    ],
    templateUrl: './account_choose_list.component.html',
    styleUrl: './account_choose_list.component.scss',
    animations: [
        trigger('TITLE_BAR', [
            transition(":leave", [
                animate('100ms 50ms ease-in', style({
                    height: 0,
                    opacity: 0
                }))
            ]),
            transition(":enter", [
                style({
                    opacity: 0,
                    height: 0
                }),
                animate('250ms 50ms ease-out', style({
                    height: '*',
                    opacity: 1
                }))
            ])
        ]),
        trigger('ACCOUNTS_LIST', [
            transition(":leave", [
                animate('100ms 50ms ease-in', style({
                    height: 0,
                    opacity: 0
                }))
            ]),
            transition(":enter", [
                style({
                    opacity: 0,
                    height: 0
                }),
                animate('250ms 50ms ease-out', style({
                    height: '*',
                    opacity: 1
                }))
            ])
        ])
    ]
})
export class AccountChooseList extends AccountChooseBarComponentInterface {

}