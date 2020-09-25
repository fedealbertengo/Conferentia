import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {PerfilPage} from "../../pages/perfil/perfil";
import {IonicStorageModule} from "@ionic/storage";

describe('Perfil Page', () => {

    let fixture: ComponentFixture<PerfilPage>;
    let component: PerfilPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [PerfilPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController
            ],
            imports: [
                TranslateModule.forRoot(),
                IonicStorageModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(PerfilPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});