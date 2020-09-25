import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {OrganizadorService} from "../../shared/organizadorService";
import {GlobalService} from "../../shared/globalService";
import {RouterService} from "../../shared/routerService";

@Component({
    selector: 'page-inicio',
    templateUrl: 'inicio.html',
    providers: [OrganizadorService, GlobalService]
})
export class InicioPage{

    private organizadorService: OrganizadorService;
    private globalService: GlobalService;
    private logoSource:string = '';

    logoEnabled: boolean = GlobalService.logoEnabled;
    sponsorsEnabled: boolean = GlobalService.sponsorsEnabled;
    buttonBarEnabled:boolean = GlobalService.buttonBarEnabled;

    constructor(public navCtrl: NavController, public platform: Platform, or: OrganizadorService, gs: GlobalService) {

        this.globalService = gs;
        this.organizadorService = or;

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

    ngOnInit(){
        this.logoSource = `${GlobalService.imagesFolder}logo.png`;
    }
}
