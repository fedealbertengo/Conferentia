import {async, inject, TestBed} from '@angular/core/testing';

import {TipoActividad} from "../../shared/dtoClasses";
import {AsistenciaService} from "../../shared/asistenciaService";
import {HttpModule} from "@angular/http";
import {DataBaseAccess} from "../../shared/databaseAccess";

describe('Asistencia Service', () => {

    let asistenciaService: AsistenciaService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                AsistenciaService,
                DataBaseAccess
            ],
            imports: [
                HttpModule
            ]
        });
    }));

    beforeEach(inject([AsistenciaService], (service: AsistenciaService) => {
        asistenciaService = service;
    }));

    it('Creación de servicio', () => {
        expect(asistenciaService).toBeTruthy();
    });

});