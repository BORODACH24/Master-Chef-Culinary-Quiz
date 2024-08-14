import { Injectable, inject } from "@angular/core";
import { AchivementsService } from "./achivements.service";
import { AudioService } from "./audio.service";
import { AuthService } from "./auth.service";
import { CheckService } from "./check.service";
import { Rank } from "../interfaces/rank";

@Injectable({
    providedIn: "root",
})
export class BackendService {
    public difficulties: Number[] = []
    public ranks: Rank[] = []

    public readonly auth = inject(AuthService);
    public readonly audio = inject(AudioService);
    public readonly achivements = inject(AchivementsService);
    public readonly check = inject(CheckService);
}
