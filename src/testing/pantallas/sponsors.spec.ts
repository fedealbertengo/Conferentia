import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {IonicStorageModule} from "@ionic/storage";
import {SponsorService} from "../../shared/sponsor.service";
import {GlobalService} from "../../shared/globalService";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {SponsorsPage} from "../../pages/sponsors/sponsors";

class MockNavParams{
    data = {
    };

    get(param){
        return this.data[param];
    }
}

describe('Sponsors Page', () => {

    let fixture: ComponentFixture<SponsorsPage>;
    let component: SponsorsPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [SponsorsPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                {provide: NavParams, useClass: MockNavParams},
                SponsorService,
                GlobalService,
                HttpClient
            ],
            imports: [
                HttpModule,
                HttpClientModule,
                IonicStorageModule.forRoot(),
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SponsorsPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});