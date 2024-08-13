import { Injectable, Inject, DestroyRef } from "@angular/core";
import { TuiPushService } from "@taiga-ui/kit";
import { take, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AudioService } from "./audio.service";
import { Achivement } from "../interfaces/achivements";

@Injectable({
    providedIn: "root",
})
export class AchivementsService {
    public achivements = new Map<string, Achivement>();

    constructor(
        @Inject(TuiPushService) protected readonly push: TuiPushService,
        private destroy: DestroyRef,
        private audio: AudioService
    ) {}

    public checkAchivements() {
        this.achivements.forEach((item, index) => {
            if (item.currentCount === item.necessaryCount && !item.done) {
                item.done = true
                this.showPush(item.message)
            }
        });
    }
    private showPush(message: string): void {
        this.audio.achivementSound();
        this.push
            .open(message, {
                heading: "Congratilations",
                type: "Achivement",
                icon: "tuiIconCoffeeLarge",
            })
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe(data => console.log("data: " + data));
    }
}
