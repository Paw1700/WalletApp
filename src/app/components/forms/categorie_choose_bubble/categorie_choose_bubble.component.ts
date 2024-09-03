import { Component } from "@angular/core";
import { CategoryChooseBarComponentInterface } from "../../interfaces/category_choose_bar.component";

@Component({
    selector: 'category_choose_bubble',
    standalone: true,
    templateUrl: './categorie_choose_bubble.component.html',
    styleUrl: './categorie_choose_bubble.component.scss'
})
export class CategoryChooseBubble extends CategoryChooseBarComponentInterface { }