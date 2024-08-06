import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { BackendService } from "../services/backend.service";

export const authGuard: CanActivateFn = route => {
    const authService = inject(BackendService).auth;
    const router = inject(Router);
    const redirectIfAuth = route.routeConfig?.path == "login" || route.routeConfig?.path == "register";
    if (redirectIfAuth && authService.isAuth()) {
        router.navigate(["main"]);
        return true;
    }
    if (redirectIfAuth) {
        return true;
    }
    if (authService.isAuth()) {
        console.log("AuthGuard Success");
        return true;
    } else {
        console.log("AuthGuard Fail");

        router.navigate(["login"]);
        return false;
    }
};
