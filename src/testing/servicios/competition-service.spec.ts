import {async, inject, TestBed} from '@angular/core/testing';

import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {TipoActividad} from "../../shared/dtoClasses";
import {CompetitionService} from "../../shared/competition-service";
import {GlobalService} from "../../shared/globalService";

describe('Competition Service', () => {

    let competitionService: CompetitionService;
    let originalTimeout;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                CompetitionService,
                HttpClient
            ],
            imports: [
                HttpClientModule
            ]
        });
    }));

    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    beforeEach(inject([CompetitionService], (service: CompetitionService) => {
        competitionService = service;
    }));

    it('Creación de servicio', () => {
        expect(competitionService).toBeTruthy();
    });

    it('Obtener datos de competición', async(inject( [CompetitionService, HttpClient], ( service, httpClient: HttpClient ) => {
        const url = GlobalService.webApiLocation + 'jwt.php';
        let params = new HttpParams().set('action', 'getJWT');
        httpClient.get(url, {params: params}).toPromise().then((jwt) => {
            GlobalService.jwt = jwt.toString();
            service.getData().toPromise().then((data) => {
                expect(data).toBeDefined();
            }).catch(error => {
                expect(error).toBeUndefined();
            });
        });
    })));

});