import {async, inject, TestBed} from '@angular/core/testing';

import {GlobalService} from "../../shared/globalService";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {AreaTematica} from "../../shared/dtoClasses";

describe('Área Temática Service', () => {

    let areaTematicaService: AreaTematicaService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                AreaTematicaService,
                GlobalService
            ]
        });
    }));

    beforeEach(inject([AreaTematicaService], (service: AreaTematicaService) => {
        areaTematicaService = service;
    }));

    it('Creación de servicio', () => {
        expect(areaTematicaService).toBeTruthy();
    });

    it('Existen areas temáticas cargadas', () => {
        expect(areaTematicaService.getAreasTematicas().length).toBeGreaterThan(0);
    });

    it('Obtener una determinada área temática segun un ID', () => {
        let imagesLocation = 'assets/img/';
        let sessionsLocation = imagesLocation + 'sessions/';
        let areaTematica = {
            idAreaTematica: 1,
            nombre: 'Acústica y vibraciones',
            descripcion: '',
            imgString: sessionsLocation + 'pilar1.png'
        };
        expect(areaTematicaService.getAreaTematicaById(1)).toEqual(areaTematica);
    });


});