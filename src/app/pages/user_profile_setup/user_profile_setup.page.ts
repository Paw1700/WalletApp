import { Component } from "@angular/core";
import { TextInputBar } from "../../components/text_input_bar/text_input_bar.component";
import { imageToBase64 } from "../../util/image_to_base64";
import { Profile } from "../../models";

@Component({
    selector: 'user_profile_setup',
    standalone: true,
    imports: [
        TextInputBar
    ],
    templateUrl: './user_profile_setup.page.html',
    styleUrl: './user_profile_setup.page.scss'
})
export class UserProfileSetupPage {
    profile: Profile = {
        id: '',
        name: '',
        surname: '',
        image: ''
    }

    handleImageInput(e: any) {
        const image = e.target.files[0] as File
        imageToBase64(image)
            .then(image_string => {
                this.profile.image = image_string
            })
    }

    handleTextInput(text: string) {
        if (text.includes(' ')) {
            const substrack_start_posistion = text.indexOf(' ') + 1
            this.profile.surname = text.substring(substrack_start_posistion)
        } else {
            this.profile.name = text
            this.profile.surname = ''
        }
        
    }
}