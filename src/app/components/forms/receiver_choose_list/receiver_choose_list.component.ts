import { Component } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { ReceiverChooseBarComponentInterface } from "../../interfaces/receiver_choose_bar.component";

@Component({
    selector: 'receiver_choose_list',
    standalone: true,
    templateUrl: './receiver_choose_list.component.html',
    styleUrl: './receiver_choose_list.component.scss',
    animations: [
        trigger('list', [
            transition(":enter", [
                style({
                    opacity: 0,
                    height: 0
                }),
                animate('250ms 50ms ease-out', style({
                    opacity: 1,
                    height: "*"
                }))
            ]),
            transition(":leave", [
                animate('250ms 50ms ease-out', style({
                    opacity: 0,
                    height: 0
                }))
            ])
        ]),
        trigger('badge', [
            transition(":enter", [
                style({
                    opacity: 0,
                    width: 0
                }),
                animate('250ms 50ms ease-out', style({
                    opacity: 1,
                    width: "*"
                }))
            ]),
            transition(":leave", [
                animate('250ms 50ms ease-out', style({
                    opacity: 0,
                    width: 0
                }))
            ])
        ])
    ]
})
export class ReceiverChooseList extends ReceiverChooseBarComponentInterface { }