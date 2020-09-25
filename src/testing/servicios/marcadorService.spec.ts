import {async, inject, TestBed} from '@angular/core/testing';

import {MarcadorService} from "../../shared/marcadorService";
import {GlobalService} from "../../shared/globalService";

describe('Marcador Service', () => {

    let marcadorService: MarcadorService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                MarcadorService,
                GlobalService,
                MarcadorService,
            ],
            imports: [

            ]
        });
    }));

    beforeEach(inject([MarcadorService], (service: MarcadorService) => {
        marcadorService = service;
    }));

    it('Creación de servicio', () => {
        expect(marcadorService).toBeTruthy();
    });

    it('La lista de marcadores no este vacia', () => {
        expect(marcadorService.getMarcadores().length).toBeGreaterThan(0);
    });


    it('La lista de tipos de marcadores no este vacia', () => {
        expect(marcadorService.getTipoMarcadores().length).toBeGreaterThan(0);
    });

    it('Obtener un marcador especifico segun un ID', () => {
        marcadorService.getMarcadores();
        let marcador = {
            idMarcador: 1,
            titulo: '1980 Boulevard',
            descripcion: '',
            imagenUrl: '',
            direccion: 'Bv. Galvez 2281',
            latitud: -31.636578,
            longitud: -60.699552,
            tipoMarcador: marcadorService.getTipoMarcadorById(1),
            distancia: 0,
            telefono: '',
            marcadorEspecial: false
        };
        expect(marcadorService.getMarcadorById(1)).toEqual(marcador);
    });

    it('Obtener un tipo de marcador especifico segun un ID', () => {
        let iconLocation = '../../assets/icon/';
        let tipoMarcador = {
            idTipoMarcador: 1,
            nombre: 'Bars and Restaurants',
            icono: iconLocation + 'Restaurante.png',
            palabrasClaves: []
        };
        expect(marcadorService.getTipoMarcadorById(1)).toEqual(tipoMarcador);
    });


});