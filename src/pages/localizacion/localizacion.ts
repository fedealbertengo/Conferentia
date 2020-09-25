import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import {RouterService} from "../../shared/routerService";

@Component({
    selector: 'page-localizacion',
    templateUrl: 'localizacion.html'
})

export class LocalizacionPage {

    nav: NavController;
    rootPage:any = InicioPage;

    constructor(public navCtrl: NavController, public platform: Platform) {
        this.nav = navCtrl;

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

    goToSantaFeTurismo(params){
        if(this.platform.is('android')){
            RouterService.goToSantaFeTurismoAndroid(this.nav, params);
        }
        if(this.platform.is('ios)')){
            RouterService.goToSantaFeTurismoApple(this.nav, params);
        }
    }

    goToCuandoPasa(params){
        RouterService.goToCuandoPasa(this.nav, params);
    }

    goToCualMeLleva(params){
        RouterService.goToCualMeLleva(this.nav, params);
    }

    goToMapaInstalacionesUTN(params){
        RouterService.goToMapaInstalacionesUTN(this.nav, params);
    }

    goToMapaInstalaciones(params){
        RouterService.goToMapaInstalaciones(this.nav, params);
    }

    goToMapaInstalacionesUNL(params){
        RouterService.goToMapaInstalacionesUNL(this.nav, params);
    }

    goToMapaCiudad(params){
        RouterService.goToMapaCiudad(this.nav, params);
    }

}
