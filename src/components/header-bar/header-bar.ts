import {Component, Input} from '@angular/core';
import {RouterService} from "../../shared/routerService";
import {NavController} from "ionic-angular";
import {GlobalService} from "../../shared/globalService";

/**
 * Generated class for the HeaderBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'header-bar',
    templateUrl: 'header-bar.html'
})
export class HeaderBarComponent {

    @Input() pageTitle: string;
    @Input() navCtrl: NavController;
    userLoginEnabled: boolean = GlobalService.usaInicioSesion;

    constructor() {
    }

    goToPerfil(){
        RouterService.goToPerfil(this.navCtrl, {});
    }

}
