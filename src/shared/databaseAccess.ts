import {Http, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {GlobalService} from "./globalService";

export class DataBaseAccess{

    private _servidor: string = GlobalService.dataSourceLocation + "api/";

    public static archivoEjecucion: string = "executeDatabaseMySQL.php";
    public static archivoConsulta: string = "consultDatabaseMySQL.php";

    constructor(){

    }

    get servidor(): string {
        return this._servidor;
    }

    public consultarDB(archivo: string, parametros: string[], http: Http): Observable<any>{
        let opciones: RequestOptions = null;
        if(parametros.length > 0){
            let params = new URLSearchParams();
            let i=0;
            parametros.forEach(param => {
                if(i%2 == 0){
                    params.append(param, parametros[i+1]);
                }
                i++;
            });
            opciones = new RequestOptions({
                search: params
            });
        }
        let response;
        let url = (this.servidor + archivo);
        if(opciones != null){
            response = http.get(url, opciones);
        }
        else{
            response = http.get(url);
        }
        return response.map(res => res.json());
    }

    public excecuteSentenceDB(archivo: string, parametros: string[], http: Http): Observable<any>{
        let opciones: RequestOptions = null;

        if(parametros.length > 0){
            let params = new URLSearchParams();
            let i=0;
            parametros.forEach(param => {
                if(i%2 == 0){
                    params.append(param, parametros[i+1]);
                }
                i++;
            });
            opciones = new RequestOptions({
                search: params
            });
        }

        let response;
        let url = (this.servidor + archivo);
        if(opciones != null){
            response = http.get(url, opciones);
        }
        else{
            response = http.get(url);
        }
        return response.map(res => res.json());
    }
}
