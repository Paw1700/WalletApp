import { Component } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { CategoryChooseBarComponentInterface } from "../../interfaces/category_choose_bar.component";

@Component({
    selector: 'category_choose_scroll',
    standalone: true,
    templateUrl: './category_choose_scroll.component.html',
    styleUrl: './category_choose_scroll.component.scss',
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
export class CategoryChooseScroll extends CategoryChooseBarComponentInterface {}