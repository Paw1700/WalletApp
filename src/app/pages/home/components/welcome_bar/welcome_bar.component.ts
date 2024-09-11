import { Component, Input } from "@angular/core";
import { Profile } from "../../../../models";

@Component({
    selector: 'welcome_bar',
    standalone: true,
    templateUrl: './welcome_bar.component.html',
    styleUrl: './welcome_bar.component.scss'
})
export class WelcomeBar {
    @Input() PROFILE: Profile = { id: '', name: '', surname: '', image: '' }
}