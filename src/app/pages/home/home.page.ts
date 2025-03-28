import { Component, inject, OnInit } from "@angular/core";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { APP_SERVICE } from "../../app.service";
import { AccountsCarousel, AccountsCarouselListItem } from "./components/accounts-carousel/accounts-carousel.component";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs";
import { TransactionBar } from "../../components/single_components/transaction_bar/transaction_bar.component";
import { HomeTransactionList } from "./components/home_transactions_list/home_transaction_list.component";
import { ConfirmBox, ConfirmBoxData } from "../../components/UI/confirm_box/confirm_box.component";
import { Loader } from "../../components/UI/loader/loader.component";
import { HomePageService } from "./home.page.service";
import { WelcomeBar } from "./components/welcome_bar/welcome_bar.component";
import { Profile } from "../../models";

@Component({
    selector: 'home_page',
    standalone: true,
    imports: [
        AccountsCarousel,
        TransactionBar,
        HomeTransactionList,
        ConfirmBox,
        Loader,
        WelcomeBar
    ],
    viewProviders: [
        HomePageService
    ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss'
})
export class HomePage extends NgUnsubscriber implements OnInit {
    readonly APP = inject(APP_SERVICE)
    readonly ROUTE = inject(ActivatedRoute)
    readonly PAGE_SERVICE = inject(HomePageService)

    CONFIRM_BOX_DATA: ConfirmBoxData | null = null
    ACCOUNT_AMOUNT: number = 0
    PROFILE: Profile = { id: '', name: '', surname: '', image: '' }

    async ngOnInit() {
        this.getRouteDate()
        this.PAGE_SERVICE.fetchTransactionBarList()
        this.subscribeToConfirmBoxData()
        this.subscribeToRightNavBarBtnClicked()
    }

    handleConfirmBoxDecision(decision: boolean) {
        if (decision) {
            this.PAGE_SERVICE.deleteTransaction()
        } else {
            this.PAGE_SERVICE.showConfirmBox(false)
        }
    }

    private getRouteDate() {
        this.ROUTE.data.subscribe(route_data => {
            this.PROFILE = route_data['profile']
            const accounts_bar_component_data_list = route_data['accounts_bar_component_data_list'] as AccountsCarouselListItem[]
            this.ACCOUNT_AMOUNT = accounts_bar_component_data_list.length
            this.PAGE_SERVICE.accounts_bar_carousel_list$.next(accounts_bar_component_data_list)
        })
    }

    private subscribeToConfirmBoxData() {
        this.PAGE_SERVICE.confirm_box_data$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(box_data => {
            this.CONFIRM_BOX_DATA = box_data
        })
    }

    private subscribeToRightNavBarBtnClicked() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            this.PAGE_SERVICE.goToAddTransaction()
        })
    }
}