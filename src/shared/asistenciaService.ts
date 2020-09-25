import {Component} from "@angular/core";
import {DataBaseAccess} from "./databaseAccess";
import {Http} from "@angular/http";
import * as moment from 'moment';
import {GlobalService} from "./globalService";

@Component({
    providers: [DataBaseAccess]
})

export class AsistenciaService {

    constructor(public dataBaseAccess: DataBaseAccess, public http: Http){

    }

    public registrarAsistencia(idUsuario: number, idActividad: number, entrada: boolean):any{
        let comando: string = ((entrada) ? 'registrarAsistenciaEntrada' : 'registrarAsistenciaSalida');
        return this.dataBaseAccess.excecuteSentenceDB(DataBaseAccess.archivoEjecucion, ["command", comando, "id_usuario", idUsuario.toString(), "id_activity", idActividad.toString(), 'jwt', GlobalService.jwt], this.http);
    }

    public obtenerAsistencias(idUsuario: number, idActividad?: number, entrada?: boolean):any{
        let parametros: string[] = ["command", "obtenerAsistencias", 'jwt', GlobalService.jwt];
        if(idUsuario){
            parametros.push("id_usuario");
            parametros.push(idUsuario.toString());
        }
        if(idActividad){
            parametros.push("id_activity");
            parametros.push(idActividad.toString());
        }
        if(entrada != null){
            parametros.push("entrada");
            parametros.push(((entrada == true) ? "Entrada" : "Salida"));
        }
        return this.dataBaseAccess.consultarDB(DataBaseAccess.archivoConsulta, parametros, this.http);
    }

}