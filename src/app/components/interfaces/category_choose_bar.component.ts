import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OpenAbleComponentInterface } from "../interfaces/openable.component";
import { Category } from "../../models";

@Component({
    selector: 'category_choose_bar',
    standalone: true,
    template: ''
})
export class CategoryChooseBarComponentInterface extends OpenAbleComponentInterface {
    @Input({required: true}) CATEGORIES_LIST: Category[] = []
    @Output() choosen_categorie = new EventEmitter<Category | null>()
    choosed_categorie: Category | null = null

    setCategory(category?: Category) {
        if (category) {
            this.choosed_categorie = category
            this.choosen_categorie.emit(category)
            this.changeComponentOpenessState(false)
        } else {
            this.choosed_categorie = null
            this.choosen_categorie.emit(null)
            this.changeComponentOpenessState()
        }
    }
}