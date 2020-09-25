import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {IonicStorageModule} from "@ionic/storage";
import {ProximaActividadPage} from "../../pages/proxima-actividad/proxima-actividad";
import {ActividadService} from "../../shared/actividadService";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {DisertanteService} from "../../shared/disertanteService";
import {GlobalService} from "../../shared/globalService";
import {MarcadorService} from "../../shared/marcadorService";
import {LugarService} from "../../shared/lugarService";
import {HttpModule} from "@angular/http";

describe('Próxima Actividad Page', () => {

    let fixture: ComponentFixture<ProximaActividadPage>;
    let component: ProximaActividadPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ProximaActividadPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                TranslateService,
                ActividadService,
                HttpClient,
                AreaTematicaService,
                DisertanteService,
                GlobalService,
                MarcadorService,
                LugarService
            ],
            imports: [
                HttpModule,
                HttpClientModule,
                TranslateModule.forRoot(),
                IonicStorageModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ProximaActividadPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});