import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AccountBarComponent, AccountBarComponentData } from "../../../../components/account_bar/account_bar.component";
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
export class AccountsCarousel implements OnInit {
    @Input() accounts_data: AccountBarComponentData[] = []
    @Output() active_account_number = new EventEmitter<number>()

    sum_of_avaible_funds = 0
    scroll_value = 0
    active_list_indicator = -1
    show_list_indicator = false

    ngOnInit(): void {
        this.accounts_data.forEach(acc => {
            this.sum_of_avaible_funds += Number(acc.funds_data?.avaible_funds!)
        })
    }

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

