import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Developer} from "../../shared/dtoClasses";
import {GlobalService} from "../../shared/globalService";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
    providers: []
})
export class AboutPage {

    private eventName: string;
    private developers:Developer[] = [
        {
            id: 1,
            imgSource: 'falbertengo.jpg',
            fullName: 'Federico Albertengo',
            institution: 'Conferentia Developer',
            email: 'fabertengo@frsf.utn.edu.ar',
            resume: [
                'Federico is an advanced student in Information Systems Engineering at the UTN - Regional Santa Fe.',
                'He works as a freelance software developer, being involved in a variety of mobile-oriented software products and with Conferentia being one of his main projects.'
            ]
        },
        {
            id: 2,
            imgSource: 'rolivencia.jpg',
            fullName: 'Ramiro Olivencia',
            institution: 'Conferentia Developer',
            email: 'rolivencia@frsf.utn.edu.ar',
            resume: [
                'Ramiro is a Software Analyst, graduated at the Universidad Tecnológica Nacional - Regional Santa Fe.',
                'He works as a Software Engineer for KBC, a company providing solutions for the energy and chemical industry. He worked as a developer for Folder IT from 2014 to 2016.',
                'He is a part-time freelance developer, with Conferentia being one of his projects. He is also an assistant teacher for the Professional Ethics subject at the UTN - FRSF.'
            ]
        },

    ];

    constructor(public navCtrl: NavController, public platform: Platform, public globalService: GlobalService, public translate: TranslateService) {

        //Este bloque de código permite evitar el comportamiento
        // que deriva el footer de tabs ocultándose.
        platform.registerBackButtonAction(() => {
            if (navCtrl.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
                navCtrl.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
            } else {
                platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
            }
        });

        this.eventName = GlobalService.eventName;

    }

}


