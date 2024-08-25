import { Component, Input } from "@angular/core";
import { AccountBarComponent, AccountBarComponentData } from "../../../../../../components/account_bar/account_bar.component";

@Component({
    selector: 'account_filter',
    standalone: true,
    imports: [
        AccountBarComponent
    ],
    templateUrl: './account_filter_choose.component.html',
    styleUrl: './account_filter_choose.component.scss'
})
export class AccountFilter {
    @Input({required: true}) ACCOUNTS_BAR_DATA: AccountBarComponentData[] = [] 

    selected_account_index = -1
    account_choosed_box_open = false
    scroll_value = 0

    openAccountFilter() {
        this.account_choosed_box_open = true
    }

    setAccount(list_index: number) {
        this.selected_account_index = list_index
        this.account_choosed_box_open = false
    }

    handleScrollGesture(e: any) {
        this.scroll_value = e.target.scrollLeft
    }

    handleTouchEnd() {
        const scroll_value_divided_by_window_width_rounded_to_integer = Math.round(this.scroll_value / window.innerWidth)
        document.getElementById('CAROUSEL')?.scrollTo({ left: scroll_value_divided_by_window_width_rounded_to_integer * window.innerWidth, top: 0, behavior: 'smooth' })
    }
}