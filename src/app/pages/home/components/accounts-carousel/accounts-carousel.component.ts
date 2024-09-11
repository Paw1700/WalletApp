import { Component, inject, OnInit } from "@angular/core";
import { AccountBarComponent, AccountBarComponentData } from "../../../../components/single_components/account_bar/account_bar.component";
import { NumberSeparator } from "../../../../pipes/number_separator.pipe";
import { NgStyle } from "@angular/common";
import { HomePageService } from "../../home.page.service";
import { NgUnsubscriber } from "../../../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";

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
export class AccountsCarousel extends NgUnsubscriber implements OnInit {
    readonly PAGE_SERVICE = inject(HomePageService)
    accounts_bar_list: AccountBarComponentData[] = []

    sum_of_avaible_funds = 0
    scroll_value = 0
    active_list_indicator = -1

    ngOnInit(): void {
        this.subscribeToAccountsBarCarouselList()
        this.subscribeToActiveAccountCarouselListIndex()
    }

    handleScrollGesture(e: any) {
        this.scroll_value = e.target.scrollLeft
    }

    handleTouchEnd() {
        const scroll_value_divided_by_window_width_rounded_to_integer = Math.round(this.scroll_value / window.innerWidth)
        document.getElementById('CAROUSEL')?.scrollTo({ left: scroll_value_divided_by_window_width_rounded_to_integer * window.innerWidth, top: 0, behavior: 'smooth' })
        this.PAGE_SERVICE.changeActiveUserAccount(scroll_value_divided_by_window_width_rounded_to_integer - 1)
    }

    private subscribeToAccountsBarCarouselList() {
        this.PAGE_SERVICE.accounts_bar_carousel_list$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(accounts_list => {
            this.accounts_bar_list = accounts_list
            this.sum_of_avaible_funds = 0
            accounts_list.forEach(acc => {
                if (acc.funds_data) {
                    this.sum_of_avaible_funds += acc.funds_data.avaible_funds
                }
            })
        })
    }

    private subscribeToActiveAccountCarouselListIndex() {
        this.PAGE_SERVICE.active_account_carousel_list_index$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(index => {
            this.active_list_indicator = index
        })
    }
}

