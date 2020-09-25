import {Component} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {AreaTematica} from "../../shared/dtoClasses";

@Component({
  selector: 'page-area-tematica',
  templateUrl: 'area-tematica.html'
})
export class AreaTematicaPage {

  private areaTematica: AreaTematica;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform){

    this.areaTematica = navParams.get("areaTematica");

    platform.registerBackButtonAction(() => {
      if (navCtrl.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
        navCtrl.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
      } else {
        platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
      }
    });

  }

}
