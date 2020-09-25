import {Component} from "@angular/core";
import {MarcadorService} from "./marcadorService";
import {GlobalService} from "./globalService";
import {Lugar} from "./dtoClasses";


@Component({
    providers: [MarcadorService, GlobalService]
})

export class LugarService {

    private globalService:GlobalService;
    private marcadorService: MarcadorService;

    public arrayLugares:Lugar[] = [];

    constructor(gs: GlobalService, ms: MarcadorService){
        this.globalService = gs;
        this.marcadorService = ms;
        this.getLugaresCAEII2018();
    }

    getLugaresCAEII2018(){

        const lugaresSantaFe = [
            // {
            //     idLugar: 1,
            //     nombre: '',
            //     marcador: this.marcadorService.getMarcadorById()
            // },
            {
                idLugar: 1,
                nombre: 'Aula A',
                marcador: this.marcadorService.getMarcadorById(246)
            },
            {
                idLugar: 2,
                nombre: 'Aula B',
                marcador: this.marcadorService.getMarcadorById(246)
            },
            {
                idLugar: 3,
                nombre: 'Aula C',
                marcador: this.marcadorService.getMarcadorById(246)
            },
            {
                idLugar: 4,
                nombre: 'Aula D',
                marcador: this.marcadorService.getMarcadorById(246)
            },
            {
                idLugar: 5,
                nombre: 'Aula E',
                marcador: this.marcadorService.getMarcadorById(246)
            },
            {
                idLugar: 6,
                nombre: 'Aula F',
                marcador: this.marcadorService.getMarcadorById(246)
            },
            {
                idLugar: 7,
                nombre: 'Aula G',
                marcador: this.marcadorService.getMarcadorById(246)
            },
            {
                idLugar: 8,
                nombre: 'Hall Planta Alta',
                marcador: this.marcadorService.getMarcadorById(246)
            },
            {
                idLugar: 9,
                nombre: 'Salones del Puerto',
                marcador: this.marcadorService.getMarcadorById(6)
            },
            {
                idLugar: 10,
                nombre: 'Cofee Break',
                marcador: this.marcadorService.getMarcadorById(246)
            },
            {
                idLugar: 11,
                nombre: 'Acreditaciones',
                marcador: this.marcadorService.getMarcadorById(246)
            },
            {
                idLugar: 12,
                nombre: 'Explanada Estación Belgrano',
                marcador: this.marcadorService.getMarcadorById(246)
            },
            {
                idLugar: 13,
                nombre: 'Libre',
                marcador: null
            }
        ];

        const lugaresMendoza = [

            {
                idLugar: 1,
                nombre: 'Colmena Bar',
                marcador: this.marcadorService.getMarcadorById(302)
            },
            {
                idLugar: 2,
                nombre: 'Buffet Café del Mundo - Centro de Congresos y Convenciones',
                marcador: this.marcadorService.getMarcadorById(300)
            },
            {
                idLugar: 3,
                nombre: 'Centro de Congresos y Convenciones ',
                marcador: this.marcadorService.getMarcadorById(313)
            },
            {
                idLugar: 4,
                nombre: 'Sala Despegar - Centro de Congresos y Convenciones ',
                marcador: this.marcadorService.getMarcadorById(313)
            },
            {
                idLugar: 5,
                nombre: 'Sala Techint - Centro de Congresos y Convenciones ',
                marcador: this.marcadorService.getMarcadorById(313)
            },
            {
                idLugar: 6,
                nombre: 'Alto Belgrano',
                marcador: this.marcadorService.getMarcadorById(301)
            }
        ];

        this.arrayLugares = lugaresSantaFe;
    }

    getLugarById(idLugar: number): Lugar{
        return this.arrayLugares.filter(lug => lug.idLugar == idLugar)[0];
    }

}
