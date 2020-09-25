import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {CompetitionsPage} from "../../pages/competitions/competitions";
import {CompetitionService} from "../../shared/competition-service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

class MockNavParams{
    data = {
    };

    get(param){
        return this.data[param];
    }
}

describe('Competitions Page', () => {

    let fixture: ComponentFixture<CompetitionsPage>;
    let component: CompetitionsPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [CompetitionsPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                CompetitionService,
                NavController,
                {provide: NavParams, useClass: MockNavParams},
                HttpClient
            ],
            imports: [
                HttpClientModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(CompetitionsPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});