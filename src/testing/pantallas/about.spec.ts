import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {GlobalService} from "../../shared/globalService";
import {AboutPage} from "../../pages/about/about";
import {NavController, Platform} from "ionic-angular";

describe('About Page', () => {

    let fixture: ComponentFixture<AboutPage>;
    let component: AboutPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [AboutPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                GlobalService,
                TranslateService
            ],
            imports: [
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AboutPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});