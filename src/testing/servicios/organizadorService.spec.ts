import {async, inject, TestBed} from '@angular/core/testing';

import {OrganizadorService} from "../../shared/organizadorService";
import {HttpModule} from "@angular/http";
import {GlobalService} from "../../shared/globalService";
import {DataBaseAccess} from "../../shared/databaseAccess";

describe('Organizador Service', () => {

    let organizadorService: OrganizadorService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                OrganizadorService,
                GlobalService,
                DataBaseAccess
            ],
            imports: [
                HttpModule
            ]
        });
    }));

    beforeEach(inject([OrganizadorService], (service: OrganizadorService) => {
        organizadorService = service;
    }));

    it('Creación de servicio', () => {
        expect(organizadorService).toBeTruthy();
    });

    it('La lista de organizadores no esté vacía', () => {
        expect(organizadorService.getOrganizadores().length).toBeGreaterThan(0);
    });

    it('Obtener un organizador específico según un ID', () => {
        organizadorService.getOrganizadoresCAEII2018();
        let organizador = {
            idOrganizador: 10030,
            nombre: 'Lucía',
            apellido: 'Monti',
            numeroTelefono: '5493434674222'
        };
        expect(organizadorService.getOrganizadorById(10030)).toEqual(organizador);
    });
});