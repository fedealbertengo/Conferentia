import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {AreaTematicaPage} from "../../pages/area-tematica/area-tematica";
import {TranslateModule} from "@ngx-translate/core";

class MockNavParams{
    data = {
    };

    get(param){
        return this.data[param];
    }
}

describe('Área Temática Page', () => {

    let fixture: ComponentFixture<AreaTematicaPage>;
    let component: AreaTematicaPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [AreaTematicaPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                {provide: NavParams, useClass: MockNavParams}
            ],
            imports: [
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AreaTematicaPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});