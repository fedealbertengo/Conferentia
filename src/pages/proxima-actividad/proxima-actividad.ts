import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Actividad} from "../../shared/dtoClasses";
import {ActividadService} from "../../shared/actividadService";

import * as moment from 'moment';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'page-proxima-actividad',
    templateUrl: 'proxima-actividad.html',
    providers: []
})
export class ProximaActividadPage {

    actividades: Actividad[];
    actividadService: ActividadService;

    constructor(public navCtrl: NavController,
                public platform: Platform,
                public translate: TranslateService,
                as: ActividadService) {
        this.actividadService = as;

        //Este bloque de código permite evitar el comportamiento
        // que deriva el footer de tabs ocultándose.
        platform.registerBackButtonAction(() => {
            if (navCtrl.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
                navCtrl.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
            } else {
                platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
            }
        });
    }

    ionViewWillEnter(){
        this.actividades = this.getProximaActividad();
    }

    //TODO: Usar Moment para toda la operatoria de próxima actividad
    obtenerHora(horaStr: string, fechaStr: string): Date{
        let fecha: Date = moment(fechaStr).toDate();
        let horas = parseInt(horaStr.split(":")[0]);
        let minutos = parseInt(horaStr.split(":")[1]);
        fecha.setHours(horas, minutos, 0);
        return fecha;
    }

    //TODO: Rehacer todo este quilombo usando Moment
    getProximaActividad(): Actividad[]{
        let actividades: Actividad[] = this.actividadService.getActividades();
        actividades = actividades.filter(Actividad => Actividad.rawFecha >= moment());

        actividades = actividades.sort(ActividadService.ordenarActividades);

        const actividadPrim: Actividad = actividades[0];
        return (actividades.filter(act =>  (this.obtenerHora(act.horaInicio, act.fecha)).getTime() == (this.obtenerHora(actividadPrim.horaInicio, actividadPrim.fecha)).getTime()));
    }

    //TODO: Cambiar esto por la localización de MomentJS
    getTiempoFaltante(actividad: Actividad): String{
        const today: Date = new Date();
        const horaActividad: Date = this.obtenerHora(actividad.horaInicio, actividad.fecha);

        const msEnUnDia = 86400000;
        const msEnUnaHora = 3600000;
        const msEnUnMinuto = 60000;

        let diffMs = Math.abs((horaActividad.getTime() - today.getTime()));
        let diffDays = Math.floor(diffMs / msEnUnDia);
        let diffHrs = Math.floor((diffMs % msEnUnDia) / msEnUnaHora);
        let diffMins = Math.round(((diffMs % msEnUnDia) % msEnUnaHora) / msEnUnMinuto);

        const days = this.translate.instant('days');
        const hours = this.translate.instant('hours');
        const minutes = this.translate.instant('minutes');

        let result = "";
        if(diffDays > 0){
            result = `${diffDays} ${days}, ${diffHrs} ${hours}, ${diffMins} ${minutes}`;
        }
        else{
            if(diffHrs > 0){
                result = `${diffHrs} ${hours}, ${diffMins} ${minutes}`;
            }
            else{
                result = `${diffMins} ${minutes}`;
            }
        }
        return result;
    }
}
