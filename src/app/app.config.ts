import { provideHttpClient, withInterceptors } from "@angular/common/http";
import {
    ApplicationConfig,
    provideZoneChangeDetection,
    importProvidersFrom,
} from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { TuiRootModule } from "@taiga-ui/core";

import { routes } from "./app.routes";
import { authInterceptor } from "./interceptor/auth.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        importProvidersFrom(TuiRootModule),
        provideHttpClient(withInterceptors([authInterceptor]))
    ],
};
