import {async, fakeAsync, inject, TestBed} from '@angular/core/testing';

import {GlobalService} from "../../shared/globalService";
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {DisertanteService} from "../../shared/disertanteService";
import {MarcadorService} from "../../shared/marcadorService";
import {LugarService} from "../../shared/lugarService";
import {TipoActividad} from "../../shared/dtoClasses";
import {SponsorService} from "../../shared/sponsor.service";
import {IonicStorageModule} from "@ionic/storage";

describe('Sponsor Service', () => {

    let sponsorService: SponsorService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                SponsorService,
                HttpClient
            ],
            imports: [
                HttpClientModule,
                IonicStorageModule.forRoot()
            ]
        });
    }));

    beforeEach(inject([SponsorService], (service: SponsorService) => {
        sponsorService = service;
    }));

    it('Creación de servicio', () => {
        expect(sponsorService).toBeTruthy();
    });

    it('Obtener timestamp', async(inject( [SponsorService, HttpClient], ( service, httpClient: HttpClient ) => {
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

    it('Obtener sponsors',async(inject( [SponsorService, HttpClient], ( service, httpClient: HttpClient ) => {
        let sponsors = [];
        const url = GlobalService.webApiLocation + 'jwt.php';
        let params = new HttpParams().set('action', 'getJWT');
        httpClient.get(url, {params: params}).toPromise().then((jwt) => {
            GlobalService.jwt = jwt.toString();
            service.getSponsorsFromJson().toPromise().then(data => {
                if(data.data && data.data.length) {
                    sponsors = service.shuffle(data.data);
                }
                expect(sponsors.length).toBeGreaterThan(0);
            }).catch(error => {
                expect(error).toBeUndefined();
            });
        });
    })));

});