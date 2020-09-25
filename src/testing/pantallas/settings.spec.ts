import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SettingsPage} from "../../pages/settings/settings";
import {IonicStorageModule} from "@ionic/storage";

class MockNavParams{
    data = {
    };

    get(param){
        return this.data[param];
    }
}

describe('Settings Page', () => {

    let fixture: ComponentFixture<SettingsPage>;
    let component: SettingsPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [SettingsPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                NavController,
                {provide: NavParams, useClass: MockNavParams},
                TranslateService
            ],
            imports: [
                IonicStorageModule.forRoot(),
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SettingsPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});