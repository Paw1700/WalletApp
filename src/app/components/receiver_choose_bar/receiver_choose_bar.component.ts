import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Receiver, Transaction_Type } from "../../models";
import { OpenAbleComponent } from "../../interfaces/openable.component";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
    selector: 'receiver_choose_bar',
    standalone: true,
    templateUrl: './receiver_choose_bar.component.html',
    styleUrl: './receiver_choose_bar.component.scss',
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
export class ReceiverChooseBar extends OpenAbleComponent{
    readonly receivers_list: Receiver[] = []
    @Input() transaction_type: Transaction_Type = 'expense'
    @Output() choosed_receiver_id = new EventEmitter<string>()

    choosed_receiver: Receiver | null = null

    setReceiver(receiver: Receiver | null) { 
        this.choosed_receiver = receiver
        this.changeComponentOpenessState()
        this.choosed_receiver_id.emit(receiver ? receiver.id : '')
    }
}