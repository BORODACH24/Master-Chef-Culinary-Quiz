import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { BackendService } from "../services/backend.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(BackendService).auth;

    const authReq = req.clone({
        headers: req.headers.set(
            "Authorization",
            `Bearer ${authService.token}`
        ),
    });
    return next(authReq);
};
