import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'open_able',
    standalone: true,
    template: ''
})
export class OpenAbleComponent {
    @Input() component_open: boolean = false
    @Output() component_openess_state = new EventEmitter<boolean>()

    protected changeComponentOpenessState(open: boolean) {
        this.component_open = open
        this.component_openess_state.emit(open)
    }
}