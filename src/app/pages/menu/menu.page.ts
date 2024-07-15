import { animate, animateChild, group, query, stagger, style, transition, trigger } from "@angular/animations";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'menu_page',
    standalone: true,
    templateUrl: './menu.page.html',
    styleUrl: './menu.page.scss',
    animations: [
        trigger('PAGE', [
            transition(':enter', [
                style({
                    opacity: 0
                }),
                group([
                    animate('500ms ease-out', style({
                        opacity: 1
                    })),
                    query("@LIST_OF_LOCATIONS", animateChild())
                ])
            ]),
            transition(':leave', [
                animate('500ms ease-in', style({
                    opacity: 0
                })),
            ])
        ]),
        trigger('LIST_OF_LOCATIONS', [
            transition(':enter', [
                query(":enter", [
                    style({
                        position: 'relative',
                        left: '-100vw'
                    }),
                    stagger(100, [
                        animate('500ms cubic-bezier(.7,.6,.4,1)', style({
                            left: 0
                        }))
                    ])
                ])
            ])
        ])
    ]
})
export class MenuPage {
    @Input() show = true
    app_locations: AppLocationListItem[] = [
        { name: 'Strona główna', active: true },
        { name: 'Konta', active: false },
        { name: 'Kredyty', active: false },
        { name: 'Giełda', active: false },
        { name: 'Statystyka', active: false },
        { name: 'Ustawienia', active: false }
    ]
}

type AppLocationListItem = {
    name: string,
    active: boolean
}