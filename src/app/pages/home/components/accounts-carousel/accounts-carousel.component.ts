import { Component, inject, OnInit } from "@angular/core";
import { AccountBarComponent, AccountBarFundsData } from "../../../../components/single_components/account_bar/account_bar.component";
import { NumberSeparator } from "../../../../pipes/number_separator.pipe";
import { NgStyle } from "@angular/common";
import { HomePageService } from "../../home.page.service";
import { NgUnsubscriber } from "../../../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";
import { Account } from "../../../../models";
import { AccountStatsData } from "../../../../components/single_components/account_bar/components/account_bar_stats.component";
import { ArrowButton } from "../../../../components/UI/arrow_button.component";

@Component({
    selector: 'accounts_carousel',
    standalone: true,
    imports: [
        AccountBarComponent,
        NumberSeparator,
        ArrowButton,
        NgStyle
    ],
    templateUrl: './accounts-carousel.component.html',
    styleUrl: './accounts-carousel.component.scss'
})
export class AccountsCarousel extends NgUnsubscriber implements OnInit {
    readonly PAGE_SERVICE = inject(HomePageService)
    accounts_bar_list: AccountsCarouselListItem[] = []

    sum_of_avaible_funds = 0
    active_list_indicator = -1
    accounts_carrousel_x_offset = 0

    ngOnInit(): void {
        this.subscribeToAccountsBarCarouselList()
        this.subscribeToActiveAccountCarouselListIndex()
    }

    changeAccount(direction: 'left' | 'right') {
        switch (direction) {
            case "left":
                if (this.active_list_indicator - 1 >= -1) 
                    this.PAGE_SERVICE.changeActiveUserAccount(this.active_list_indicator - 1)
                break
            case "right":
                if (this.active_list_indicator + 1 < this.accounts_bar_list.length)                 
                    this.PAGE_SERVICE.changeActiveUserAccount(this.active_list_indicator + 1)
                break
        }
    }

    goToAccountPage(user_account_id: string) {
        this.PAGE_SERVICE.goToAccountPage(user_account_id)
    }

    private subscribeToAccountsBarCarouselList() {
        this.PAGE_SERVICE.accounts_bar_carousel_list$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(accounts_list => {
            this.accounts_bar_list = accounts_list
            this.sum_of_avaible_funds = 0
            accounts_list.forEach(acc => {
                this.sum_of_avaible_funds += acc.account_funds_data.avaible_funds
            })
        })
    }

    private subscribeToActiveAccountCarouselListIndex() {
        this.PAGE_SERVICE.active_account_carousel_list_index$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(index => {
            this.active_list_indicator = index
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

