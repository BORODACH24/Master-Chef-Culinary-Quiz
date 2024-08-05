import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    inject,
} from "@angular/core";
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
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
                Validators.pattern("(?=.*[a-z]).*"),
            ]),
            passwordConfirm: new FormControl<string>("", [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(64),
                Validators.pattern("(?=.*[a-z]).*"),
            ]),
        },
        {
            validators: registerValidator(),
        }
    );

    private readonly destroy = inject(DestroyRef);
    private cookies = inject(CookieService);
    private auth = inject(BackendService).auth;
    private cdr = inject(ChangeDetectorRef);
    private router = inject(Router);

    public get formError() {
        return this.registerForm.errors
            ? new TuiValidationError("Passwords must match")
            : null;
    }
    public get usernameError() {
        return this.registerForm.controls["username"].errors &&
            this.registerForm.controls["username"].touched
            ? new TuiValidationError(
                  getErrorMessage(this.registerForm.controls["username"])
              )
            : null;
    }
    public get emailError() {
        return this.registerForm.controls["email"].errors &&
            this.registerForm.controls["email"].touched
            ? new TuiValidationError(
                  getErrorMessage(this.registerForm.controls["email"])
              )
            : null;
    }
    public get passwordError() {
        return this.registerForm.controls["password"].errors &&
            this.registerForm.controls["password"].touched
            ? new TuiValidationError(
                  getErrorMessage(this.registerForm.controls["password"])
              )
            : null;
    }

    public onFormSubmit() {
        if (!this.registerForm?.valid) {
            console.log("LoginForm error");
            this.registerForm.markAllAsTouched()
            return;
        }
        this.isLoading = true;
        this.auth
            .register(
                this.registerForm.value.username,
                this.registerForm.value.email,
                this.registerForm.value.passwordConfirm
            )
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe({
                next: data => {
                    console.log("Success");
                    console.log(data);
                    
                    this.auth.token = data.token ?? "default_token";
                    this.auth.user = data;
                    this.cookies.set("token", data.token ?? "default_token");
                    this.cookies.set("refreshToken", data.refreshToken ?? "default_refresh_token");
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
