import { Component, inject } from "@angular/core";
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
})
export class MenuPageComponent {
    public dialog = false;
    public count = 1;

    private cookies = inject(CookieService);
    private router = inject(Router);
    private auth = inject(BackendService).auth;

    public onAchivementsClick() {
        console.log(this.count);

        if (this.count === 5) {
            this.dialog = true;
            setTimeout(()=>{this.dialog=false},3000)
        } else {
            this.count++;
        }
    }

    public onLogoutClick(): void {
        this.auth.token = "";
        this.cookies.delete("token");
        this.cookies.delete("refreshToken");
        this.router.navigate([""]);
    }
}
