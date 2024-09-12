import { NgStyle } from "@angular/common";
import { AfterViewChecked, AfterViewInit, Component, EventEmitter, input, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'scroll_side_options',
    standalone: true,
    imports: [
        NgStyle
    ],
    templateUrl: './scroll_side_options.component.html',
    styleUrl: './scroll_side_options.component.scss'
})
export class ScrollSideOptions implements AfterViewChecked {
    @Input() LEFT_SIDE: ScrollSideBarOption | null = null
    @Input() RIGHT_SIDE: ScrollSideBarOption | null = null
    @Input({ required: true }) component_individual_id = ''
    @Output() leftSideClicked = new EventEmitter<any>()
    @Output() rightSideClicked = new EventEmitter<any>()

    ngAfterViewChecked(): void {
        if (this.LEFT_SIDE) {
            const div = document.getElementById(this.component_individual_id)
            div?.scrollTo({ left: ((this.LEFT_SIDE?.width_in_percent) / 100) * div?.offsetWidth })
        }
    }

    handleSideClick(side: 'LEFT' | 'RIGHT') {
        switch (side) {
            case "LEFT":
                this.leftSideClicked.emit(this.LEFT_SIDE?.return_value)
                break
            case "RIGHT":
                this.rightSideClicked.emit(this.RIGHT_SIDE?.return_value)
                break
        }
        this.setScrollPosition('center')
    }

    handleTouchEnd() {
        const div = document.getElementById(this.component_individual_id)
        if (!div) {
            console.error('No DIV');
            return
        }
        const scroll_position = Number(Math.round(div.scrollLeft * 100 / div.offsetWidth)) + 1
        if (scroll_position < 15) {
            this.setScrollPosition('left')
        } else if (scroll_position > 35) {
            this.setScrollPosition('right')
        } else {
            this.setScrollPosition('center')
        }
    }

    private setScrollPosition(position: 'left' | 'center' | 'right') {
        const div = document.getElementById(this.component_individual_id)
        if (!div) {
            console.error('No DIV');
            return
        }
        switch (position) {
            case "left":
                div.scrollTo({ left: 0, behavior: 'smooth' })
                break
            case "center":
                div.scrollTo({ left: 0.25 * div.offsetWidth, behavior: 'smooth' })
                break
            case "right":
                div.scrollTo({ left: 0.52 * div.offsetWidth, behavior: 'smooth' })
                break
        }
    }
}

export type ScrollSideBarOption = {
    color: string | null,
    width_in_percent: number,
    round_edges: boolean
    text: string,
    image: string | null,
    return_value: any | null
}