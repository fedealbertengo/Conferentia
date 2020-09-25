// Servicio para funcionalidad general relacionada a la gestión de disertantes

import {Disertante} from "./dtoClasses";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GlobalService} from "./globalService";

@Injectable()
export class DisertanteService{

    public arrayDisertantes:Disertante[] = [];

    //TODO: Refactor for general use
    private defaultAvatarLocation = 'assets/img/';
    private avatarLocation = GlobalService.avataresFolder;

    constructor(public http:HttpClient){
    }

    /**
     * Obtiene todos los disertantes de un archivo JSON y las devuelve para su procesamiento
     */

    getTimestamp(): Observable<any>{
        const url = GlobalService.webApiLocation + 'disertantes.php';
        let params = new HttpParams().set('action', 'getTimestamp').set('jwt', GlobalService.jwt);
        return this.http.get(url, {params: params});
    }

    getDisertantesFromJson(): Observable<any>{
        const url = GlobalService.webApiLocation + 'disertantes.php';
        let params = new HttpParams().set('action', 'getDisertantes').set('jwt', GlobalService.jwt);
        return this.http.get(url, {params: params});
    }

    generateDisertantes(rawDisertantes:Disertante[]){
        const crearDisertante = Disertante => this.crearDisertante(Disertante);
        return rawDisertantes.map(crearDisertante);
    }

    public getDisertantes():Disertante[]{
        return this.arrayDisertantes.sort(this.ordenarDisertantes);
    }

    public getDisertanteById(idDisertante:number):Disertante{
        return this.arrayDisertantes.filter(Disertante => Disertante.idDisertante === idDisertante)[0];
    }

    public getAvatarHombreRandom(){
        const randomNumber:number = Math.floor(Math.random() * 4) + 1;
        return this.defaultAvatarLocation + 'avatar' + randomNumber + '.png';
    }

    public getAvatarMujerRandom(){
        const randomNumber:number = Math.floor(Math.random() * 2) + 5;
        return this.defaultAvatarLocation + 'avatar' + randomNumber + '.png';
    }

    public getAvatarAbstract(){
        const randomNumber:number = Math.floor(Math.random() * 2) + 1;
        return this.defaultAvatarLocation + 'abstract' + randomNumber + '.png';
    }

    private crearDisertante(rawDisertante:Disertante):Disertante{
        let newDisertante:Disertante = Object.assign({}, rawDisertante);
        newDisertante.imgString = this.generarAvatar(rawDisertante);
        return newDisertante;
    }

    private generarAvatar(disertante:Disertante){
        return disertante.imgString ? this.generarAvatarDefinido(disertante.imgString): this.generarAvatarRandom(disertante.gender);
    };

    private generarAvatarRandom(gender: string){
        const genderList = {
            f: this.getAvatarMujerRandom(),
            m: this.getAvatarHombreRandom(),
            o: this.getAvatarAbstract(),
        };
        return gender ? genderList[gender] : genderList['o'];
    }

    private generarAvatarDefinido(source:string){
        return this.avatarLocation + source;
    }

    public ordenarDisertantes(a:Disertante, b:Disertante){
        const disertanteA = a.nombreCompleto;
        const disertanteB = b.nombreCompleto;

        if(disertanteA < disertanteB){
            return -1;
        }
        if(disertanteA > disertanteB){
            return 1;
        }

        return 0;
    }

}
