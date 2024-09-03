import { Component } from "@angular/core";
import { AccountBarComponent } from "../../single_components/account_bar/account_bar.component";
import { AccountChooseBarComponentInterface } from "../../interfaces/account_choose_bar.component";

@Component({
    selector: 'account_choose_by_scroll',
    standalone: true,
    imports: [
        AccountBarComponent
    ],
    templateUrl: './account_choose_by_scroll.component.html',
    styleUrl: './account_choose_by_scroll.component.scss'
})
export class AccountChooseByScroll extends AccountChooseBarComponentInterface {
    scroll_value = 0

    handleScrollGesture(e: any) {
        this.scroll_value = e.target.scrollLeft
    }

    handleTouchEnd() {
        const scroll_value_divided_by_window_width_rounded_to_integer = Math.round(this.scroll_value / window.innerWidth)
        document.getElementById('CAROUSEL')?.scrollTo({ left: scroll_value_divided_by_window_width_rounded_to_integer * window.innerWidth, top: 0, behavior: 'smooth' })
        this.choosed_user_account_id.emit(this.ACCOUNTS_LIST[scroll_value_divided_by_window_width_rounded_to_integer - 1]?.user_account_id)
    }
}