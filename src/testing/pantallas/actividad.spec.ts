import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {GlobalService} from "../../shared/globalService";
import {NavController, NavParams, Platform} from "ionic-angular";
import {ActividadPage} from "../../pages/actividad/actividad";
import {ActividadService} from "../../shared/actividadService";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {DisertanteService} from "../../shared/disertanteService";
import {MarcadorService} from "../../shared/marcadorService";
import {LugarService} from "../../shared/lugarService";

class MockNavParams{
    data = {
        id: 1
    };

    get(param){
        return this.data[param];
    }
}

describe('Actividad Page', () => {

    let fixture: ComponentFixture<ActividadPage>;
    let component: ActividadPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ActividadPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                {provide: NavParams, useClass: MockNavParams},
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
                HttpClientModule
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ActividadPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});