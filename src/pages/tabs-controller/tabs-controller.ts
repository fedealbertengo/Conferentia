import {Component, ViewChild} from '@angular/core';
import {Nav, NavParams} from 'ionic-angular';
import {InicioPage} from '../inicio/inicio';
import {AsistenciaPage} from '../asistencia/asistencia';
import {ProximaActividadPage} from '../proxima-actividad/proxima-actividad';
import {LocalizacionPage} from '../localizacion/localizacion';
import {MiCronogramaPage} from "../mi-cronograma/mi-cronograma";
import {DisertantesPage} from "../disertantes/disertantes";
import {AboutPage} from "../about/about";
import {AreasTematicasPage} from "../areas-tematicas/areas-tematicas";
import {SponsorsPage} from "../sponsors/sponsors";
import {UsuarioService} from "../../shared/usuarioService";
import {Usuario} from "../../shared/dtoClasses";
import {GlobalService} from "../../shared/globalService";
import {ChairsPage} from "../chairs/chairs";
import {SettingsPage} from "../settings/settings";
import {CompetitionsPage} from "../competitions/competitions";

@Component({
    selector: 'page-tabs-controller',
    templateUrl: 'tabs-controller.html'
})
export class TabsPage{

    // @Input()navCtrl: Nav;
    @ViewChild(Nav) navCtrl: Nav;

    usuarioLogeado: Usuario;
    userLoginEnabled: boolean;
    tabRoots: Object = {};

    tabRootsList = [];
    mySelectedIndex: number;

    constructor(navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
        this.userLoginEnabled = GlobalService.usaInicioSesion;
        if(this.userLoginEnabled){
            this.usuarioLogeado = UsuarioService.getUsuarioLogeado();
        }

        //TODO: Traer esta lista de propiedades desde un lugar único, en un servicio.
        this.tabRoots = {
            inicioPage: {name: 'InicioPage', reference: InicioPage, icon: 'home', isImplemented: false, isDisplayedInTabBar: true},
            miCronogramaPage: {name: 'MiCronogramaPage', reference: MiCronogramaPage, icon: 'calendar', isImplemented: false, isDisplayedInTabBar: true},
            asistenciaPage: {name: 'AsistenciaPage', reference: AsistenciaPage, icon: 'qr-scanner', isImplemented: false, isDisplayedInTabBar: this.userLoginEnabled},
            proximaActividadPage: {name: 'ProximaActividadPage', reference: ProximaActividadPage, icon: 'clock', isImplemented: false, isDisplayedInTabBar: true},
            disertantesPage: {name: 'DisertantesPage', reference: DisertantesPage, icon: 'people', isImplemented: false, isDisplayedInTabBar: false},
            chairsPage: {name: 'ChairsPage', reference: ChairsPage, icon: 'school', isImplemented: true, isDisplayedInTabBar: false},
            localizacionPage: {name: 'LocalizacionPage', reference: LocalizacionPage, icon: 'pin', isImplemented: false, isDisplayedInTabBar: true},
            settingsPage: {name: 'SettingsPage', reference: SettingsPage, icon: 'cog', isImplemented: true, isDisplayedInTabBar: false},
            aboutPage: {name: 'AboutPage', reference: AboutPage, icon: 'information', isImplemented: false, isDisplayedInTabBar: false},
            areasTematicasPage: {name: 'AreasTematicasPage', reference: AreasTematicasPage, icon: 'information', isImplemented: false, isDisplayedInTabBar: false},
            sponsorsPage: {name: 'SponsorsPage', reference: SponsorsPage, icon: 'information', isImplemented: false, isDisplayedInTabBar: false},
            competitionsPage: {name: 'CompetitionsPage', reference: CompetitionsPage, icon: 'trophy', isImplemented: true, isDisplayedInTabBar: false},
        };

        this.tabRootsList = Object.keys(this.tabRoots);

        //Se verifica el objeto global para determinar qué módulos se implementan o no
        for(let tab in this.tabRoots){
            const currentTab = this.tabRoots[tab];
            currentTab.isImplemented = GlobalService.pageAccessEnabled[currentTab.name];
        }
    }

}
