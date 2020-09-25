import {async, inject, TestBed} from '@angular/core/testing';

import {UsuarioService} from "../../shared/usuarioService";
import {HttpModule} from "@angular/http";
import {DataBaseAccess} from "../../shared/databaseAccess";
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('Usuario Service', () => {

    let usuarioService: UsuarioService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                UsuarioService,
                DataBaseAccess,
                HttpClient
            ],
            imports: [
                HttpModule,
                HttpClientModule
            ]
        });
    }));

    beforeEach(inject([UsuarioService], (service: UsuarioService) => {
        usuarioService = service;
    }));

    it('Creación de servicio', () => {
        expect(usuarioService).toBeTruthy();
    });

});