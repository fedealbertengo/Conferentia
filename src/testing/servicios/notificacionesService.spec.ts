import {async, inject, TestBed} from '@angular/core/testing';

import {NotificacionesService} from "../../shared/notificacionesService";
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('Notificaciones Service', () => {

    let notificacionesService: NotificacionesService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                NotificacionesService,
                HttpClient
            ],
            imports: [
                HttpClientModule
            ]
        });
    }));

    beforeEach(inject([NotificacionesService], (service: NotificacionesService) => {
        notificacionesService = service;
    }));

    it('Creación de servicio', () => {
        expect(notificacionesService).toBeTruthy();
    });

});