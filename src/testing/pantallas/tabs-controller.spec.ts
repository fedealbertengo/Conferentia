import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {TabsPage} from "../../pages/tabs-controller/tabs-controller";

class MockNavParams{
    data = {
    };

    get(param){
        return this.data[param];
    }
}

describe('Tabs Controller Page', () => {

    let fixture: ComponentFixture<TabsPage>;
    let component: TabsPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [TabsPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: NavParams, useClass: MockNavParams}
            ],
            imports: [
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TabsPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});