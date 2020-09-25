import {async, fakeAsync, inject, TestBed} from '@angular/core/testing';

import {GlobalService} from "../../shared/globalService";
import {ActividadService} from "../../shared/actividadService";
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {AreaTematicaService} from "../../shared/areaTematicaService";
import {DisertanteService} from "../../shared/disertanteService";
import {MarcadorService} from "../../shared/marcadorService";
import {LugarService} from "../../shared/lugarService";
import {TipoActividad} from "../../shared/dtoClasses";

describe('Actividad Service', () => {

    let actividadService: ActividadService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                ActividadService,
                HttpClient,
                AreaTematicaService,
                DisertanteService,
                GlobalService,
                MarcadorService,
                LugarService
            ],
            imports: [
                HttpClientModule
            ]
        });
    }));

    beforeEach(inject([ActividadService], (service: ActividadService) => {
        actividadService = service;
    }));

    it('Creación de servicio', () => {
        expect(actividadService).toBeTruthy();
    });

    it('Obtener timestamp', async(inject( [ActividadService, HttpClient], ( service, httpClient: HttpClient ) => {
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

    it('Obtener tipos de actividade especifico segun un ID', () => {
        let tiposActividades: TipoActividad[] = [
            {
                idTipo: 1,
                nombre: "Keynote",
                color: "black",
                backgroundColor: "orange"
            },
            {
                idTipo: 2,
                nombre: "Presentation",
                color: "white",
                backgroundColor: "blue"
            },
            {
                idTipo: 3,
                nombre: "Coffee Break",
                color: "white",
                backgroundColor: "brown"
            },
            {
                idTipo: 4,
                nombre: "Technical Visit",
                color: "white",
                backgroundColor: "green"
            },
            {
                idTipo: 5,
                nombre: "Seminar",
                color: "black",
                backgroundColor: "yellow"
            },
            {
                idTipo: 6,
                nombre: "Ceremony",
                color: "black",
                backgroundColor: "cyan"
            },
            {
                idTipo: 7,
                nombre: "Breakfast",
                color: "white",
                backgroundColor: "red"
            },
            {
                idTipo: 8,
                nombre: "Lunch",
                color: "white",
                backgroundColor: "red"
            },
            {
                idTipo: 9,
                nombre: "Registration",
                color: "white",
                backgroundColor: "purple"
            },
            {
                idTipo: 10,
                nombre: "Videoconference",
                color: "white",
                backgroundColor: "aquamarine"
            },
            {
                idTipo: 11,
                nombre: "Advertisement",
                color: "white",
                backgroundColor: "chocolate"
            },
            {
                idTipo: 12,
                nombre: "Reunion",
                color: "black",
                backgroundColor: "gold"
            },
            {
                idTipo: 13,
                nombre: "Communication",
                color: "white",
                backgroundColor: "darkcyan"
            },
            {
                idTipo: 14,
                nombre: "Evening Activity",
                color: "white",
                backgroundColor: "darkblue"
            },
            {
                idTipo: 15,
                nombre: "Recreation",
                color: "black",
                backgroundColor: "aquamarine"
            },
            {
                idTipo: 16,
                nombre: "Training",
                color: "white",
                backgroundColor: "black"
            },
            {
                idTipo: 17,
                nombre: "Debate Panel",
                color: "white",
                backgroundColor: "cornflowerblue"
            },
            {
                idTipo: 18,
                nombre: "Professional Conference",
                color: "black",
                backgroundColor: "orange"
            },
            {
                idTipo: 19,
                nombre: "Dinner",
                color: "white",
                backgroundColor: "red"
            },
            {
                idTipo: 20,
                nombre: "Workshop",
                color: "black",
                backgroundColor: "yellow"
            },
            {
                idTipo: 21,
                nombre: "Break",
                color: "white",
                backgroundColor: "cornflowerblue"
            },
            {
                idTipo: 22,
                nombre: "Group Activity",
                color: "black",
                backgroundColor: "aquamarine"
            },
        ];
        expect(actividadService.getTiposActividades()).toEqual(tiposActividades);
    });

    it('Obtener tipos de actividades', () => {
        let tipoActividad: TipoActividad = {
            idTipo: 1,
            nombre: "Keynote",
            color: "black",
            backgroundColor: "orange"
        };
        expect(actividadService.getTipoActividad(1)).toEqual(tipoActividad);
    });

    it('Obtener actividades',async(inject( [ActividadService, HttpClient], ( service, httpClient: HttpClient ) => {
        let actividades = [];
        const url = GlobalService.webApiLocation + 'jwt.php';
        let params = new HttpParams().set('action', 'getJWT');
        httpClient.get(url, {params: params}).toPromise().then((jwt) => {
            GlobalService.jwt = jwt.toString();
            service.getActividadesFromJson().toPromise().then(result => {
                service.cronogramaCompleto = service.generateActividades(
                    result.data
                );
                service.cronogramaCompleto.sort(
                    ActividadService.ordenarActividades
                );
                actividades = service.cronogramaCompleto;
                expect(actividades.length).toBeGreaterThan(0);
            }).catch(error => {
                expect(error).toBeUndefined();
            });
        });
    })));

});