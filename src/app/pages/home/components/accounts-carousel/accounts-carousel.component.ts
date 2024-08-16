import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AccountBar_Data, AccountBarComponent } from "../../../../components/account_bar/account_bar.component";
import { NumberSeparator } from "../../../../pipes/number_separator.pipe";
import { NgStyle } from "@angular/common";

@Component({
    selector: 'accounts_carousel',
    standalone: true,
    imports: [
        AccountBarComponent,
        NumberSeparator,
        NgStyle
    ],
    templateUrl: './accounts-carousel.component.html',
    styleUrl: './accounts-carousel.component.scss'
})
export class AccountsCarousel {
    @Input() accounts_data: AccountBar_Data[] = []
    @Output() active_account_number = new EventEmitter<number>()

    scroll_position = 0
    active_list_indicator = -1
    show_list_indicator = false
    private start_touch_position = { x: 0, y: 0 }
    private end_touch_posistion = { x: 0, y: 0 }
    private readonly DIFF_Y_LIMIT = 50
    private readonly DIFF_X_TRIGGER_POINT = 30

    handleSwipeGesture(e: TouchEvent, type: 'start' | 'end') {
        switch (type) {
            case 'start':
                this.start_touch_position.x = e.changedTouches[0].clientX
                this.start_touch_position.y = e.changedTouches[0].clientY
                break
            case 'end':
                this.end_touch_posistion.x = e.changedTouches[0].clientX
                this.end_touch_posistion.y = e.changedTouches[0].clientY
                this.swipeCarousel()
                break
        }
    }

    private swipeCarousel() {
        const position_x_diff = this.start_touch_position.x - this.end_touch_posistion.y
        const position_y_diff = this.start_touch_position.y - this.end_touch_posistion.y

        if (Math.abs(position_y_diff) < this.DIFF_Y_LIMIT) {
            if (position_x_diff > this.DIFF_X_TRIGGER_POINT) {// SWIPE TO LEFT <--- 
                if (this.scroll_position >= 0 && this.scroll_position < this.accounts_data.length * 100) {
                    this.scroll_position += 100
                    this.informOfAccountChange()
                }
            }
            if (position_x_diff < -this.DIFF_X_TRIGGER_POINT) { // SWIPE TO RIGHT -->
                if (this.scroll_position > 0 && this.scroll_position <= this.accounts_data.length * 100) {
                    this.scroll_position -= 100
                    this.informOfAccountChange()
                }
            }
        }
    }

    private informOfAccountChange() {
        let account_number = this.active_list_indicator = (this.scroll_position / 100) - 1
        this.active_account_number.emit(account_number)
        this.show_list_indicator = true
        setTimeout(() => {
            this.show_list_indicator = false
        }, 500);
    }
}