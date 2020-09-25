import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {GlobalService} from "../../shared/globalService";
import {Sponsor} from "../../shared/dtoClasses";
import {RouterService} from "../../shared/routerService";
import {SponsorService} from "../../shared/sponsor.service";

@Component({
    selector: 'page-sponsors',
    templateUrl: 'sponsors.html',
    providers: [SponsorService]
})
export class SponsorsPage {

    nav: NavController;
    private globalService: GlobalService;

    sponsor:Sponsor;
    imagePath = '';

    constructor(public navCtrl: NavController,
                public platform: Platform,
                public navParams: NavParams,
                public sponsorService: SponsorService,
                gs: GlobalService) {

        this.nav = navCtrl;
        this.imagePath = GlobalService.sponsorsFolder;
        this.globalService = gs;
        this.sponsor = this.navParams.get("sponsor");

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

    goToWebPage(url:string){
        RouterService.goToWebPage(this.nav, url);
    }

    navigateToSponsors(params) {
        if (GlobalService.sponsorsConVistaDetallada) {
            RouterService.goToSponsors(this.navCtrl, params);
        }
    }

}
