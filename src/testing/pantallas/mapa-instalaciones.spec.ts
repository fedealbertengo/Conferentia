import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {
    ActionSheetController, App, Config, DeepLinker, DomController, Form, GestureController, Keyboard, MenuController,
    NavController,
    NavParams,
    Platform
} from "ionic-angular";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MapaInstalacionesPage} from "../../pages/mapa-instalaciones/mapa-instalaciones";
import {BrowserModule, DomSanitizer} from "@angular/platform-browser";
import {ComponentsModule} from "../../components/components.module";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {TransitionController} from "ionic-angular/transitions/transition-controller";

class MockNavParams{
    data = {
    };

    get(param){
        return this.data[param];
    }
}

class DeepLinkerMock {

}

describe('Mapa Instalaciones Page', () => {

    let fixture: ComponentFixture<MapaInstalacionesPage>;
    let component: MapaInstalacionesPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [MapaInstalacionesPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                {provide: NavParams, useClass: MockNavParams},
                DomSanitizer,
                TranslateService,
                ActionSheetController,
                App,
                Config,
                {provide: DeepLinker, useClass: DeepLinkerMock},
                Form,
                Keyboard,
                DomController,
                MenuController,
                GestureController,
                TransitionController,
            ],
            imports: [
                BrowserModule,
                ComponentsModule,
                HttpClientModule,
                HttpModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(MapaInstalacionesPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});