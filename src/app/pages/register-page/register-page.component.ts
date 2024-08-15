import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef
} from "@angular/core";
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
import {
    getErrorMessage,
    registerValidator,
} from "../../validators/register.validator";

@Component({
    selector: "app-register-page",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        TuiLoaderModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiErrorModule,
        RouterModule,
    ],
    templateUrl: "./register-page.component.html",
    styleUrl: "./register-page.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
    public errorMessage: string | null = "";
    public isLoading = false;
    public registerForm: FormGroup = new FormGroup(
        {
            username: new FormControl<string>("", {
                validators: [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(64),
                    Validators.pattern("[a-zA-z]+"),
                ],
                updateOn: "change",
            }),
            email: new FormControl<string>("", [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl<string>("", [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(64),
                Validators.pattern(String.raw`(?=\w*[a-z])\w*`),
            ]),
            passwordConfirm: new FormControl<string>("", [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(64),
                Validators.pattern(String.raw`(?=\w*[a-z])\w*`),
            ]),
        },
        {
            validators: registerValidator(),
        }
    );

    constructor(
        private readonly destroy: DestroyRef,
        private cookies: CookieService,
        private backend: BackendService,
        private router: Router
    ) {}

    public get formError(): TuiValidationError | null {
        return this.registerForm.errors
            ? new TuiValidationError("Passwords must match")
            : null;
    }
    public get usernameError(): TuiValidationError | null {
        return getErrorMessage(this.registerForm.controls["username"]);
    }
    public get emailError(): TuiValidationError | null {
        return getErrorMessage(this.registerForm.controls["email"]);
    }
    public get passwordError(): TuiValidationError | null {
        return getErrorMessage(this.registerForm.controls["password"]);
    }

    public onFormSubmit(): void {
        if (!this.registerForm?.valid) {
            console.log("LoginForm error");
            this.registerForm.markAllAsTouched();
            return;
        }
        this.isLoading = true;
        this.backend.auth
            .register(
                this.registerForm.value.username,
                this.registerForm.value.email,
                this.registerForm.value.passwordConfirm
            )
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe({
                next: (data) => {
                    // console.log("Success");
                    // console.log(data);

                    this.backend.auth.token = data.token ?? "default_token";
                    this.backend.auth.user = data;
                    this.cookies.set("token", data.token ?? "default_token");
                    this.cookies.set(
                        "refreshToken",
                        data.refreshToken ?? "default_refresh_token"
                    );
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
