import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";
import { GamePageComponent } from "./pages/game-page/game-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { MenuPageComponent } from "./pages/menu-page/menu-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { SettingsPageComponent } from "./pages/settings-page/settings-page.component";

export const routes: Routes = [
    { path: "login", component: LoginPageComponent, canActivate: [authGuard] },
    { path: "register", component: RegisterPageComponent, canActivate: [authGuard]},
    {
        path: "main",
        component: MainPageComponent,
        // loadComponent: ()=>import('./pages/main-page/main-page.component').then((i)=>i.MainPageComponent),
        canActivate: [authGuard],
        children: [
            { path: "", component: MenuPageComponent },
            { path: "game", component: GamePageComponent },
            // { path: "game", loadComponent: ()=>import('./pages/game-page/game-page.component').then((i)=>i.GamePageComponent) },
            { path: "settings", component: SettingsPageComponent },
        ],
    },
    { path: "**", redirectTo: "login" },
];
