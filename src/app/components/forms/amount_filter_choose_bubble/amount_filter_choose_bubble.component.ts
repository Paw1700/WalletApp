import { Component, EventEmitter, Output } from "@angular/core";
import { NumberSeparator } from "../../../pipes/number_separator.pipe";
import { OpenAbleComponentInterface } from "../../interfaces/openable.component";
import { TransactionsFilterNumberFromToOptions } from "../../../services/transaction.service";

@Component({
    selector: 'amount_filter_choose_bubble',
    standalone: true,
    imports: [
        NumberSeparator
    ],
    templateUrl: './amount_filter_choose_bubble.component.html',
    styleUrl: './amount_filter_choose_bubble.component.scss'
})
export class AmountFilterChooseBubble extends OpenAbleComponentInterface {
    @Output() chossen_amount_filter_values = new EventEmitter<TransactionsFilterNumberFromToOptions | null>()

    from: number | null = null
    to: number | null = null
    from_input_box_error = false
    to_input_box_error = false

    closeBox() {
        this.emitNewValue()
        this.changeComponentOpenessState(false)
    }

    handleAmountInput(type: 'from' | 'to', e: any) {
        const value = e.target.value !== '' ? Number(e.target.value) : null
        if (type === 'from') {
            this.from = value
            if (value && this.to && this.to <= value) {
                this.from_input_box_error = true
            } else {
                this.from_input_box_error = false
            }
        } else {
            this.to = value
            if (value && this.from && this.from >= value) {
                this.to_input_box_error = true
            } else {
                this.to_input_box_error = false
            }
        }
    }

    resetForm() {
        this.from = null
        this.to = null
        this.closeBox()
    }

    private emitNewValue() {
        this.chossen_amount_filter_values.emit({from: this.from, to: this.to})
    }
}