import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {DisertanteService} from "../../shared/disertanteService";
import {Disertante} from "../../shared/dtoClasses";
import {RouterService} from "../../shared/routerService";

@Component({
  selector: 'page-disertantes',
  templateUrl: 'disertantes.html'
})
export class DisertantesPage {

  private disertantes: Disertante[];
  private disertanteService: DisertanteService;

  constructor(public navCtrl: NavController, public platform: Platform, ds: DisertanteService) {
    this.disertanteService = ds;
    this.disertantes = this.disertanteService.getDisertantes();

    platform.registerBackButtonAction(() => {
      if (navCtrl.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
        navCtrl.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
      } else {
        platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
      }
    });
  }

  goToDisertante(params){
    RouterService.goToDisertante(this.navCtrl, params);
  }

}
