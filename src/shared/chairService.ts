import {AreaTematica, Chair} from "./dtoClasses";
import {GlobalService} from "./globalService";
import {Component} from "@angular/core";
import {AreaTematicaService} from "./areaTematicaService";

@Component({
    providers: [GlobalService, AreaTematicaService]
})

export class ChairService{

    public arrayChairs:Chair[] = [];
    public arrayAreasTematicas:AreaTematica[] = [];

    //TODO: Refactor for general use
    private imagesLocation = GlobalService.webApiLocation;
    private avatarLocation = this.imagesLocation + 'img/staff/';
    // private randomAvatarLocation = this.imagesLocation;

    private globalService:GlobalService;
    private areaTematicaService:AreaTematicaService;

    constructor(gs: GlobalService, as: AreaTematicaService){

        this.globalService = gs;
        this.areaTematicaService = as;

        this.arrayChairs = [
            {
                idChair: 1,
                nombreCompleto: 'Lilia Laura Guillén',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'lguillén.png',
                cargo: 'Presidencia',
                curriculum: '',
                email: 'guillenlali@gmail.com'
            },
            {
                idChair: 2,
                nombreCompleto: 'María Florencia Gómez',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'fgomez.png',
                cargo: 'Coordinación General',
                curriculum: '',
                email: 'florgomez102@gmail.com'
            },
            {
                idChair: 3,
                nombreCompleto: 'Juan Pablo Ríos',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'jrios.png',
                cargo: 'Coordinación General',
                curriculum: '',
                email: 'riosjuanpablo99@gmail.com'
            },
            {
                idChair: 4,
                nombreCompleto: 'Luciano Ramírez',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'lramirez.png',
                cargo: 'Académica',
                curriculum: '',
                email: 'ramirezz.lucho@gmail.com'
            },
            {
                idChair: 5,
                nombreCompleto: 'Agustín Ibáñez',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'aibañez.png',
                cargo: 'Académica',
                curriculum: '',
                email: 'agustinibanes@gmail.com'
            },
            {
                idChair: 6,
                nombreCompleto: 'Lucía Crescitelli',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'lcrescitelli.png',
                cargo: 'Auspicios',
                curriculum: '',
                email: 'luciacrescitelli@hotmail.com'
            },
            {
                idChair: 7,
                nombreCompleto: 'Florencia Camargo',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'fcamargo.png',
                cargo: 'Auspicios',
                curriculum: '',
                email: 'florcamargo.fc@hotmail.es'
            },
            {
                idChair: 8,
                nombreCompleto: 'Luciana Orozco',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'lorozco.png',
                cargo: 'Auspicios',
                curriculum: '',
                email: 'lucianaaorozco@gmail.com'
            },
            {
                idChair: 9,
                nombreCompleto: 'Sofía  Orihuela',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'sorihuela.png',
                cargo: 'Auspicios',
                curriculum: '',
                email: 'sofiaorihuela10@gmail.com'
            },
            {
                idChair: 10,
                nombreCompleto: 'Joaquín Loustaunau',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'jloustaunau.png',
                cargo: 'Auspicios',
                curriculum: '',
                email: 'joaco1510@gmail.com'
            },
            {
                idChair: 11,
                nombreCompleto: 'Federico  Russo',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'frusso.png',
                cargo: 'Auspicios',
                curriculum: '',
                email: 'federu1995@gmail.com'
            },
            {
                idChair: 12,
                nombreCompleto: 'Delfina Boschín',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'dboschin.png',
                cargo: 'Auspicios',
                curriculum: '',
                email: 'boschindelfina@gmail.com'
            },
            {
                idChair: 13,
                nombreCompleto: 'Sofía  Dumé',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'sdume.png',
                cargo: 'Difusión y Web',
                curriculum: '',
                email: 'sofiadume@gmail.com'
            },
            {
                idChair: 14,
                nombreCompleto: 'Gonzalo Favaro',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'gfavaro.png',
                cargo: 'Difusión y Web',
                curriculum: '',
                email: 'gfavaro8@gmail.com'
            },
            {
                idChair: 15,
                nombreCompleto: 'Marianella Sombra',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'msombra.png',
                cargo: 'Difusión y Web',
                curriculum: '',
                email: 'marianelasombraa@gmail.com'
            },
            {
                idChair: 16,
                nombreCompleto: 'Marcos Guillén',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'mguillen.png',
                cargo: 'Eventos',
                curriculum: '',
                email: 'marcosdguillen@gmail.com'
            },
            {
                idChair: 17,
                nombreCompleto: 'Franco Soler',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'fsoler.png',
                cargo: 'Eventos',
                curriculum: '',
                email: 'francosoler.08@gmail.com'
            },
            {
                idChair: 18,
                nombreCompleto: 'Gonzalo Antolín',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'gantolin.png',
                cargo: 'Eventos',
                curriculum: '',
                email: 'gonza.ortelli@gmail,com'
            },
            {
                idChair: 20,
                nombreCompleto: 'Nicolás Encabo',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'nencabo.png',
                cargo: 'Eventos',
                curriculum: '',
                email: 'nico.encabo97@gmail.com'
            },
            {
                idChair: 21,
                nombreCompleto: 'Federico Sequeiros',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'fsequeiros.png',
                cargo: 'Finanzas',
                curriculum: '',
                email: 'federicosequeiros@gmail.com'
            },
            {
                idChair: 22,
                nombreCompleto: 'Luciana Cruz',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'lcruz.png',
                cargo: 'Finanzas',
                curriculum: '',
                email: 'lucianacruz588@gmail.com'
            },
            {
                idChair: 23,
                nombreCompleto: 'Emmanuel Luengo',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'eluengo.png',
                cargo: 'Finanzas',
                curriculum: '',
                email: 'emma.luengo91@gmail.com'
            },
            {
                idChair: 24,
                nombreCompleto: 'Giuliano Colamaio',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'gcolamaio.png',
                cargo: 'Gestión Ambiental',
                curriculum: '',
                email: 'giulianocolamaio95@gmail.com'
            },
            {
                idChair: 25,
                nombreCompleto: 'Daniela Salas',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'dsalas.png',
                cargo: 'Gestión Ambiental',
                curriculum: '',
                email: 'danielasalas.b7@gmail.com'
            },
            {
                idChair: 26,
                nombreCompleto: 'Brenda Sorroche',
                nombreCortesia: '',
                institucion: '',
                areaDeRevision: null,
                imgString: this.avatarLocation + 'bsorroche.png',
                cargo: 'Logística e Infraestructura',
                curriculum: '',
                email: 'bsorroche97@gmail.com'
            }
        ];
    }

    public getChairs():Chair[]{
        return this.arrayChairs;
    }

    public getChairById(idChair:number):Chair{
        return this.arrayChairs.filter(Chair => Chair.idChair === idChair)[0];
    }

}
