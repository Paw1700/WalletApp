import { Component, Input } from "@angular/core";
import { AccountBarComponent, AccountBarComponentData } from "../../../../components/account_bar/account_bar.component";
import { AccountFilter } from "./components/account_filter_choose/account_filter_choose.component";
@Component({
    selector: 'filter_options',
    standalone: true,
    imports: [
    AccountBarComponent,
    AccountFilter
],
    templateUrl: './filter_options.component.html',
    styleUrl: './filter_options.component.scss'
})
export class FilterOptions {
    @Input({required: true}) ACCOUNTS_BAR_DATA: AccountBarComponentData[] = [] 
}