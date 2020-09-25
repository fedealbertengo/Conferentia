import {Component} from "@angular/core";
import {NavParams, NavController, ActionSheetController, Platform} from "ionic-angular";
import {MapaInstalaciones} from "../../shared/dtoClasses";
import {DomSanitizer} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";
import {GlobalService} from "../../shared/globalService";

const styles : string[] = ['./mapa-instalaciones.scss'];

@Component({
    selector: 'page-mapa-instalaciones',
    styles: styles,
    templateUrl: 'mapa-instalaciones.html',
})

export class MapaInstalacionesPage {

    mapaUrl:any = null;
    mapas: MapaInstalaciones[] = [];

    constructor(public navCtrl: NavController,
                private sanitizer: DomSanitizer,
                public platform: Platform,
                public navParams: NavParams,
                public actionsheetCtrl: ActionSheetController,
                public translate: TranslateService) {
        this.mapas = navParams.get('mapas');
        if (this.mapas && this.mapas.length) {
            this.mapaUrl = this.seleccionarMapa(this.mapas[0].url);
        }

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

    private abrirMenuMapasFiltro() {
        let actionSheet = this.actionsheetCtrl.create({
            title: `${this.translate.instant('Pick the map to display')}:`,
            cssClass: 'action-sheets-basic-page',
            buttons: this.generateMapasObjects()
        });
        actionSheet.present();
    }

    private generateMapasObjects() {

        let mapasObjects: any = [];

        if(this.mapas && this.mapas.length){
            for (let mapa of this.mapas) {
                mapasObjects.push(
                    {
                        text: mapa.nombre,
                        role: `${this.translate.instant('Filter')} - ${mapa.nombre}`,
                        icon: 'arrow-dropright-circle',
                        handler: () => {
                            this.seleccionarMapa(mapa.url);
                        }
                    }
                )
            }
        }

        return mapasObjects;
    }

    private seleccionarMapa(mapaUrl: string){
        this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapaUrl);
    }

    private accessMapLink(){
        const ubicacionMapaUtn = GlobalService.dataSourceLocation + 'data-sources/';
        const nombreMapaUtn = 'mapa_utn.pdf';
        window.open( ubicacionMapaUtn + nombreMapaUtn, '_blank', 'location=yes', false);
    }
}
