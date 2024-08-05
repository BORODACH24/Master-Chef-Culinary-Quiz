import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { User } from "../interfaces/user";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    public token = "";
    public user?: User;

    private cookies = inject(CookieService);

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    public isAuth(): boolean {
        if (!this.token) {
            this.token = this.cookies.get("token") || "";
        }
        return !!this.token;
    }

    public login(username: string, password: string) {
        return this.http.post<User>("https://dummyjson.com/auth/login", {
            username,
            password,
        });
    }
    public register(username: string, email: string, password: string) {
        return this.http.post<User>("https://dummyjson.com/users/add", {
            username,
            email,
            password,
        });
    }

    public getUser() {
        return this.http.get<User>("https://dummyjson.com/auth/me");
    }
}
