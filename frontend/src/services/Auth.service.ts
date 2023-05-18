import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { stringify } from "querystring"

export type AuthInput = {
    username: String
    password: String
}

@Injectable({
    providedIn: 'root'
})
export default class AuthService {
    private url: string
    private authToken: string = ""
        
    constructor(private http: HttpClient) {
        this.url = "http://localhost:8080/auth/"
    }
    logIn() {
        // TODO impl: ajouter les headers dans AuthInterceptor
    }
    signUp() {
        // TODO impl
    }
    logOut() {
        this.authToken = ""
    }
    getAuthToken(): string {
        return this.authToken
    }
    setAuthToken(token: string) {
        this.authToken = token
    }
    isAuth() {
        return this.authToken != ""
    }
}