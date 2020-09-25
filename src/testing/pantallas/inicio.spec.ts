import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {InicioPage} from "../../pages/inicio/inicio";
import {OrganizadorService} from "../../shared/organizadorService";
import {GlobalService} from "../../shared/globalService";
import {DataBaseAccess} from "../../shared/databaseAccess";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";

describe('Inicio Page', () => {

    let fixture: ComponentFixture<InicioPage>;
    let component: InicioPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [InicioPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                OrganizadorService,
                GlobalService,
                DataBaseAccess,
                Http,
                ConnectionBackend
            ],
            imports: [
                HttpModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(InicioPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});