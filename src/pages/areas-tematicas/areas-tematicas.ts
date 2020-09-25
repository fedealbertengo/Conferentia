import {Component} from "@angular/core";
import {GlobalService} from "../../shared/globalService";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {AreaTematica} from "../../shared/dtoClasses";
import {NavController, NavParams, Platform} from "ionic-angular";
import {RouterService} from "../../shared/routerService";

@Component({
  selector: 'page-areas-tematicas',
  templateUrl: 'areas-tematicas.html',
  providers: [ AreaTematicaService, GlobalService ]
})
export class AreasTematicasPage {

  private areaTematicaService: AreaTematicaService;
  private areasTematicasArray: AreaTematica[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, as: AreaTematicaService){

    this.areaTematicaService = as;

    this.cargarAreasTematicas();

    platform.registerBackButtonAction(() => {
      if (navCtrl.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
        navCtrl.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
      } else {
        platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
      }
    });
  }

  cargarAreasTematicas(){
    this.areasTematicasArray = this.areaTematicaService.getAreasTematicas();
  }

  goToAreaTematica(params){
    RouterService.goToAreaTematica(this.navCtrl, params);
  }

}
