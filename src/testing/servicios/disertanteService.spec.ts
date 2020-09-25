import {async, inject, TestBed} from '@angular/core/testing';

import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {DisertanteService} from "../../shared/disertanteService";
import {GlobalService} from "../../shared/globalService";

describe('Disertante Service', () => {

    let disertanteService: DisertanteService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                DisertanteService,
                HttpClient
            ],
            imports: [
                HttpClientModule
            ]
        });
    }));

    beforeEach(inject([DisertanteService], (service: DisertanteService) => {
        disertanteService = service;
    }));

    it('Creación de servicio', () => {
        expect(disertanteService).toBeTruthy();
    });

    it('Obtener TimeStamp', async(inject( [DisertanteService, HttpClient], ( service, httpClient: HttpClient ) => {
        const url = GlobalService.webApiLocation + 'jwt.php';
        let params = new HttpParams().set('action', 'getJWT');
        httpClient.get(url, {params: params}).toPromise().then((jwt) => {
            GlobalService.jwt = jwt.toString();
            service.getTimestamp().toPromise().then((data) => {
                expect(data).toBeDefined();
            }).catch(error => {
                expect(error).toBeUndefined();
            });
        });
    })));

    it('Obtener Disertantes', async(inject( [DisertanteService, HttpClient], ( service: DisertanteService, httpClient: HttpClient ) => {
        let disertantes = [];
        const url = GlobalService.webApiLocation + 'jwt.php';
        let params = new HttpParams().set('action', 'getJWT');
        httpClient.get(url, {params: params}).toPromise().then((jwt) => {
            GlobalService.jwt = jwt.toString();
            service.getDisertantesFromJson().toPromise().then((data) => {
                disertantes = disertanteService.generateDisertantes(data.data);
                expect(disertantes.length).toBeGreaterThan(0);
            }).catch(error => {
                expect(error).toBeUndefined();
            });
        });
    })));

});