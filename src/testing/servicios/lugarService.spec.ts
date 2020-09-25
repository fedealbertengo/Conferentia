import {async, inject, TestBed} from '@angular/core/testing';

import {LugarService} from "../../shared/lugarService";
import {MarcadorService} from "../../shared/marcadorService";
import {GlobalService} from "../../shared/globalService";

describe('Lugar Service', () => {

    let lugarService: LugarService;
    let marcadorService: MarcadorService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                LugarService,
                GlobalService,
                MarcadorService,
            ],
            imports: [

            ]
        });
    }));

    beforeEach(inject([LugarService], (service: LugarService) => {
        lugarService = service;
    }));

    beforeEach(inject([MarcadorService], (service: MarcadorService) => {
        marcadorService = service;
    }));

    it('Creación de servicio', () => {
        expect(lugarService).toBeTruthy();
    });

    it('La lista de lugares no esta vacia', () => {
        lugarService.getLugaresCAEII2018();
        expect(lugarService.arrayLugares.length).toBeGreaterThan(0);
    });

    it('Obtener un lugar especifico segun un ID', () => {
        let lugar = {
            idLugar: 1,
            nombre: 'Aula A',
            marcador: marcadorService.getMarcadorById(246)
        };
        expect(lugarService.getLugarById(1)).toEqual(lugar);
    });

});