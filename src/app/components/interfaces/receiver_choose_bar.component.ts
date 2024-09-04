import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { Receiver, TransactionType } from "../../models";
import { OpenAbleComponentInterface } from "../interfaces/openable.component";

@Component({
    selector: 'receiver_choose_bar',
    standalone: true,
    template: ''
})
export class ReceiverChooseBarComponentInterface extends OpenAbleComponentInterface implements OnChanges {
    @Input({required: true, alias: 'RECEIVERS_LIST'}) FULL_RECEIVERS_LIST: Receiver[] = []
    @Input({required: true}) TRANSACTION_TYPE: TransactionType = 'expense'
    @Input() pre_selected_receiver_id = ''
    @Output() choosed_receiver_id = new EventEmitter<string | null>()
    
    receivers_list: Receiver[] = []
    choosed_receiver: Receiver | null = null

    ngOnChanges(changes: SimpleChanges): void {
        this.receivers_list = this.FULL_RECEIVERS_LIST
        if (this.pre_selected_receiver_id !== '') {
            this.choosed_receiver = this.FULL_RECEIVERS_LIST.filter(rec => rec.id === this.pre_selected_receiver_id)[0]
        }
    }

    setReceiver(receiver: Receiver | null) { 
        this.choosed_receiver = receiver
        this.changeComponentOpenessState()
        this.choosed_receiver_id.emit(receiver ? receiver.id : null)
        this.receivers_list = this.FULL_RECEIVERS_LIST
    }

    handleSearchBarInput(e: any) {
        const text = e.target.value
        if (text !== '') {
            this.receivers_list = this.FULL_RECEIVERS_LIST.filter(r => r.name.toLowerCase().includes(text.toLowerCase()))
        } else {
            this.receivers_list = this.FULL_RECEIVERS_LIST
        }
    }
}