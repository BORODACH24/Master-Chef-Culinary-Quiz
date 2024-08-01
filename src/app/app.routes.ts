import { Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { SettingsPageComponent } from "./pages/settings-page/settings-page.component";
import { authGuard } from "./guards/auth.guard";
import { MenuPageComponent } from "./pages/menu-page/menu-page.component";

export const routes: Routes = [
    { path: "", component: LoginPageComponent },
    {
        path: "main",
        component: MainPageComponent,
        canActivate: [authGuard],
        children: [
            { path: "", component: MenuPageComponent },
            { path: "settings", component: SettingsPageComponent },
        ],
    },
];
