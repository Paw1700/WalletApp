import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OpenAbleComponent } from "../../interfaces/openable.component";
import { NumberSeparator } from "../../pipes/number_separator.pipe";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'number_input',
    standalone: true,
    imports: [NumberSeparator],
    templateUrl: './number_input_bar.component.html',
    styleUrl: './number_input_bar.component.scss',
    animations: [
        trigger('input_bar', [
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
                animate('50ms ease-in', style({
                    opacity: 0,
                    height: 0
                }))
            ]),
        ])
    ]
})
export class NumberInputComponent extends OpenAbleComponent {
    @Input() title: string = ''
    @Input() currency: string = ''
    @Output() inputed_value = new EventEmitter<number>()

    inputed_number: number | null = null
    input_is_in_focus: boolean = false

    openComponent(open: boolean) {
        this.changeComponentOpenessState(open)
    }

    setValue(value: any) {
        let v = value.target.value
        if (v === '') {
            this.inputed_number = null
        } else {
            this.inputed_number = v
        }
        if (this.inputed_number) {
            this.inputed_value.emit(this.inputed_number)
        }
    }

    inputIsInFocus(bool: any) {
        this.input_is_in_focus = bool
        if (!bool) {
            this.openComponent(false)
        }
    }
}