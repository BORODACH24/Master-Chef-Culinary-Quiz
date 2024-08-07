import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { User } from "../interfaces/user";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    public token = "";
    public user?: User;

    private cookies = inject(CookieService);
    private http = inject(HttpClient);
    private router = inject(Router);

    public isAuth(): boolean {
        if (!this.token) {
            this.token = this.cookies.get("token") || "";
        }
        return !!this.token;
    }

    public login(username: string, password: string): Observable<User> {
        return this.http.post<User>("https://dummyjson.com/auth/login", {
            username,
            password,
        });
    }
    public register(username: string, email: string, password: string): Observable<User> {
        return this.http.post<User>("https://dummyjson.com/users/add", {
            username,
            email,
            password,
        });
    }

    public getUser(): Observable<User> {
        return this.http.get<User>("https://dummyjson.com/auth/me");
    }
}
