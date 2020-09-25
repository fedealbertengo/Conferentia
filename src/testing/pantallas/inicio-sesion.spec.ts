import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AlertController, LoadingController, NavController, NavParams, Platform} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {ActividadService} from "../../shared/actividadService";
import {AsistenciaService} from "../../shared/asistenciaService";
import {UsuarioService} from "../../shared/usuarioService";
import {DataBaseAccess} from "../../shared/databaseAccess";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {DisertanteService} from "../../shared/disertanteService";
import {GlobalService} from "../../shared/globalService";
import {MarcadorService} from "../../shared/marcadorService";
import {LugarService} from "../../shared/lugarService";
import {InicioSesionPage} from "../../pages/inicio-sesion/inicio-sesion";
import {IonicStorageModule} from "@ionic/storage";
import {LoginService} from "../../shared/loginService";
import {CompetitionService} from "../../shared/competition-service";
import {SponsorService} from "../../shared/sponsor.service";

class MockNavParams{
    data = {
    };

    get(param){
        return this.data[param];
    }
}

describe('Inicio Sesión Page', () => {

    let fixture: ComponentFixture<InicioSesionPage>;
    let component: InicioSesionPage;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [InicioSesionPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                Platform,
                NavController,
                {provide: NavParams, useClass: MockNavParams},
                LoginService,
                UsuarioService,
                DataBaseAccess,
                Http,
                HttpClient,
                ConnectionBackend,
                CompetitionService,
                SponsorService,
                DisertanteService,
                ActividadService,
                AreaTematicaService,
                GlobalService,
                MarcadorService,
                LugarService,
                {
                    provide: LoadingController,
                    useValue: {
                        create: () => Promise.resolve(),
                        dismiss: () => Promise.resolve()
                    }
                }
            ],
            imports: [
                HttpModule,
                HttpClientModule,
                TranslateModule.forRoot(),
                IonicStorageModule.forRoot()
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(InicioSesionPage);
            component = fixture.componentInstance;
        });
    }));

    it('Creación de pantalla', () => {
        expect(component).toBeTruthy();
    });
});