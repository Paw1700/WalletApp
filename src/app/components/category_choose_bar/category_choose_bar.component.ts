import { Component, EventEmitter, Output } from "@angular/core";
import CATEGORIES from '../../../../public/assets/data/categories.json'
import { OpenAbleComponent } from "../../interfaces/openable.component";
import { Category } from "../../models";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
    selector: 'category_choose_bar',
    standalone: true,
    templateUrl: './category_choose_bar.component.html',
    styleUrl: './category_choose_bar.component.scss',
    animations: [
        trigger('list', [
            transition(":enter", [
                style({
                    opacity: 0,
                    height: 0
                }),
                animate('250ms 50ms ease-out', style({
                    opacity: 1,
                    height: "*"
                }))
            ]),
            transition(":leave", [
                animate('250ms 50ms ease-out', style({
                    opacity: 0,
                    height: 0
                }))
            ])
        ]),
        trigger('badge', [
            transition(":enter", [
                style({
                    opacity: 0,
                    width: 0
                }),
                animate('250ms 50ms ease-out', style({
                    opacity: 1,
                    width: "*"
                }))
            ]),
            transition(":leave", [
                animate('250ms 50ms ease-out', style({
                    opacity: 0,
                    width: 0
                }))
            ])
        ])
    ]
})
export class CategoryChooseBar extends OpenAbleComponent{
    readonly categories_list: Category[] = CATEGORIES
    @Output() choosed_categorie_id = new EventEmitter<string>()
    choosed_categorie: Category | null = null

    setCategory(category?: Category) {
        if (category) {
            this.choosed_categorie = category
            this.choosed_categorie_id.emit(category.id)
            this.changeComponentOpenessState(false)
        } else {
            this.choosed_categorie = null
            this.choosed_categorie_id.emit('')
        }
    }
}