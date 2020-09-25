import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {LocalizacionPage} from "../../pages/localizacion/localizacion";

describe('Localización Page', () => {

    let fixture: ComponentFixture<LocalizacionPage>;
    let component: LocalizacionPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [LocalizacionPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController
            ],
            imports: [
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LocalizacionPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});