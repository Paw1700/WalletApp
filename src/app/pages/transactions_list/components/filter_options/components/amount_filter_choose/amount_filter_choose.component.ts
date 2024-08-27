import { Component, EventEmitter, Output } from "@angular/core";
import { NumberSeparator } from "../../../../../../pipes/number_separator.pipe";

@Component({
    selector: 'amount_filter',
    standalone: true,
    imports: [
        NumberSeparator
    ],
    templateUrl: './amount_filter_choose.component.html',
    styleUrl: './amount_filter_choose.component.scss'
})
export class AmountFilterChoose {
    @Output() amount_filter_values = new EventEmitter<{from: number | null, to: number | null}>()
    active_box = false
    is_box_open = false

    from: number | null = null
    to: number | null = null
    from_input_box_error = false
    to_input_box_error = false

    openBox() {
        this.is_box_open = true
        this.active_box = true
    }

    closeBox() {
        if (this.to_input_box_error || this.from_input_box_error) {
            return 
        }
        this.is_box_open = false
        if (!this.from && !this.to) {
            this.active_box = false
        }
        this.amount_filter_values.emit({from: this.from, to: this.to})
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
}