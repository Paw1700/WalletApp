import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'open_able',
    standalone: true,
    template: ''
})
export class OpenAbleComponentInterface {
    @Input() component_open: boolean = false
    @Input() block_openess_state_change = false
    @Output() component_openess_state = new EventEmitter<boolean>()

    protected changeComponentOpenessState(open?: boolean) {
        if (!this.block_openess_state_change) {
            if (open) {
                this.component_open = open
                this.component_openess_state.emit(open)
            } else {
                this.component_open = !this.component_open
                this.component_openess_state.emit(this.component_open)
            }
        }
    }
}