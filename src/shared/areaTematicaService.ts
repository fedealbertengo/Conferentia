import {AreaTematica, Chair} from "./dtoClasses";
import {GlobalService} from "./globalService";
import {Component} from "@angular/core";

@Component({
    providers: [GlobalService]
})

export class AreaTematicaService{

    public arrayAreasTematicas:AreaTematica[] = [];

    //TODO: Refactor for general use
    private imagesLocation = 'assets/img/';
    private sessionsLocation = this.imagesLocation + 'sessions/';
    private activitiesLocation = this.imagesLocation + 'activities/';

    constructor(public globalService: GlobalService){
        this.load();
    }

    private load(){
        this.arrayAreasTematicas = [
            {
                idAreaTematica: 1,
                nombre: 'Acústica y vibraciones',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar1.png'
            },
            {
                idAreaTematica: 2,
                nombre: 'Análisis estructural',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar2.png'
            },
            {
                idAreaTematica: 3,
                nombre: 'Aplic. a reactores nucleares de potencia',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar3.png'
            },
            {
                idAreaTematica: 4,
                nombre: 'Aplicaciones de wavelets',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar4.png'
            },
            {
                idAreaTematica: 5,
                nombre: 'Aplicaciones industriales',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar5.png'
            },
            {
                idAreaTematica: 6,
                nombre: 'Computación de alto desempeño',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar6.png'
            },
            {
                idAreaTematica: 7,
                nombre: 'Cuantificación de incertidumbre y modelado estocástico',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar7.png'
            },
            {
                idAreaTematica: 8,
                nombre: 'Dinámica estructural',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar8.png'
            },
            {
                idAreaTematica: 9,
                nombre: 'Enseñanza de métodos numéricos',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar9.png'
            },
            {
                idAreaTematica: 10,
                nombre: 'Flujo y transporte multifásicos en medios porosos y microescala',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar10.png'
            },
            {
                idAreaTematica: 11,
                nombre: 'Fundamentos matemáticos de métodos numéricos',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar11.png'
            },
            {
                idAreaTematica: 12,
                nombre: 'Mecánica de fluidos computacional',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar12.png'
            },
            {
                idAreaTematica: 13,
                nombre: 'Mecánica de sólidos',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar13.png'
            },
            {
                idAreaTematica: 14,
                nombre: 'Modelado de falla de materiales',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar14.png'
            },
            {
                idAreaTematica: 15,
                nombre: 'Modelado de sistemas multicuerpo',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar15.png'
            },
            {
                idAreaTematica: 16,
                nombre: 'Modelado multiescala',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar16.png'
            },
            {
                idAreaTematica: 17,
                nombre: 'Bioingeniería, biomecánica y sistemas biomédicos',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar17.png'
            },
            {
                idAreaTematica: 18,
                nombre: 'Multifísica',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar18.png'
            },
            {
                idAreaTematica: 19,
                nombre: 'Optimización y control: teoría y aplicaciones',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar19.png'
            },
            {
                idAreaTematica: 20,
                nombre: 'Transferencia de calor y masa',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar20.png'
            },
            {
                idAreaTematica: 21,
                nombre: 'Modelos computacionales derivados desde imágenes',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar21.png'
            },
            {
                idAreaTematica: 22,
                nombre: 'Reuniones de usuarios',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar22.png'
            },
            {
                idAreaTematica: 23,
                nombre: 'Sesión homenaje al prof. Victorio E. Sonzogni',
                descripcion: '',
                imgString: this.sessionsLocation + 'pilar23.png'
            }
        ];
    }

    public getAreasTematicas():AreaTematica[]{
        return this.arrayAreasTematicas;
    }

    public getAreaTematicaById(idAreaTematica:number):AreaTematica{
        return this.arrayAreasTematicas.filter(AreaTematica => AreaTematica.idAreaTematica === idAreaTematica)[0];
    }

}
