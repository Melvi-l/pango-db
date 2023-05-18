import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

export type PangolinInput = {
    name: String
    role: 'Guerrier' | 'Alchimiste' | 'Sorcier' | 'Espion' | 'Enchanteur'
}


@Injectable({
    providedIn: 'root'
})
export default class PangolinService {
    private url: string
    constructor(private http: HttpClient) {
        this.url = "http://localhost:8080/pangolin/"
    }
    findAllPangolin() {
        return this.http.get(this.url)
    }
    findOnePangolin(id: string) {
        return this.http.get(this.url+id)
    }
    createPangolin(pangolinInput: PangolinInput) {
        return this.http.post(this.url, pangolinInput)
    }
    updatePangolin(id: string, pangolinInput: PangolinInput) {
        return this.http.put(this.url+id, pangolinInput)
    }
    deletePangolin(id: string) {
        return this.http.delete(this.url+id)
    }
}