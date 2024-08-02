import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { BackendService } from "../../services/backend.service";
import { TuiButtonModule } from "@taiga-ui/core";

@Component({
    selector: "app-menu-page",
    standalone: true,
    imports: [RouterModule, TuiButtonModule],
    templateUrl: "./menu-page.component.html",
    styleUrl: "./menu-page.component.scss",
})
export class MenuPageComponent {
    private cookies = inject(CookieService);
    private router = inject(Router);
    private auth = inject(BackendService).auth;

    public onLogoutClick(){
        this.auth.token = "";
        this.cookies.delete("token");
        this.cookies.delete("refreshToken");
        this.router.navigate([""]);
    }
}
