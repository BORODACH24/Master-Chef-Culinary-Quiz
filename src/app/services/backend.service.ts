import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root",
})
export class BackendService {
    public readonly auth = inject(AuthService);
}
