import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {MyApp} from '../app/app.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {createTranslateLoader} from "../app/app.module";

import {IonicModule, Platform} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import { StatusBar } from '@ionic-native/status-bar';
import {OneSignal} from "@ionic-native/onesignal";
import {IonicStorageModule, Storage} from "@ionic/storage";
import {ActividadService} from "../shared/actividadService";
import {DisertanteService} from "../shared/disertanteService";
import {LoginService} from "../shared/loginService";
import {SponsorService} from "../shared/sponsor.service";
import {CompetitionService} from "../shared/competition-service";
import {DataBaseAccess} from "../shared/databaseAccess";
import {AreaTematicaService} from "../shared/areaTematicaService";
import {GlobalService} from "../shared/globalService";
import {MarcadorService} from "../shared/marcadorService";
import {LugarService} from "../shared/lugarService";
import {UsuarioService} from "../shared/usuarioService";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {QRCodeModule} from "ng-qrcode";
import {ComponentsModule} from "../components/components.module";

describe('MyApp', () => {

    let fixture: ComponentFixture<MyApp>;
    let component: MyApp;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [MyApp],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                StatusBar,
                SplashScreen,
                TranslateService,
                ActividadService,
                DisertanteService,
                LoginService,
                SponsorService,
                CompetitionService,
                DataBaseAccess,
                HttpClient,
                AreaTematicaService,
                GlobalService,
                MarcadorService,
                LugarService,
                UsuarioService,
                OneSignal
            ],
            imports: [
                BrowserModule,
                ComponentsModule,
                HttpModule,
                HttpClientModule,
                IonicModule.forRoot(MyApp, {tabsPlacement: 'bottom', tabsHideOnSubPages: false}),
                IonicStorageModule.forRoot(),
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(MyApp);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla principal', () => {
        expect(component).toBeTruthy();
    });
});