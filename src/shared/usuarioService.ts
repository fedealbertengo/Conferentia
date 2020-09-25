import {Component} from "@angular/core";
import {Usuario} from "./dtoClasses";
import {DataBaseAccess} from "./databaseAccess";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {GlobalService} from "./globalService";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
    providers: [DataBaseAccess]
})

export class UsuarioService{

    private static usuarioLogeado;

    //FIXME: Eliminar http, dado que está deprecado. Reemplazar por HttpClient
    constructor(public dataBaseAccess: DataBaseAccess, public http: Http, public httpClient: HttpClient){

    }

    public static getUsuarioLogeado(): Usuario{
        return this.usuarioLogeado;
    }

    public static setUsuarioLogeado(user: Usuario){
        this.usuarioLogeado = user;
    }

    public getUsuarios(user_name, password):any{
        return this.dataBaseAccess.consultarDB(DataBaseAccess.archivoConsulta, ["command", "getUsuarios", "user_name", user_name, "password", password, 'jwt', GlobalService.jwt], this.http);
    }

    public getUsuarioById(idUsuario: number):any{
        return this.dataBaseAccess.consultarDB(DataBaseAccess.archivoConsulta, ["command", "getUsuarioById", "id_usuario", idUsuario.toString(), 'jwt', GlobalService.jwt], this.http);
    }

    public getUsuarioByRegistrationId(registrationId: string):any{
        return this.dataBaseAccess.consultarDB(DataBaseAccess.archivoConsulta, ["command", "getUsuarioByRegistrationId", "registration_id", registrationId.toString(), 'jwt', GlobalService.jwt], this.http);
    }

    //TODO: Pulir para versión final
    /**
     * Obtiene las actividades asignadas específicamente al usuario actual
     * @param {number} idUsuario
     * @returns {Observable<any>}
     */
    public getActividadesAsignadasUsuario(idUsuario: number){
        return this.dataBaseAccess.consultarDB(DataBaseAccess.archivoConsulta, ["command", "getActividadesAsignadasUsuario", "id_usuario", idUsuario.toString()], this.http);
    }

    public getUser(username: string, password: string): Observable<any>{
        const url = GlobalService.webApiLocation + 'user.php';
        let params = new HttpParams().set('action', 'getUser').set('user_name', username).set('password', password);
        return this.httpClient.get(url, {params: params});
    }

}
