import {Actividad} from "../../shared/dtoClasses";
import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {ActividadService} from "../../shared/actividadService";

@Component({
    selector: 'card-dia-ocupado',
    templateUrl: 'card-dia-ocupado.html',
})
export class CardDiaOcupadoComponent {

    @Input() actividades:Actividad[] = [];
    @Input() dia: any;

    constructor(public navCtrl: NavController) {

    }
}
