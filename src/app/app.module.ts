import {AboutPage} from "../pages/about/about";
import {ActividadPage} from '../pages/actividad/actividad';
import {AreasTematicasPage} from "../pages/areas-tematicas/areas-tematicas";
import {AreaTematicaPage} from "../pages/area-tematica/area-tematica";
import {AreaTematicaService} from "../shared/areaTematicaService";
import {AsistenciaPage} from '../pages/asistencia/asistencia';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {BrowserModule} from '@angular/platform-browser';
import {ChairPage} from "../pages/chair/chair";
import {ChairsPage} from "../pages/chairs/chairs";
import {ComponentsModule} from "../components/components.module";
import {DisertantePage} from '../pages/disertante/disertante';
import {DisertanteService} from "../shared/disertanteService";
import {DisertantesPage} from '../pages/disertantes/disertantes';
import {ErrorHandler, NgModule} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {GlobalService} from "../shared/globalService";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {InicioPage} from '../pages/inicio/inicio';
import {InicioSesionPage} from "../pages/inicio-sesion/inicio-sesion";
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {IonicStorageModule} from "@ionic/storage";
import {LocalizacionPage} from '../pages/localizacion/localizacion'
import {LugarService} from "../shared/lugarService";
import {MapaCiudadPage} from '../pages/mapa-ciudad/mapa-ciudad';
import {MapaInstalacionesPage} from "../pages/mapa-instalaciones/mapa-instalaciones";
import {MarcadorService} from "../shared/marcadorService";
import {MiCronogramaPage} from '../pages/mi-cronograma/mi-cronograma';
import {MyApp} from './app.component';
import {OneSignal} from '@ionic-native/onesignal';
import {PerfilPage} from '../pages/perfil/perfil';
import {ProximaActividadPage} from '../pages/proxima-actividad/proxima-actividad';
import {QRCodeModule} from "ng-qrcode";
import {SplashScreen} from '@ionic-native/splash-screen';
import {SponsorsPage} from "../pages/sponsors/sponsors";
import {StatusBar} from '@ionic-native/status-bar';
import {TabsPage} from '../pages/tabs-controller/tabs-controller';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {SettingsPage} from "../pages/settings/settings";
import {ActividadService} from "../shared/actividadService";
import {DataBaseAccess} from "../shared/databaseAccess";
import {AsistenciaService} from "../shared/asistenciaService";
import {CompetitionsPage} from "../pages/competitions/competitions";
import {CompetitionService} from "../shared/competition-service";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AboutPage,
        ActividadPage,
        AreasTematicasPage,
        AreaTematicaPage,
        AsistenciaPage,
        ChairPage,
        ChairsPage,
        DisertantePage,
        DisertantesPage,
        InicioPage,
        InicioSesionPage,
        LocalizacionPage,
        MapaCiudadPage,
        MapaInstalacionesPage,
        MiCronogramaPage,
        MyApp,
        PerfilPage,
        ProximaActividadPage,
        SettingsPage,
        SponsorsPage,
        TabsPage,
        CompetitionsPage
    ],
    imports: [
        BrowserModule,
        ComponentsModule,
        HttpModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {tabsPlacement: 'bottom', tabsHideOnSubPages: false}),
        IonicStorageModule.forRoot(),
        QRCodeModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AboutPage,
        ActividadPage,
        AreasTematicasPage,
        AreaTematicaPage,
        AsistenciaPage,
        ChairPage,
        ChairsPage,
        DisertantePage,
        DisertantesPage,
        InicioPage,
        InicioSesionPage,
        LocalizacionPage,
        MapaCiudadPage,
        MapaInstalacionesPage,
        MiCronogramaPage,
        MyApp,
        PerfilPage,
        ProximaActividadPage,
        SettingsPage,
        SponsorsPage,
        TabsPage,
        CompetitionsPage
    ],
    providers: [
        ActividadService,
        AsistenciaService,
        AreaTematicaService,
        BarcodeScanner,
        CompetitionService,
        DataBaseAccess,
        DisertanteService,
        Geolocation,
        GlobalService,
        LugarService,
        MarcadorService,
        OneSignal,
        SplashScreen,
        StatusBar,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
