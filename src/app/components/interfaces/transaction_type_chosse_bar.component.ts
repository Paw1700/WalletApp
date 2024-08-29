import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OpenAbleComponentInterface } from "./openable.component";
import { TransactionType } from "../../models";


@Component({
    selector: 'transaction_choose_bar',
    standalone: true,
    template: ''
})
export class TransactionTypeChooseBarComponentInterface extends OpenAbleComponentInterface {
    @Input() choosed_type: TransactionType | null = null
    @Output('choosen_type') emitter_choosen_type = new EventEmitter<TransactionType | null>()

    setType(type: TransactionType) {
        if (this.choosed_type === type) {
            this.choosed_type = null
            this.emitter_choosen_type.emit(null)
        } else {
            this.choosed_type = type
            this.emitter_choosen_type.emit(type)
        }
        this.changeComponentOpenessState(false)
    }
}