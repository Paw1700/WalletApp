import { Component, inject, OnInit } from "@angular/core";
import { AccountBarComponent, AccountBarFundsData } from "../../../../components/single_components/account_bar/account_bar.component";
import { NumberSeparator } from "../../../../pipes/number_separator.pipe";
import { HomePageService } from "../../home.page.service";
import { NgUnsubscriber } from "../../../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";
import { Account } from "../../../../models";
import { AccountStatsData } from "../../../../components/single_components/account_bar/components/account_bar_stats.component";
import { CarouselSwitcher } from "../../../../components/single_components/carousel_switcher/carousel_switcher.component";

@Component({
    selector: 'accounts_carousel',
    standalone: true,
    imports: [
        AccountBarComponent,
        NumberSeparator,
        CarouselSwitcher
    ],
    templateUrl: './accounts-carousel.component.html',
    styleUrl: './accounts-carousel.component.scss'
})
export class AccountsCarousel extends NgUnsubscriber implements OnInit {
    readonly PAGE_SERVICE = inject(HomePageService)
    accounts_bar_list: AccountsCarouselListItem[] = []

    sum_of_avaible_funds = 0
    accounts_carrousel_x_offset = 0
    carousel_switcher_config: boolean[] = []

    ngOnInit(): void {
        this.subscribeToAccountsBarCarouselList()
        this.subscribeToActiveAccountCarouselListIndex()
    }

    changeAccount(account_index: number) {
        this.PAGE_SERVICE.changeActiveUserAccount(account_index - 1)
    }

    goToAccountPage(user_account_id: string) {
        this.PAGE_SERVICE.goToAccountPage(user_account_id)
    }

    private subscribeToAccountsBarCarouselList() {
        this.PAGE_SERVICE.accounts_bar_carousel_list$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(accounts_list => {
            this.accounts_bar_list = accounts_list
            this.carousel_switcher_config = Array(accounts_list.length + 1).fill(false)
            this.carousel_switcher_config[0] = true
            this.sum_of_avaible_funds = 0
            accounts_list.forEach(async acc => {
                if (acc.account.currency === "PLN") {
                    this.sum_of_avaible_funds += acc.account_funds_data.avaible_funds
                } else {
                    this.sum_of_avaible_funds += await this.PAGE_SERVICE.exchangeMoney(acc.account.currency, "PLN", acc.account_funds_data.avaible_funds)
                } 
            })
        })
    }

    private subscribeToActiveAccountCarouselListIndex() {
        this.PAGE_SERVICE.active_account_carousel_list_index$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(index => {
            this.changeXAccountCarouselOffset(index + 1)
        })
    }

    private changeXAccountCarouselOffset(position: number) {
        this.accounts_carrousel_x_offset = 100 * position
    }
}

export type AccountsCarouselListItem = {
    user_account_id: string,
    account: Account,
    account_funds_data: AccountBarFundsData,
    stats_data: AccountStatsData
}

