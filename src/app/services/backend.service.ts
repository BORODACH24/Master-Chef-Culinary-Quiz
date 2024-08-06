import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { AudioService } from "./audio.service";

@Injectable({
    providedIn: "root",
})
export class BackendService {
    public readonly auth = inject(AuthService);
    public readonly audio = inject(AudioService);
}
