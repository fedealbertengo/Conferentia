import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Chair} from "../../shared/dtoClasses";
import {GlobalService} from "../../shared/globalService";
import {ChairService} from "../../shared/chairService";

@Component({
  selector: 'page-chair',
  templateUrl: 'chair.html',
  providers: [ ChairService, GlobalService ]
})
export class ChairPage {

  private chair: Chair;
  private chairService: ChairService;
  meses: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, cs: ChairService) {
    this.chairService = cs;
    this.chair = this.chairService.getChairById(navParams.get('idChair'));
    // this.actividadesChair = this.actividadService.getActividadesByChairId(this.disertante.idDisertante);
    this.meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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
}
