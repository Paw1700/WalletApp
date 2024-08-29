import { Component } from "@angular/core";
import { ReceiverChooseBarComponentInterface } from "../../interfaces/receiver_choose_bar.component";

@Component({
    selector: 'receiver_choose_bubble',
    standalone: true,
    templateUrl: './receiver_choose_bubble.component.html',
    styleUrl: './receiver_choose_bubble.component.scss'
    // ** TO MAXIMAZE WIDTH WHEN OPEN USE COMPONENT OPENESSS STATE CHANGE EMITER TO SET CLASS WITH FIXED WIDTH ** //
})
export class ReceiverChooseBubble extends ReceiverChooseBarComponentInterface { }