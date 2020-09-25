import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {DisertanteService} from "../../shared/disertanteService";
import {Actividad, Disertante} from "../../shared/dtoClasses";
import {ActividadService} from "../../shared/actividadService";

@Component({
  selector: 'page-disertante',
  templateUrl: 'disertante.html'
})
export class DisertantePage {

  private disertante: Disertante;
  private actividadesDisertante: Actividad[];
  private actividadesModerador: Actividad[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public actividadService:ActividadService,
              public disertanteService: DisertanteService) {

    if(navParams.get('idDisertante')){
        this.disertante = this.disertanteService.getDisertanteById(navParams.get('idDisertante'));
        this.actividadesDisertante = this.actividadService.getActividadesByDisertanteId(this.disertante.idDisertante);
        this.actividadesModerador = this.actividadService.getActividadesByModeradorId(this.disertante.idDisertante);
    }

    platform.registerBackButtonAction(() => {
      if (navCtrl.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
        navCtrl.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
      } else {
        platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
      }
    });
  }

}
