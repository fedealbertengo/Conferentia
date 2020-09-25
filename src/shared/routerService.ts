import {DisertantePage} from "../pages/disertante/disertante";
import {ActividadPage} from "../pages/actividad/actividad";
import {NavController, Platform} from "ionic-angular";
import {DisertantesPage} from "../pages/disertantes/disertantes";
import {MiCronogramaPage} from "../pages/mi-cronograma/mi-cronograma";
import {AreaTematicaPage} from "../pages/area-tematica/area-tematica";
import {MapaCiudadPage} from "../pages/mapa-ciudad/mapa-ciudad";
import {ChairPage} from "../pages/chair/chair";
import {MapaInstalacionesPage} from "../pages/mapa-instalaciones/mapa-instalaciones";
import {SponsorsPage} from "../pages/sponsors/sponsors";
import {TabsPage} from "../pages/tabs-controller/tabs-controller";
import {InicioSesionPage} from "../pages/inicio-sesion/inicio-sesion";
import {PerfilPage} from "../pages/perfil/perfil";
import {LocalizacionPage} from "../pages/localizacion/localizacion";
import {AsistenciaPage} from "../pages/asistencia/asistencia";
import {CompetitionsPage} from "../pages/competitions/competitions";

/** Servicio para funcionalidad relacionada a la navegación entre pantallas
 Tiene el objetivo de centralizar los métodos relacionados a la navegación
 y evitar la duplicación de código en los componentes de cada vista
 */

export class RouterService{

    constructor(platform:Platform){

    }

    public static goToDisertante(navCtrl:NavController, params:any){
        params = {idDisertante: params};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == DisertantePage).length) {
            navCtrl.popTo(DisertantePage, params);
        }
        else {
            navCtrl.push(DisertantePage, params);
        }
    }

    public static goToActividad(navCtrl:NavController, params:any){
        params = {id: params};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == ActividadPage).length) {
            navCtrl.popTo(ActividadPage, params);
        }
        else {
            navCtrl.push(ActividadPage, params);
        }
    }

    public static goToDisertantes(navCtrl:NavController, params:any){
        if (!params) params = {};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == DisertantesPage).length) {
            navCtrl.popTo(DisertantesPage, params);
        }
        else {
            navCtrl.insert(0, DisertantesPage, params).then(() => {
                navCtrl.popToRoot();
            });
        }
    }

    public static goToMiCronograma(navCtrl:NavController, params:any){
        if (!params) params = {};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == MiCronogramaPage).length) {
            navCtrl.popTo(MiCronogramaPage, params);
        }
        else {
            navCtrl.insert(0, MiCronogramaPage, params).then(() => {
                navCtrl.popToRoot();
            });
        }
    }

    public static goToAreaTematica(navCtrl:NavController, params: any){
        params = {areaTematica: params};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == AreaTematicaPage).length) {
            navCtrl.popTo(AreaTematicaPage, params);
        }
        else {
            navCtrl.push(AreaTematicaPage, params);
        }
    }

    public static goToLocalizacion(navCtrl: NavController, params: any){
        params = {marcador: params};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == LocalizacionPage).length) {
            navCtrl.popTo(LocalizacionPage, params);
        }
        else {
            navCtrl.insert(0, LocalizacionPage, params).then(() => {
                navCtrl.popToRoot();
            });
        }
    }

    public static goToAsistencia(navCtrl: NavController, params?: any){
        if (!params) params = {};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == AsistenciaPage).length) {
            navCtrl.popTo(AsistenciaPage, params);
        }
        else {
            navCtrl.push(AsistenciaPage, params);
        }
    }

    public static goToCompetitions(navCtrl: NavController, params?: any){
        if (!params) params = {};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == CompetitionsPage).length) {
            navCtrl.popTo(CompetitionsPage, params);
        }
        else {
            navCtrl.push(CompetitionsPage, params);
        }
    }

    public static goToChair(navCtrl: NavController, params: any){
        params = {idChair: params};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == ChairPage).length) {
            navCtrl.popTo(ChairPage, params);
        }
        else {
            navCtrl.push(ChairPage, params);
        }
    }

    public static goToMapaCiudad(navCtrl: NavController, params: any){
        if (!params) params = {};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == MapaCiudadPage).length) {
            navCtrl.popTo(MapaCiudadPage, params);
        }
        else {
            navCtrl.push(MapaCiudadPage, params);
        }
    }

    public static goToMapaInstalacionesUTN(navCtrl: NavController, params: any){
        params = {mapas: [{nombre: 'Planta Baja', url: 'assets/mapa/PlantaBaja_v2.pdf'}, {nombre: 'Primer Piso', url: 'assets/mapa/PrimerPiso_v2.pdf'}, {nombre: 'Segundo Piso', url: 'assets/mapa/SegundoPiso_v2.pdf'}]};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == MapaInstalacionesPage).length) {
            navCtrl.popTo(MapaInstalacionesPage, params);
        }
        else {
            navCtrl.push(MapaInstalacionesPage, params);
        }
    }

    public static goToSponsors(navCtrl:NavController, params:any){
        params = {sponsor: params};
        RouterService.goToPagina(SponsorsPage, true, false, true, true, 0, params, navCtrl);
    }

    public static goToMapaInstalacionesUNL(navCtrl: NavController, params: any){
        alert("Esta funcionalidad no ha sido implementada aún.")
    }

    public static goToMapaInstalaciones(navCtrl: NavController, params: any){
        window.location.href='https://drive.google.com/uc?export=download&id=153uO9tGanN-5HmZKkajuqrwhe6oUn5uD';
    }

    public static goToSantaFeTurismoAndroid(navCtrl: NavController, params: any){
        window.location.href='https://play.google.com/store/apps/details?id=com.santafeciudad.turismo';
    }

    public static goToSantaFeTurismoApple(navCtrl: NavController, params: any){
        window.location.href='https://play.google.com/store/apps/details?id=com.santafeciudad.turismo';
    }

    public static goToCuandoPasa(navCtrl: NavController, params: any){
        window.location.href='http://cuandopasa.efibus.com.ar/';
    }

    public static goToCualMeLleva(navCtrl: NavController, params: any){
        window.location.href='https://play.google.com/store/apps/details?id=cualmelleva.ar.com.quitilipisoft.cualmelleva';
    }

    public static goToRegistroPage(navCtrl:NavController, params:any){
        // if (!params) params = {};
        // if (navCtrl.getViews().map(view => view.component).filter(view => view == RegistroPage).length) {
        //     navCtrl.popTo(RegistroPage, params);
        // }
        // else {
        //     navCtrl.insert(0, RegistroPage, params).then(() => {
        //         navCtrl.popToRoot();
        //     });
        // }
    }

    public static goToTabsPage(navCtrl:NavController, params:any){
        if (!params) params = {};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == TabsPage).length) {
            navCtrl.popTo(TabsPage, params);
        }
        else {
            navCtrl.insert(0, TabsPage, params).then(() => {
                navCtrl.popToRoot();
            });
        }
    }

    public static goToInicioSesionPage(navCtrl:NavController, params:any){

        if (!params) params = {};
        // navCtrl.popToRoot();

        // if (navCtrl.getViews().map(view => view.component).filter(view => view == InicioSesionPage).length) {
        //     navCtrl.popTo(InicioSesionPage, params);
        // }
        // else {
            navCtrl.insert(0, InicioSesionPage, params).then(() => {
                navCtrl.popToRoot();
            });
        // }
    }

    public static goToPerfil(navCtrl:NavController, params:any){
        if (!params) params = {};
        if (navCtrl.getViews().map(view => view.component).filter(view => view == PerfilPage).length) {
            navCtrl.popTo(PerfilPage, params);
        }
        else {
            navCtrl.insert(0, PerfilPage, params).then(() => {
                navCtrl.popToRoot();
            });
        }
    }

    public static goToWebPage(navCtrl:NavController, url:any){
        window.location.href=url;
    }

    public static goToPagina(pagina: any, paginaRoot: boolean, volverAtrasSiExiste: boolean, stackearSiempre: boolean, esTab: boolean, indice: number, params: any, navCtrl: NavController) {
        if(navCtrl.parent && esTab && indice){
            let navCtrlAux = navCtrl.parent.getSelected();
            RouterService.goToPagina(navCtrlAux.root, true, false, false, false, null, {}, navCtrlAux);
            if(navCtrl.parent.getByIndex(indice).getViews().length > 1){
                RouterService.goToPagina(pagina, true, false, false, false, null, params, navCtrl.parent.getByIndex(indice));
            }
            navCtrl.parent.select(indice);
        }
        else{
            if (!params) params = {};
            if (volverAtrasSiExiste && navCtrl.getViews().map(view => view.component).filter(view => view == pagina).length) {
                let cuentaAtras: number = navCtrl.getViews().map(view => view.component).indexOf(pagina);
                navCtrl.popTo(navCtrl.getViews()[cuentaAtras], params);
            }
            else {
                if(!stackearSiempre && paginaRoot){
                    navCtrl.insert(0, pagina, params).then(() => {
                        navCtrl.popToRoot();
                    });
                }
                else{
                    navCtrl.push(pagina, params);
                }
            }
        }
    }


}
