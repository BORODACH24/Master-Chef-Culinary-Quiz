import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { TuiButtonModule, TuiSvgModule } from "@taiga-ui/core";
import { TuiPushModule } from "@taiga-ui/kit";
import { CookieService } from "ngx-cookie-service";
import { Achivement } from "../../interfaces/achivements";
import { BackendService } from "../../services/backend.service";

@Component({
    selector: "app-menu-page",
    standalone: true,
    imports: [RouterModule, TuiButtonModule, TuiPushModule, TuiSvgModule],
    templateUrl: "./menu-page.component.html",
    styleUrl: "./menu-page.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent {
    constructor(
        private cookies: CookieService,
        private router: Router,
        private backend: BackendService,
        private cdr: ChangeDetectorRef
    ) {}

    public onAchivementsClick(): void {
        const achiveService = this.backend.achivements;
        const achive = (achiveService.achivements.get("clickAchiveButton") as Achivement);
        if (!achive.done) {
            achive.currentCount++;
            achiveService.checkAchivements();
        } else {
            // console.log("achives");
            this.router.navigateByUrl("main/achivements");
        }
    }

    public buttonSound(): void {
        this.backend.audio.buttonSound();
    }

    public onLogoutClick(): void {
        // console.log("Logout");

        this.backend.auth.token = "";

        // console.log(this.cookies);
        
        this.cookies.delete("token");
        this.cookies.delete("refreshToken");
        // this.cdr.markForCheck();
    }
}
