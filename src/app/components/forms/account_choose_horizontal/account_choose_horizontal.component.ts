import { Component, EventEmitter, Output } from "@angular/core";
import { AccountBarComponent } from "../../single_components/account_bar/account_bar.component";
import { AccountChooseBarComponentInterface, AccountChooseBarListItem } from "../../interfaces/account_choose_bar.component";
import { ArrowButton } from "../../UI/arrow_button.component";

@Component({
    selector: 'account_choose_horizontal',
    standalone: true,
    imports: [
        AccountBarComponent,
        ArrowButton
    ],
    templateUrl: './account_choose_horizontal.component.html',
    styleUrl: './account_choose_horizontal.component.scss'
})
export class AccountChooseHorizontal extends AccountChooseBarComponentInterface {
    account_carousel_x_offset = 0
    accounts_list_choosed_index = -1

    changeCarouselAccount(direction: 'left' | 'right') {
        switch (direction) {
            case 'left':
                if (this.accounts_list_choosed_index >= 0) {
                    this.accounts_list_choosed_index -= 1
                    this.setChoosedAccount(this.accounts_list_choosed_index)
                }
                break
            case 'right':
                if (this.accounts_list_choosed_index < this.ACCOUNTS_LIST.length - 1) {
                    this.accounts_list_choosed_index += 1
                    this.setChoosedAccount(this.accounts_list_choosed_index)
                }
                break
        }
    }

    private setChoosedAccount(account_list_index: number) {
        this.account_carousel_x_offset = 100 * (account_list_index + 1)
        if (account_list_index >= 0) {
            this.choosed_user_account_id.emit(this.ACCOUNTS_LIST[account_list_index].user_account_id)
        } else {
            this.choosed_user_account_id.emit(null)
        }
    }
}