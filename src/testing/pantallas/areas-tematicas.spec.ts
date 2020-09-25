import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {AreasTematicasPage} from "../../pages/areas-tematicas/areas-tematicas";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {GlobalService} from "../../shared/globalService";
import {TranslateModule} from "@ngx-translate/core";

class MockNavParams{
    data = {
    };

    get(param){
        return this.data[param];
    }
}

describe('Áreas Temáticas Page', () => {

    let fixture: ComponentFixture<AreasTematicasPage>;
    let component: AreasTematicasPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [AreasTematicasPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                {provide: NavParams, useClass: MockNavParams},
                AreaTematicaService,
                GlobalService
            ],
            imports: [
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AreasTematicasPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});