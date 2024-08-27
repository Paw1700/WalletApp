import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Category } from "../../../../../../models";

@Component({
    selector: 'categorie_filter',
    standalone: true,
    templateUrl: './categorie_filter_choose.component.html',
    styleUrl: './categorie_filter_choose.component.scss'
})
export class CategorieFilterChoose {
    @Input({ required: true }) CATEGORIES_LIST: Category[] = []
    @Output() choosen_categorie = new EventEmitter<Category | null>()

    is_box_open = false
    choosed_categorie: Category | null = null

    openBox() {
        this.is_box_open = true
    }

    chooseCategorie(category: Category | null) {
        this.choosed_categorie = category
        this.choosen_categorie.emit(category)
        this.is_box_open = false
    }
}