import { Injectable } from "@angular/core";
import { APP_DATA } from "./services/data.service";
import { APP_APPERANCE } from "./services/apperance.service";
import { APP_UPDATE } from "./services/update.service";
import { APP_SCHEDULE } from "./services/schedule.service";
import { APP_BACKUP } from "./services/backup.service";
import { APP_VALIDATOR } from "./services/validator.service";

@Injectable()
export class APP_SERVICE {
    constructor(
        public DATA: APP_DATA,
        public APPERANCE: APP_APPERANCE,
        public UPDATE: APP_UPDATE,
        public SCHEDULE: APP_SCHEDULE,
        public BACKUP: APP_BACKUP,
        public VALIDATOR: APP_VALIDATOR
    ) { }
}