import { Component, inject, OnInit } from "@angular/core";
import { BankChooseBar } from "../../components/forms/bank_choose_bar/bank_choose_bar.component";
import { Account, Bank, UserAccount } from "../../models";
import { AccountChooseList } from "../../components/forms/account_choose_list/account_choose_list.component";
import { NumberInput } from "../../components/forms/number_input_bar/number_input_bar.component";
import BANKS_LIST_JSON from '../../../../public/assets/data/banks.json'
import ACCOUNTS_LIST_JSON from '../../../../public/assets/data/accounts.json'
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { APP_SERVICE } from "../../app.service";
import { takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AccountChooseBarListItem } from "../../components/interfaces/account_choose_bar.component";

@Component({
    selector: 'add_account_page',
    standalone: true,
    imports: [
        BankChooseBar,
        AccountChooseList,
        NumberInput
    ],
    templateUrl: './add_account.page.html',
    styleUrl: './add_account.page.scss'
})
export class AddAccountPage extends NgUnsubscriber implements OnInit{
    readonly APP = inject(APP_SERVICE)
    readonly ROUTE = inject(ActivatedRoute)

    readonly BANKS_LIST = BANKS_LIST_JSON as Bank[]
    ACCOUNTS_LIST = ACCOUNTS_LIST_JSON as Account[]
    account_list_of_choosen_bank: AccountChooseBarListItem[] = []

    ngOnInit(): void {
        this.fetchRouteData()
        this.reactToLeftNavBarClicked()
        this.reactToRightNavBarClicked()
    }

    user_new_account: UserAccount = {
        id: '',
        account_id: '',
        avaible_funds: 0,
        debet: {
            limit: 0,
            interest: 0
        }
    } 

    receiveAccounts(bank: Bank | null) {
        this.APP.APPERANCE.setAppAccentColor(null)
        this.account_list_of_choosen_bank = []
        if (bank) {
            this.ACCOUNTS_LIST.filter(acc => acc.bank_id === bank.id).forEach(acc => {
                this.account_list_of_choosen_bank.push({account: acc, user_account_id: null})
            })
        }
    }

    handleFormInput(type: 'account_id' | 'start_funds' | 'debet_limit' | 'debet_interest', payload: any) {
        switch(type) {
            case "account_id":
                this.user_new_account.account_id = payload
                const acc_background_gradient = this.ACCOUNTS_LIST.filter(acc => acc.id === payload)[0].apperance.background_gradient
                this.APP.APPERANCE.setAppAccentColor(acc_background_gradient.bottom !== null ? acc_background_gradient.bottom : acc_background_gradient.top)
                break
            case "start_funds":
                this.user_new_account.avaible_funds = payload !== null ? payload : 0
                break
            case "debet_limit":
                this.user_new_account.debet.limit = payload !== null ? payload : 0
                break
            case "debet_interest":
                this.user_new_account.debet.interest = payload !== null ? payload : 0
                break
        }
    }

    saveAccount() {
        const validation_result = this.APP.VALIDATOR.validateUserAccount(this.user_new_account)
        if (validation_result) {
            this.APP.USER_ACCOUNT.save(this.user_new_account)
            .then(() => {
                this.APP.navigate('accounts_list')
            })
        }
    }

    private fetchRouteData() {
        this.ROUTE.data.subscribe(route_data => {
            this.ACCOUNTS_LIST = route_data['accounts']
        })
    }

    private reactToLeftNavBarClicked() {
        this.APP.STATE.nav_bar_left_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            this.APP.navigate('accounts_list')
        })
    }

    private reactToRightNavBarClicked() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            this.saveAccount()
        })
    }
}