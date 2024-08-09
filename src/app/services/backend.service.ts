import { Injectable, inject } from "@angular/core";
import { AudioService } from "./audio.service";
import { AuthService } from "./auth.service";
import { AchivementsService } from "./achivements.service";
import { CheckService } from "./check.service";

@Injectable({
    providedIn: "root",
})
export class BackendService {
    public readonly auth = inject(AuthService);
    public readonly audio = inject(AudioService);
    public readonly achivements = inject(AchivementsService);
    public readonly check = inject(CheckService);
}
