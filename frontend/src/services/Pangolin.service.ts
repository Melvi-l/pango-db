import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import PangolinModel from "src/models/pangolin.model"
import ResBody from "src/models/resbody.model"

export type PangolinInput = {
    name: string
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
        return this.http.get<PangolinModel[]>(this.url)
    }
    findOnePangolin(id: string) {
        return this.http.get<PangolinModel>(this.url+id)
    }
    createPangolin(pangolinInput: PangolinInput) {
        return this.http.post<ResBody>(this.url, pangolinInput)
    }
    updatePangolin(id: string, pangolinInput: PangolinModel) {
        return this.http.put<ResBody>(this.url+id, pangolinInput)
    }
    deletePangolin(id: string) {
        return this.http.delete<ResBody>(this.url+id)
    }
}