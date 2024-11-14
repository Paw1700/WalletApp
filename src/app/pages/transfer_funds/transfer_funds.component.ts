import { Component, inject, OnInit } from "@angular/core";
import { NumberInput } from "../../components/forms/number_input_bar/number_input_bar.component";
import { CarouselSwitcher } from "../../components/single_components/carousel_switcher/carousel_switcher.component";
import { AccountBarComponent } from "../../components/single_components/account_bar/account_bar.component";
import { APP_SERVICE } from "../../app.service";
import { ActivatedRoute } from "@angular/router";
import { TransferFundsPageResolvedData, TransferFundsPageUserAccounts } from "./transfer_funds.resolver";
import { removeElementFromArray } from "../../util/utils";

@Component({
    selector: 'transfer_funds_page',
    standalone: true,
    imports: [
        NumberInput,
        CarouselSwitcher,
        AccountBarComponent
    ],
    templateUrl: './transfer_funds.component.html',
    styleUrl: './transfer_funds.component.scss'
})
export class TransferFundsPage implements OnInit {
    private readonly APP = inject(APP_SERVICE)
    private readonly ROUTE = inject(ActivatedRoute)

    all_accounts: TransferFundsPageUserAccounts[] = []
    all_accounts_list_indicator: boolean[] = []

    from_active_account_index = 0
    from_carousel_x_offset = 0
    from_block_sides = {
        left: false,
        right: false
    }
    
    to_active_account_index = 1
    to_carousel_x_offset = 100
    to_block_sides = {
        left: true,
        right: false
    }

    async ngOnInit(): Promise<void> {
        await this.readRouteData()
        this.setListIndicator()
    }

    changeAccount(account: 'from' | 'to', direction: 'left' | 'right') {
        switch(account) {
            case "from":
                if (direction === 'left') {
                    this.from_active_account_index -= this.from_active_account_index - 1 === this.to_active_account_index ? 
                        (this.from_active_account_index - 2 < 0 ? 0 : 2) : (this.from_active_account_index - 1 < 0 ? 0 : 1)
                } else {
                    this.from_active_account_index += 
                        this.from_active_account_index + 1 === this.to_active_account_index ? 
                        (this.from_active_account_index + 2 > this.all_accounts.length - 1 ? 0 : 2) : (this.from_active_account_index + 1 > this.all_accounts.length - 1 ? 0 : 1)
                }
                break
            case "to":
                if (direction === 'left') {
                    this.to_active_account_index -= this.to_active_account_index - 1 === this.from_active_account_index ? 
                        (this.to_active_account_index - 2 < 0 ? 0 : 2) : (this.to_active_account_index - 1 < 0 ? 0 : 1)
                } else {
                    this.to_active_account_index += 
                        this.to_active_account_index + 1 === this.from_active_account_index ? 
                        (this.to_active_account_index + 2 > this.all_accounts.length - 1 ? 0 : 2) : (this.to_active_account_index + 1 > this.all_accounts.length - 1 ? 0 : 1)
                }
                break
        }
        this.updateCarousel()
    }


    private updateCarousel() {
        this.from_carousel_x_offset = 100 * this.from_active_account_index
        this.to_carousel_x_offset = 100 * this.to_active_account_index

        this.from_block_sides.left = this.fromAccoutActiveIndexIsFirst() ||  !this.fromAccountActiveIndexHaveSpaceOnLeft()
        this.from_block_sides.right = this.fromAccountActiveIndexIsLast() || !this.fromAccountActiveIndexHaveSpaceOnRight()
        
        this.to_block_sides.left = this.toAccountActiveIndexIsFirst() || !this.toAccountActiveIndexHaveSpaceOnLeft()
        this.to_block_sides.right = this.toAccountActiveIndexIsLast() || !this.toAccountActiveIndexHaveSpaceOnRight()
    }

    private readRouteData(): Promise<void> {
        return new Promise(resolve => {
            this.ROUTE.data.subscribe(route_data => {
                const resolved_data = route_data['page_data'] as TransferFundsPageResolvedData
                this.all_accounts = resolved_data.user_accounts
                resolve()
            })
        })
    }

    private setListIndicator() {
        this.all_accounts_list_indicator = Array(this.all_accounts.length).fill(false)
    }

    private fromAccoutActiveIndexIsFirst() {
        return this.from_active_account_index === 0
    }

    private fromAccountActiveIndexIsLast() {
        return this.from_active_account_index === this.all_accounts.length - 1
    }

    private fromAccountActiveIndexHaveSpaceOnLeft() {
        return this.from_active_account_index - 1 !== this.to_active_account_index ? true : (this.from_active_account_index - 2 >= 0)
    }

    private fromAccountActiveIndexHaveSpaceOnRight() {
        return this.from_active_account_index + 1 !== this.to_active_account_index ? true : (this.from_active_account_index + 2 <= this.all_accounts.length - 1)
    }

    private toAccountActiveIndexIsFirst() {
        return this.to_active_account_index === 0
    }

    private toAccountActiveIndexIsLast() {
        return this.to_active_account_index === this.all_accounts.length - 1
    }

    private toAccountActiveIndexHaveSpaceOnLeft() {
        return this.to_active_account_index - 1 !== this.from_active_account_index ? true : (this.to_active_account_index - 2 >= 0)
    }

    private toAccountActiveIndexHaveSpaceOnRight() {
        return this.to_active_account_index + 1 !== this.from_active_account_index ? true : (this.to_active_account_index + 2 <= this.all_accounts.length - 1)
    }
}