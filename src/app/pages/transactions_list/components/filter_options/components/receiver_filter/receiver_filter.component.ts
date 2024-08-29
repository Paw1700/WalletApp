import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Receiver, TransactionType } from "../../../../../../models";

@Component({
    selector: 'receiver_filter',
    standalone: true,
    templateUrl: './receiver_filter.component.html',
    styleUrl: './receiver_filter.component.scss'
})
export class ReceiverFilter implements OnInit{
    @Input({required: true, alias: 'RECEIVERS_LIST'}) FULL_RECEIVERS_LIST: Receiver[] = []
    @Input({required: true}) TRANSACTIONS_TYPE: TransactionType | null = null
    @Output() choosen_receiver = new EventEmitter<Receiver | null>()

    receivers_list: Receiver[] = []
    choosed_receiver: Receiver | null = null
    is_box_open = false

    ngOnInit(): void {
        this.receivers_list = this.FULL_RECEIVERS_LIST
    }

    openBox() {
        this.is_box_open = true
    }

    chooseReceiver(receiver: Receiver | null) {
        this.choosed_receiver = receiver
        this.is_box_open = false
        this.choosen_receiver.emit(receiver)
    }

    filterReceivers(e: any) {
        const value = e.target.value as string
        if (value === '') {
            this.receivers_list = this.FULL_RECEIVERS_LIST
            return
        }
        this.receivers_list = this.FULL_RECEIVERS_LIST.filter( rec => rec.name.toLowerCase().includes(value.toLowerCase()))
    }
}