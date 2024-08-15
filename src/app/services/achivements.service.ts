import { DestroyRef, Inject, Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TuiPushService } from "@taiga-ui/kit";
import { Achivement } from "../interfaces/achivements";
import { AudioService } from "./audio.service";

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

    public checkAchivements(): void {
        this.achivements.forEach((item) => {
            if (item.currentCount >= item.necessaryCount && !item.done) {
                item.done = true;
                this.showPush(item.title);
            }
        });
    }
    private showPush(message: string): void {
        this.audio.achivementSound();
        const push = this.push
            .open(message, {
                heading: "Congratilations",
                type: "Achivement",
                icon: "tuiIconCoffeeLarge",
            })
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe();
        setTimeout(() => {
            push.unsubscribe();
        }, 3000);
    }
}
