import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ChangeDetectorRef, NO_ERRORS_SCHEMA} from "@angular/core";
import {
    ActionSheetController,
    App, Config, DeepLinker, DomController, Form, Keyboard,
    NavController, Platform,
    PopoverController,
    MenuController, GestureController
} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {MiCronogramaPage} from "../../pages/mi-cronograma/mi-cronograma";
import {ActividadService} from "../../shared/actividadService";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {DisertanteService} from "../../shared/disertanteService";
import {GlobalService} from "../../shared/globalService";
import {MarcadorService} from "../../shared/marcadorService";
import {LugarService} from "../../shared/lugarService";
import {HttpModule} from "@angular/http";
import {ComponentsModule} from "../../components/components.module";
import {BrowserModule} from "@angular/platform-browser";
import {TransitionController} from "ionic-angular/transitions/transition-controller";

class DeepLinkerMock {

}

describe('Mi Cronograma Page', () => {

    let fixture: ComponentFixture<MiCronogramaPage>;
    let component: MiCronogramaPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [MiCronogramaPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                PopoverController,
                ChangeDetectorRef,
                ActividadService,
                HttpClient,
                AreaTematicaService,
                DisertanteService,
                GlobalService,
                MarcadorService,
                LugarService,
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
                HttpModule,
                HttpClientModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(MiCronogramaPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});