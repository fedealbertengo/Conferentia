import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {DisertantePage} from "../../pages/disertante/disertante";
import {ActividadService} from "../../shared/actividadService";
import {DisertanteService} from "../../shared/disertanteService";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {GlobalService} from "../../shared/globalService";
import {MarcadorService} from "../../shared/marcadorService";
import {LugarService} from "../../shared/lugarService";

class MockNavParams{
    data = {
    };

    get(param){
        return this.data[param];
    }
}

describe('Disertante Page', () => {

    let fixture: ComponentFixture<DisertantePage>;
    let component: DisertantePage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [DisertantePage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                {provide: NavParams, useClass: MockNavParams},
                ActividadService,
                DisertanteService,
                HttpClient,
                AreaTematicaService,
                GlobalService,
                MarcadorService,
                LugarService
            ],
            imports: [
                HttpClientModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DisertantePage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});