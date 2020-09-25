import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {
    AlertController, App, Config, DeepLinker, DomController, Form, GestureController, IonicModule, Keyboard,
    MenuController,
    NavController,
    Platform
} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {ActividadService} from "../../shared/actividadService";
import {AsistenciaService} from "../../shared/asistenciaService";
import {UsuarioService} from "../../shared/usuarioService";
import {DataBaseAccess} from "../../shared/databaseAccess";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {DisertanteService} from "../../shared/disertanteService";
import {GlobalService} from "../../shared/globalService";
import {MarcadorService} from "../../shared/marcadorService";
import {LugarService} from "../../shared/lugarService";
import {AsistenciaPage} from "../../pages/asistencia/asistencia";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ComponentsModule} from "../../components/components.module";
import {BrowserModule} from "@angular/platform-browser";
import {TransitionController} from "ionic-angular/transitions/transition-controller";

class DeepLinkerMock {

}

describe('Asistencia Page', () => {

    let fixture: ComponentFixture<AsistenciaPage>;
    let component: AsistenciaPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [AsistenciaPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                ActividadService,
                AsistenciaService,
                UsuarioService,
                AlertController,
                DataBaseAccess,
                HttpClient,
                AreaTematicaService,
                DisertanteService,
                GlobalService,
                MarcadorService,
                LugarService,
                BarcodeScanner,
                App,
                Config,
                {provide: DeepLinker, useClass: DeepLinkerMock},
                Form,
                Keyboard,
                DomController,
                MenuController,
                GestureController,
                TransitionController,
            ],
            imports: [
                BrowserModule,
                ComponentsModule,
                HttpModule,
                HttpClientModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AsistenciaPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});