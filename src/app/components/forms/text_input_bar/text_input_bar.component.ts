import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { OpenAbleComponentInterface } from "../../interfaces/openable.component";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
    selector: "text_input_bar",
    standalone: true,
    templateUrl: './text_input_bar.component.html',
    styleUrl: './text_input_bar.component.scss',
    animations: [
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
export class TextInputBar extends OpenAbleComponentInterface implements OnChanges {
    @Input({required: true}) title = ''
    @Input() placeholder = ''
    @Input() pre_inputed_text = ''
    @Output('inputed_text') emit_inputed_text = new EventEmitter<string>()

    inputed_text = ''

    ngOnChanges(changes: SimpleChanges): void {
        if (this.pre_inputed_text !== '') {
            this.inputed_text = this.pre_inputed_text
        }    
    }

    setValue(value: any) {
        this.inputed_text = value.target.value
        this.emit_inputed_text.emit(this.inputed_text)
    }
}