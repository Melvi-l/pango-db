import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { stringify } from "querystring"
import ResBody from "src/models/resbody.model"

export type AuthInput = {
    username: String
    password: String
}

export type AuthRes = {
    userId: string,
    token: string
}

@Injectable({
    providedIn: 'root'
})
export default class AuthService {
    // TODO impl ajouter un local storage du token
    private url: string
    private userId: string = ""
    private authToken: string = ""
        
    constructor(private http: HttpClient) {
        this.url = "http://localhost:8080/auth/"
    }
    logIn(authInput: AuthInput) {
        const res = this.http.post<AuthRes>(this.url+"login", authInput)
        res.subscribe({
            next: (authRes) => {
                this.setAuthToken(authRes.token)
                this.setUserId(authRes.userId)
            }
        })
        return res 
    }
    signUp(authInput: AuthInput) {
        console.log(authInput)
        const res = this.http.post<AuthRes>(this.url+"signup", authInput)
        res.subscribe({
            next: (authRes) => {
                this.setAuthToken(authRes.token)
                this.setUserId(authRes.userId)
            }
        })
        return res
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
    getUserId(): string {
        return this.userId
    }
    setUserId(id: string) {
        this.userId = id
    }
}