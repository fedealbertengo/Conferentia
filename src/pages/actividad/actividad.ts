import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ActividadService} from "../../shared/actividadService";
import {Actividad} from "../../shared/dtoClasses";

@Component({
    selector: 'page-actividad',
    templateUrl: 'actividad.html'
})
export class ActividadPage {

    private actividad:Actividad;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public actividadService: ActividadService) {
        this.actividad = this.actividadService.getActividadById(navParams.get('id'));
    }
}
