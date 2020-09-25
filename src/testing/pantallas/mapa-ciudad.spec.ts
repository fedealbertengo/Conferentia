import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {
    ActionSheetController,
    App, Config, DeepLinker, DomController, Form, Keyboard,
    NavController, Platform,
    PopoverController,
    MenuController, GestureController, NavParams
} from "ionic-angular";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MapaCiudadPage} from "../../pages/mapa-ciudad/mapa-ciudad";
import {MarcadorService} from "../../shared/marcadorService";
import {Geolocation} from "@ionic-native/geolocation";
import {HttpModule} from "@angular/http";
import {ComponentsModule} from "../../components/components.module";
import {BrowserModule} from "@angular/platform-browser";
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

describe('Mapa Ciudad Page', () => {

    let fixture: ComponentFixture<MapaCiudadPage>;
    let component: MapaCiudadPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [MapaCiudadPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                {provide: NavParams, useClass: MockNavParams},
                MarcadorService,
                Geolocation,
                PopoverController,
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
            fixture = TestBed.createComponent(MapaCiudadPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});