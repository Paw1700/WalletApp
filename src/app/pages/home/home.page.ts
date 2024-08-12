import { Component, inject, OnInit } from "@angular/core";
import { AccountBarComponent } from "../../components/account_bar/account_bar.component";
import { TransactionBarComponent } from "../../components/transaction_bar/transaction_bar.component";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { Profile } from "../../models";
import { APP_SERVICE } from "../../app.service";

@Component({
    selector: 'home_page',
    standalone: true,
    imports: [AccountBarComponent, TransactionBarComponent],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss'
})
export class HomePage extends NgUnsubscriber implements OnInit{
    readonly APP = inject(APP_SERVICE)
    profile: Profile = {id: '', name: '', surname: '', image: ''}

    ngOnInit(): void {
        this.APP.DATA.PROFILE.get().then(profile => {
            this.profile = profile
        })
    }
}