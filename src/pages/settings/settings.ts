import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {

    selectedLanguage: string = '';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public translate: TranslateService) {

        //Carga el idioma seleccionado, si es que éste existe en el LocalStorage
        storage.get('language').then((value) => {
            if(value){
                this.selectedLanguage = value;
            }
            else{
                this.selectedLanguage = 'en';
            }
        });
    }

    languageChanged(selectedLanguage: string) {
        if (selectedLanguage) {
            this.storage.remove("language");
            this.storage.set("language", selectedLanguage);
            this.translate.use(selectedLanguage);
        }
    }
}
