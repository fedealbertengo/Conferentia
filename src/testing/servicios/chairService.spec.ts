import {async, inject, TestBed} from '@angular/core/testing';

import {GlobalService} from "../../shared/globalService";
import {ChairService} from "../../shared/chairService";
import {AreaTematicaService} from "../../shared/areaTematicaService";

describe('Chair Service', () => {

    let chairService: ChairService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                ChairService,
                AreaTematicaService,
                GlobalService
            ]
        });
    }));

    beforeEach(inject([ChairService], (service: ChairService) => {
        chairService = service;
    }));

    it('Creación de servicio', () => {
        expect(chairService).toBeTruthy();
    });

    it('Existen chairs cargados', () => {
        expect(chairService.getChairs().length).toBeGreaterThan(0);
    });

    it('Obtener un determinado chair segun un ID', () => {
        let imagesLocation = GlobalService.webApiLocation;
        let avatarLocation = imagesLocation + 'img/staff/';
        let chair = {
            idChair: 1,
            nombreCompleto: 'Lilia Laura Guillén',
            nombreCortesia: '',
            institucion: '',
            areaDeRevision: null,
            imgString: avatarLocation + 'lguillén.png',
            cargo: 'Presidencia',
            curriculum: '',
            email: 'guillenlali@gmail.com'
        };
        expect(chairService.getChairById(1)).toEqual(chair);
    });


});