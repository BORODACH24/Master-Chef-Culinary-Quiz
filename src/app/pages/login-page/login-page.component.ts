import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { BackendService } from "../../services/backend.service";
import { CookieService } from "ngx-cookie-service";
import { CommonModule } from "@angular/common";
import { TuiErrorModule, TuiLoaderModule } from "@taiga-ui/core";
import { TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { TuiValidationError } from "@taiga-ui/cdk";
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
        TuiErrorModule
    ],
    templateUrl: "./login-page.component.html",
    styleUrl: "./login-page.component.scss",
})
export class LoginPageComponent {
    public errorMessage: string | null = "";
    public isLoading = false;
    public loginForm: FormGroup = new FormGroup({
        username: new FormControl<string | null>(null, [
            Validators.required,
        ]),
        password: new FormControl<string | null>(null, [
            Validators.required,
        ]),
    });

    private readonly destroy = inject(DestroyRef);
    private cookies = inject(CookieService);
    private auth = inject(BackendService).auth;

    constructor(private router: Router) {}

    ngOnInit(): void {
        // this.router.navigateByUrl("main");
    }
    public get usernameError() {
        return this.loginForm.controls["username"].errors &&
            this.loginForm.controls["username"].touched
            ? new TuiValidationError(
                  getErrorMessage(this.loginForm.controls["username"])
              )
            : null;
    }
    public get passwordError() {
        return this.loginForm.controls["password"].errors &&
            this.loginForm.controls["password"].touched
            ? new TuiValidationError(
                  getErrorMessage(this.loginForm.controls["password"])
              )
            : null;
    }
    public onFormSubmit() {
        this.isLoading = true;
        if (!this.loginForm?.valid) {
            console.log("LoginForm error");
            return;
        }
        this.auth
            .login(this.loginForm.value.username, this.loginForm.value.password)
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe({
                next: data => {
                    console.log("Success");

                    this.auth.token = data.token;
                    this.auth.user = data;
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
