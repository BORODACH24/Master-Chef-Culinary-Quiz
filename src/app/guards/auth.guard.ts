import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { BackendService } from "../services/backend.service";

export const authGuard: CanActivateFn = () => {
    const authService = inject(BackendService).auth;
    const router = inject(Router);
    if (authService.isAuth()) {
        console.log("AuthGuard Success");

        return true;
    } else {
        console.log("AuthGuard Fail");

        router.navigate([""]);
        return false;
    }
};
