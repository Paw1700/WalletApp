import { Component } from "@angular/core";
import { NumberInput } from "../../components/forms/number_input_bar/number_input_bar.component";
import { CarouselSwitcher } from "../../components/single_components/carousel_switcher/carousel_switcher.component";

@Component({
    selector: 'transfer_funds_page',
    standalone: true,
    imports: [
        NumberInput,
        CarouselSwitcher
    ],
    templateUrl: './transfer_funds.component.html',
    styleUrl: './transfer_funds.component.scss'
})
export class TransferFundsPage {

}