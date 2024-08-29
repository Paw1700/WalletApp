import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Receiver, TransactionType } from "../../models";
import { OpenAbleComponentInterface } from "../interfaces/openable.component";

@Component({
    selector: 'receiver_choose_bar',
    standalone: true,
    template: ''
})
export class ReceiverChooseBarComponentInterface extends OpenAbleComponentInterface implements OnChanges{
    @Input({required: true, alias: 'RECEIVERS_LIST'}) FULL_RECEIVERS_LIST: Receiver[] = []
    @Input() TRANSACTION_TYPE: TransactionType = 'expense'
    @Output() choosed_receiver_id = new EventEmitter<string>()
    
    receivers_list: Receiver[] = []
    choosed_receiver: Receiver | null = null

    ngOnChanges(changes: SimpleChanges): void {
        this.receivers_list = this.FULL_RECEIVERS_LIST
    }

    setReceiver(receiver: Receiver | null) { 
        this.choosed_receiver = receiver
        this.changeComponentOpenessState()
        this.choosed_receiver_id.emit(receiver ? receiver.id : '')
        this.receivers_list = this.FULL_RECEIVERS_LIST
    }

    handleSearchBarInput(e: any) {
        const text = e.target.value
        if (text !== '') {
            this.receivers_list = this.FULL_RECEIVERS_LIST.filter(r => r.name.includes(text))
        } else {
            this.receivers_list = this.FULL_RECEIVERS_LIST
        }
    }
}