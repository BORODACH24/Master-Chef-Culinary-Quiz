import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { TuiErrorModule, TuiLoaderModule } from "@taiga-ui/core";
import { TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { CookieService } from "ngx-cookie-service";
import { BackendService } from "../../services/backend.service";
import { Router } from "@angular/router";
import { registerValidator } from "../../validators/register.validator";
import { TuiValidationError } from "@taiga-ui/cdk";

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
    ],
    templateUrl: "./register-page.component.html",
    styleUrl: "./register-page.component.scss",
})
export class RegisterPageComponent {
    public errorMessage: string | null = "";
    public isLoading = false;
    public registerForm: FormGroup = new FormGroup(
        {
            username: new FormControl<string>("", [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(64),
                Validators.pattern("w+"),
            ]),
            email: new FormControl<string>("", [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(64),
                Validators.email
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

    public get formError() {
        return this.registerForm.errors
            ? new TuiValidationError("Passwords must match")
            : null;
    }
    public get usernameError() {
        console.error(this.registerForm.controls["username"].errors);

        return this.registerForm.controls["username"].errors
            ? new TuiValidationError("Username error")
            : null;
    }
    public get emailError() {
        console.error(this.registerForm.controls["email"].errors);

        return this.registerForm.controls["email"].errors
            ? new TuiValidationError("Email error")
            : null;
    }
    public get passwordError() {
        const error = this.registerForm.controls["password"].errors
        let errorMessage = "Password error"
        console.error();

        return this.registerForm.controls["password"].errors
            ? new TuiValidationError(errorMessage)
            : null;
    }

    constructor(private router: Router) {}

    ngOnInit(): void {}

    public onFormSubmit() {
        // this.isLoading = true;
        // if (!this.loginForm?.valid) {
        //     console.log("LoginForm error");
        //     return;
        // }
        // this.auth
        //     .login(this.loginForm.value.username, this.loginForm.value.password)
        //     .pipe(takeUntilDestroyed(this.destroy))
        //     .subscribe({
        //         next: data => {
        //             console.log("Success");
        //             this.auth.token = data.token;
        //             this.auth.user = data;
        //             this.cookies.set("token", data.token);
        //             this.cookies.set("refreshToken", data.refreshToken);
        //             this.router.navigateByUrl("main");
        //         },
        //         error: ({ error }) => {
        //             this.isLoading = false;
        //             console.log(error.message);
        //             this.errorMessage = error.message;
        //         },
        //     });
    }
}
