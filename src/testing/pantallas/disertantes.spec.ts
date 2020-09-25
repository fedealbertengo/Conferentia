import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {ActividadService} from "../../shared/actividadService";
import {DisertanteService} from "../../shared/disertanteService";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {GlobalService} from "../../shared/globalService";
import {MarcadorService} from "../../shared/marcadorService";
import {LugarService} from "../../shared/lugarService";
import {DisertantesPage} from "../../pages/disertantes/disertantes";

describe('Disertantes Page', () => {

    let fixture: ComponentFixture<DisertantesPage>;
    let component: DisertantesPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [DisertantesPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                DisertanteService,
                HttpClient
            ],
            imports: [
                HttpClientModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DisertantesPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});