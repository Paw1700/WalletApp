import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ArrowButton } from "../../UI/arrow_button.component";

@Component({
    selector: 'carousel_switcher',
    standalone: true,
    imports: [
        ArrowButton
    ],
    templateUrl: './carousel_switcher.component.html',
    styleUrl: './carousel_switcher.component.scss'
})
export class CarouselSwitcher {
    @Input() carousel_list: boolean[] = []
    @Output('actual_active_index') actual_active_index_emitter = new EventEmitter<number>()   
    actual_active_index = 0

    goDirection(direction: 'left' | 'right') {
        switch(direction) {
            case "left":
                if (this.actual_active_index > 0) {
                    this.actual_active_index -= 1
                    this.actual_active_index_emitter.emit(this.actual_active_index)
                }
                break
            case "right":
                if (this.actual_active_index < this.carousel_list.length - 1) {
                    this.actual_active_index += 1
                    this.actual_active_index_emitter.emit(this.actual_active_index)
                }
                break
        }
    }
}