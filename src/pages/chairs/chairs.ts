import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Chair} from "../../shared/dtoClasses";
import {GlobalService} from "../../shared/globalService";
import {ChairService} from "../../shared/chairService";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {MarcadorService} from "../../shared/marcadorService";
import {RouterService} from "../../shared/routerService";

@Component({
  selector: 'page-chairs',
  templateUrl: 'chairs.html',
  providers: [ ChairService, AreaTematicaService, GlobalService, MarcadorService]
})
export class ChairsPage {

  private chairs: Chair[];
  private chairService: ChairService;

  constructor(public navCtrl: NavController, public platform: Platform, ds: ChairService) {
    this.chairService = ds;
    this.chairs = this.chairService.getChairs();

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

  goToChair(params){
    RouterService.goToChair(this.navCtrl, params);
  }

}
