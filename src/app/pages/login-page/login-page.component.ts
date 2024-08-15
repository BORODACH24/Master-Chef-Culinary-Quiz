import { CommonModule } from "@angular/common";
import { Component, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { TuiValidationError } from "@taiga-ui/cdk";
import { TuiErrorModule, TuiLoaderModule } from "@taiga-ui/core";
import { TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { CookieService } from "ngx-cookie-service";
import { BackendService } from "../../services/backend.service";
import { getErrorMessage } from "../../validators/register.validator";

@Component({
    selector: "app-login-page",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        TuiLoaderModule,
        TuiInputModule,
        TuiInputPasswordModule,
        RouterModule,
        TuiErrorModule,
    ],
    templateUrl: "./login-page.component.html",
    styleUrl: "./login-page.component.scss",
})
export class LoginPageComponent {
    public errorMessage: string | null = "";
    public isLoading = false;
    public loginForm: FormGroup = new FormGroup({
        username: new FormControl<string | null>(null, [Validators.required]),
        password: new FormControl<string | null>(null, [Validators.required]),
    });

    constructor(
        private readonly destroy: DestroyRef,
        private cookies: CookieService,
        private backend: BackendService,
        private router: Router
    ) {}

    public get usernameError(): TuiValidationError | null {
        return getErrorMessage(this.loginForm.controls["username"]);
    }
    public get passwordError(): TuiValidationError | null {
        return getErrorMessage(this.loginForm.controls["password"]);
    }

    public onFormSubmit(): void {
        this.isLoading = true;
        if (!this.loginForm?.valid) {
            // console.log("LoginForm error");
            return;
        }
        this.backend.auth
            .login(this.loginForm.value.username, this.loginForm.value.password)
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe({
                next: (data) => {
                    // console.log("Success");

                    this.backend.auth.token = data.token;
                    this.backend.auth.user = data;
                    this.cookies.set("token", data.token);
                    this.cookies.set("refreshToken", data.refreshToken);
                    this.router.navigateByUrl("main");
                },
                error: ({ error }) => {
                    this.isLoading = false;
                    console.log(error.message);
                    this.errorMessage = error.message;
                },
            });
    }
}
