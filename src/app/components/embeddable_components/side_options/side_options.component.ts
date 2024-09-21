import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "side_options",
    standalone: true,
    templateUrl: "./side_options.component.html",
    styleUrl: "./side_options.component.scss"
})
export class SideOptionsComponent {
    @Input() SIDE: SideOptionsComponentData[] | null = null
    @Output('sideClicked') sideClickedEmitter = new EventEmitter<{option_number: number, data: any}>()

    show_side: boolean = false

    contentClicked() {
        this.show_side = !this.show_side
    }

    sideClicked(option_index: number, data: any) {
        this.sideClickedEmitter.emit({option_number: option_index + 1, data: data})
        this.show_side = false
    }
}

export type SideOptionsComponentData = {
    color: string | null,
    text: string,
    image: string | null,
    return_value: any | null
}