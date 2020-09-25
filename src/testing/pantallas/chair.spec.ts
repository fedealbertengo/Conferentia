import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {GlobalService} from "../../shared/globalService";
import {NavController, NavParams, Platform} from "ionic-angular";
import {ChairPage} from "../../pages/chair/chair";
import {ChairService} from "../../shared/chairService";
import {AreaTematicaService} from "../../shared/areaTematicaService";

class MockNavParams{
    data = {
    };

    get(param){
        return this.data[param];
    }
}

describe('Chair Page', () => {

    let fixture: ComponentFixture<ChairPage>;
    let component: ChairPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ChairPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                {provide: NavParams, useClass: MockNavParams},
                ChairService,
                GlobalService,
                AreaTematicaService
            ],
            imports: [
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ChairPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});