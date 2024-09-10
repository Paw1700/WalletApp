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
import { AccountBarComponentData } from "../../components/single_components/account_bar/account_bar.component";

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

    readonly BANKS_LIST = BANKS_LIST_JSON as Bank[]
    readonly ACCOUNTS_LIST = ACCOUNTS_LIST_JSON as Account[]
    account_list_of_choosen_bank: AccountBarComponentData[] = []

    ngOnInit(): void {
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

    receiveAccounts(bank_id: any) {
        this.account_list_of_choosen_bank = []
        this.ACCOUNTS_LIST.filter(acc => acc.bank_id === bank_id).forEach(acc => {
            this.account_list_of_choosen_bank.push({account: acc})
        })
    }

    handleFormInput(type: 'account_id' | 'start_funds' | 'debet_limit' | 'debet_interest', payload: any) {
        switch(type) {
            case "account_id":
                this.user_new_account.account_id = payload
                break
            case "start_funds":
                this.user_new_account.avaible_funds = payload
                break
            case "debet_limit":
                this.user_new_account.debet.limit = payload
                break
            case "debet_interest":
                this.user_new_account.debet.interest = payload
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