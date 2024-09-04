import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { OpenAbleComponentInterface } from "../interfaces/openable.component";
import { Category } from "../../models";

@Component({
    selector: 'category_choose_bar',
    standalone: true,
    template: ''
})
export class CategoryChooseBarComponentInterface extends OpenAbleComponentInterface implements OnChanges {
    @Input({required: true}) CATEGORIES_LIST: Category[] = []
    @Input() pre_selected_category_id: string = ''
    @Output() choosen_categorie = new EventEmitter<Category | null>()
    choosed_categorie: Category | null = null

    ngOnChanges(changes: SimpleChanges): void {
        if (this.pre_selected_category_id !== '') {
            this.choosed_categorie = this.CATEGORIES_LIST.filter(cat => cat.id === this.pre_selected_category_id)[0]
        }
    }

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