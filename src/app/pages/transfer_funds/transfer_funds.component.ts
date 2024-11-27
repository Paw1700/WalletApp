import { Component, inject, OnInit } from "@angular/core";
import { NumberInput } from "../../components/forms/number_input_bar/number_input_bar.component";
import { CarouselSwitcher } from "../../components/single_components/carousel_switcher/carousel_switcher.component";
import { AccountBarComponent } from "../../components/single_components/account_bar/account_bar.component";
import { APP_SERVICE } from "../../app.service";
import { ActivatedRoute } from "@angular/router";
import { TransferFundsPageResolvedData, TransferFundsPageUserAccounts } from "./transfer_funds.resolver";
import { Currency, FundsTransaction } from "../../models";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";

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
export class TransferFundsPage extends NgUnsubscriber implements OnInit {
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

    exchange_rate: number = 1
    exchange_from_amount: number | null = null
    exchange_to_amount: number | null = null
    exchange_effective_date: string | null = null
    exchange_from_currency: Currency | null = null
    exchange_to_currency: Currency | null = null

    async ngOnInit(): Promise<void> {
        await this.readRouteData()
        this.setListIndicator()
        this.reactToLeftNavButtonClicked()
        this.reactToRightNavButtonClicked()
        this.updateCarousel()
        await this.fetchExchangeRate()
        this.setExchangeAmountCurrency()
    }

    async reactToUserChangeAccount(account: 'from' | 'to', direction: 'left' | 'right') {
        this.changeAccount(account, direction)
        this.updateCarousel()
        this.resetAmountValues()
        await this.fetchExchangeRate()
        this.setExchangeAmountCurrency()
        this.calculateExchangeToAccountAmount()
    }

    reactToUserExchangeRateInput(exchange_rate: number | null) {
        this.exchange_rate = exchange_rate ? exchange_rate : 1
        this.exchange_effective_date = null
        this.calculateExchangeToAccountAmount()
    }

    reactToUserExchangeFromAmountInput(exchange_amount: number | null) {
        this.exchange_from_amount = exchange_amount
        this.calculateExchangeToAccountAmount('from')
    }

    reactToUserExchangeToAmountInput(exchange_amount: number | null) {
        this.exchange_to_amount = exchange_amount
        this.calculateExchangeToAccountAmount('to')
    }

    private reactToRightNavButtonClicked() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            this.saveFundsTransaction().then(() => {
                this.APP.navigate('home')
            })
        })
    }

    private reactToLeftNavButtonClicked() {
        this.APP.STATE.nav_bar_left_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            if (this.APP.STATE.last_app_location$.value !== null) {
                this.APP.navigate(this.APP.STATE.last_app_location$.value)
                this.APP.STATE.last_app_location$.next(null)
            } else {
                this.APP.navigate('home')
            }
        })
    }

    private saveFundsTransaction() {
        return new Promise<void>(async resolve => {
            try {
                if (!this.exchange_rate) {
                    throw new Error('APP-DATA-FUNDS_TRANSACTION-SAVE-EXCHANGE_RATE')
                }
                if (!this.exchange_from_amount || !this.exchange_to_amount) {
                    throw new Error('APP-DATA-TRANSACTION-SAVE-AMOUNT')
                }
                const funds_transaction: FundsTransaction = {
                    id: '',
                    date: new Date(),
                    user_account_id: {
                        from: this.all_accounts[this.from_active_account_index].account.id,
                        to: this.all_accounts[this.to_active_account_index].account.id
                    },
                    exchange_rate_from_to: this.exchange_rate,
                    amount_from_to: this.exchange_from_amount,
                }
                await this.APP.TRANSACTION.saveFundsTransaction(funds_transaction)
                await this.APP.USER_ACCOUNT.changeAvaibleAmount(this.all_accounts[this.from_active_account_index].user_account_id, -this.exchange_from_amount)
                await this.APP.USER_ACCOUNT.changeAvaibleAmount(this.all_accounts[this.to_active_account_index].user_account_id, this.exchange_to_amount)
                resolve()
            } catch (err) {
                this.APP.STATE.errorHappend(err as Error)
            }
        })
    }

    private changeAccount(account: 'from' | 'to', direction: 'left' | 'right') {
        switch (account) {
            case "from":
                switch (direction) {
                    case "left":
                        if (this.from_active_account_index - 1 === this.to_active_account_index) {
                            this.from_active_account_index -= 1
                            this.to_active_account_index += 1
                        } else if (this.from_active_account_index - 1 >= 0) {
                            this.from_active_account_index -= 1
                        }
                        break
                    case "right":
                        if (this.from_active_account_index + 1 === this.to_active_account_index) {
                            this.from_active_account_index += 1
                            this.to_active_account_index -= 1
                        } else if (this.to_active_account_index + 1 <= this.all_accounts.length - 1) {
                            this.from_active_account_index += 1
                        }
                        break
                }
                break
            case "to":
                switch (direction) {
                    case "left":
                        if (this.to_active_account_index - 1 === this.from_active_account_index) {
                            this.to_active_account_index -= 1
                            this.from_active_account_index += 1
                        } else if (this.to_active_account_index - 1 >= 0) {
                            this.to_active_account_index -= 1
                        }
                        break
                    case "right":
                        if (this.to_active_account_index + 1 === this.from_active_account_index) {
                            this.to_active_account_index += 1
                            this.from_active_account_index -= 1
                        } else if (this.to_active_account_index + 1 <= this.all_accounts.length - 1) {
                            this.to_active_account_index += 1
                        }
                        break
                }
                break
        }
    }

    private async fetchExchangeRate() {
        this.exchange_rate = await this.APP.CURRENCY.getExchangeRate(this.all_accounts[this.from_active_account_index].account.currency, this.all_accounts[this.to_active_account_index].account.currency)
        this.exchange_effective_date = (await this.APP.CURRENCY.getExchangeRateEffectiveDate(this.all_accounts[this.from_active_account_index].account.currency, this.all_accounts[this.to_active_account_index].account.currency)).toLocaleDateString().slice(0, 10)
    }

    private setExchangeAmountCurrency() {
        this.exchange_from_currency = this.all_accounts[this.from_active_account_index].account.currency
        this.exchange_to_currency = this.all_accounts[this.to_active_account_index].account.currency
    }

    private updateCarousel() {
        this.from_carousel_x_offset = 100 * this.from_active_account_index
        this.to_carousel_x_offset = 100 * this.to_active_account_index

        this.from_block_sides.left = this.fromAccoutActiveIndexIsFirst()
        this.from_block_sides.right = this.fromAccountActiveIndexIsLast()

        this.to_block_sides.left = this.toAccountActiveIndexIsFirst()
        this.to_block_sides.right = this.toAccountActiveIndexIsLast()
    }

    private calculateExchangeToAccountAmount(type?: 'from' | 'to') {
        if (this.exchange_from_amount && this.exchange_rate && type === 'from') {
            this.exchange_to_amount = Number((this.exchange_from_amount * this.exchange_rate).toFixed(2))
        } else if (this.exchange_to_amount && this.exchange_rate && type === 'to') {
            this.exchange_from_amount = Number((this.exchange_to_amount / this.exchange_rate).toFixed(2))
        } else if (this.exchange_from_amount == null || this.exchange_to_amount == null) {
            this.exchange_from_amount = null
            this.exchange_to_amount = null
        }
    }

    private resetAmountValues() {
        this.exchange_from_amount = null
        this.exchange_to_amount = null
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