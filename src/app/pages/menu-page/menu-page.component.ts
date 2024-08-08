import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { TuiButtonModule, TuiSvgModule } from "@taiga-ui/core";
import { CookieService } from "ngx-cookie-service";
import { BackendService } from "../../services/backend.service";
import { TuiPushModule } from "@taiga-ui/kit";

@Component({
    selector: "app-menu-page",
    standalone: true,
    imports: [RouterModule, TuiButtonModule, TuiPushModule, TuiSvgModule],
    templateUrl: "./menu-page.component.html",
    styleUrl: "./menu-page.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent {
    public dialog = false;

    private auth = inject(BackendService).auth;
    private achivements = inject(BackendService).achivements;
    constructor(
        private cookies: CookieService,
        private router:Router,
        // private auth: BackendService,
        private cdr:ChangeDetectorRef
    ){}

    public onAchivementsClick() {
        if (this.achivements.count < 5) {
            this.achivements.count++;
            if (this.achivements.count === 5) {
                this.dialog = true;
                setTimeout(() => {
                    this.dialog = false;
                    this.cdr.markForCheck();
                }, 3000);
            }
        } else {
            console.log("achivs");
        }
    }

    public onLogoutClick(): void {
        this.auth.token = "";
        this.cookies.delete("token");
        this.cookies.delete("refreshToken");
        this.router.navigate([""]);
    }
}
