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

    scroll_value = 0
    active_list_indicator = -1
    show_list_indicator = false

    handleScrollGesture(e: any) {
        this.scroll_value = e.target.scrollLeft
    }

    handleTouchEnd() {
        const scroll_value_divided_by_window_width_rounded_to_integer = Math.round(this.scroll_value / window.innerWidth)
        document.getElementById('CAROUSEL')?.scrollTo({ left: scroll_value_divided_by_window_width_rounded_to_integer * window.innerWidth, top: 0, behavior: 'smooth' })
        this.informOfAccountChange(scroll_value_divided_by_window_width_rounded_to_integer - 1)
    }

    private informOfAccountChange(account_list_number: number) {
        let account_number = this.active_list_indicator = account_list_number
        this.active_account_number.emit(account_number)
    }
}