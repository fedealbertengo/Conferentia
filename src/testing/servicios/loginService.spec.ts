import {async, inject, TestBed} from '@angular/core/testing';

import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {LoginService} from "../../shared/loginService";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {UsuarioService} from "../../shared/usuarioService";
import {DataBaseAccess} from "../../shared/databaseAccess";
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";
import {GlobalService} from "../../shared/globalService";

describe('Login Service', () => {

    let loginService: LoginService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                LoginService,
                TranslateService,
                UsuarioService,
                DataBaseAccess,
                HttpClient
            ],
            imports: [
                HttpClientModule,
                HttpModule,
                IonicStorageModule.forRoot(),
                TranslateModule.forRoot()
            ]
        });
    }));

    beforeEach(inject([LoginService], (service: LoginService) => {
        loginService = service;
    }));

    it('Creación de servicio', () => {
        expect(loginService).toBeTruthy();
    });

    it('Obtener Usuario y sus Actividades', async(inject( [LoginService, HttpClient], ( service, httpClient: HttpClient ) => {
        let username = 'guest';
        let password = 'guest';
        const url = GlobalService.webApiLocation + 'jwt.php';
        let params = new HttpParams().set('action', 'getJWT');
        httpClient.get(url, {params: params}).toPromise().then((jwt) => {
            GlobalService.jwt = jwt.toString();
            service.getUserAndActivities(username, password).then(([user, activities]) => {
                expect(user.data).toBeDefined();
                expect(activities.data).toBeDefined();
                expect(activities.data.length).toBeGreaterThan(0);
            }).catch(error => {
                expect(error).toBeUndefined();
            });
        });
    })));

});