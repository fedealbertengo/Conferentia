// Servicio para funcionalidad general relacionada a la gestión de actividades

import {Actividad, ActividadRaw, AreaTematica, TipoActividad, Usuario} from "./dtoClasses";
import {DisertanteService} from "./disertanteService";
import {Injectable} from "@angular/core";
import {GlobalService} from "./globalService";
import {MarcadorService} from "./marcadorService";
import {LugarService} from "./lugarService";
import {AreaTematicaService} from "./areaTematicaService";
import * as moment from 'moment';
import {DataBaseAccess} from "./databaseAccess";
import {UsuarioService} from "./usuarioService";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class ActividadService {

    private areaTematicaService: AreaTematicaService;
    private disertanteService:DisertanteService;
    private globalService:GlobalService;
    private marcadorService: MarcadorService;
    private lugarService: LugarService;

    public arrayTiposActividades: TipoActividad[] = [];
    public arrayAreasTematicas: AreaTematica[] = [];

    //TODO: Refactor for general use
    private defaultLocation = GlobalService.webApiLocation + 'img/activities/';
    private currentTheme = '';

    private fechaFormat = "YYYY-MM-DD";
    private tiempoFormat = "HH:mm";

    public static cronogramaCompleto: Actividad[] = [];

    constructor(public http: HttpClient,
                at: AreaTematicaService,
                ds: DisertanteService,
                gs: GlobalService,
                ms: MarcadorService,
                ls: LugarService,
    ){

        this.areaTematicaService = at;
        this.disertanteService = ds;
        this.globalService = gs;
        this.marcadorService = ms;
        this.lugarService = ls;

        this.arrayTiposActividades = this.getTiposActividades();
        this.arrayAreasTematicas = this.areaTematicaService.getAreasTematicas();
    }

    getTimestamp(): Observable<any>{
        const url = GlobalService.webApiLocation + 'actividades.php';
        let params = new HttpParams().set('action', 'getTimestamp').set('jwt', GlobalService.jwt);
        return this.http.get(url, {params: params});
    }

    getActividadesFromJson(): Observable<any>{
        const url = GlobalService.webApiLocation + 'actividades.php';
        let params = new HttpParams().set('action', 'getActividades').set('jwt', GlobalService.jwt);
        return this.http.get(url, {params: params});
    }

    /**
     * Devuelve los tipos asignables a las actividades de los eventos
     */
    getTiposActividades():TipoActividad[]{
        return [
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
    }

    /**
     * Compara cronológicamente las actividades pasadas como parámetros
     * @param a
     * @param b
     * @returns {number}
     */
    static ordenarActividades(a:Actividad, b:Actividad){

        const fechaA = a.rawFecha;
        const fechaB = b.rawFecha;

        if(fechaA < fechaB){
            return -1;
        }
        if(fechaA > fechaB){
            return 1;
        }

        return 0;
    }

    /**
     * En base a una fecha en formato ISO o Date de Javascript y la duración en horas de una actividad, devuelve la actividad con
     * fecha, hora de inicio y hora de fin formateadas en texto
     * @param {Actividad} rawActividad
     * @returns {Actividad}
     */

    private createActividad(rawActividad):Actividad{

        //TODO: Desestructurar el objeto copiado, para solamente copiar las propiedades que corresponden.
        let newActividad:Actividad = Object.assign({}, rawActividad);
        newActividad.moderadores = []; //! FIXME: Directamente, evitar copiar moderadores
        newActividad.disertantes = []; //! FIXME: Directamente, evitar copiar disertantes

        const auxiliarFecha = moment(rawActividad.rawFecha); //Para evitar mutación de estado al añadir horas de duración para calcular fin de actividad
        const ubicacionImagen = 'default';

        newActividad.rawFecha = moment(rawActividad.rawFecha); //Reasigno para obtener a partir del string un objeto moment
        newActividad.fecha = newActividad.rawFecha.format(this.fechaFormat);
        newActividad.imgString = this.asignarImagen(ubicacionImagen, rawActividad.imgString);
        newActividad.horaInicio = newActividad.rawFecha.format(this.tiempoFormat);
        newActividad.horaFin = auxiliarFecha.add(newActividad.duracion,"minutes").format(this.tiempoFormat);
        newActividad.lugar = this.lugarService.getLugarById(rawActividad.lugar);
        newActividad.tipoActividad = this.getTipoActividad(rawActividad.tipoActividad);

        for(const moderador of rawActividad.moderadores){
            newActividad.moderadores.push(this.disertanteService.getDisertanteById(moderador));
        }
        for(const disertante of rawActividad.disertantes){
            newActividad.disertantes.push(this.disertanteService.getDisertanteById(disertante));
        }

        return newActividad;
    }

    /**
     * A partir de los datos base obtenidos desde el datasource, construye los objetos de la lista de actividades
     * @param rawActividadesList
     */
    public generateActividades(rawActividadesList?:any[]){

        const actividadesRaw:ActividadRaw[] = rawActividadesList;

        const actividadesGenerales = []
            .concat(rawActividadesList)
            .filter(Actividad => !Actividad.assignable);

        //TODO: Agregar visitas técnicas filtradas por usuario
        const actividadesSinFiltro = []
            .concat(rawActividadesList)
            .filter(Actividad => Actividad.assignable);

        return this.construirArrayActividades(actividadesGenerales, actividadesSinFiltro);
    }

    /**
     * Construye el arreglo de actividades verificando si es que se usa inicio de sesión para la aplicación
     * y el usuario actual es o no 'organizador' del evento.
     * @param {Actividad[]} actividadesGenerales
     * @param {Actividad[]} actividadesParaFiltrar
     * @returns {Actividad[]}
     */
    public construirArrayActividades(actividadesGenerales:Actividad[], actividadesParaFiltrar:Actividad[]):Actividad[]{
        let actividadesFiltradas:Actividad[] = [];
        const loggedUser = UsuarioService.getUsuarioLogeado();
        const esUsuarioRegular = loggedUser && !loggedUser.is_organizer;

        const esActividadAsignada = Actividad => UsuarioService.getUsuarioLogeado().assigned_activities.indexOf(Actividad.id) !== -1;
        const crearActividad = Actividad => this.createActividad(Actividad);

        if(GlobalService.usaInicioSesion && esUsuarioRegular){
            actividadesFiltradas = actividadesParaFiltrar
                .filter(esActividadAsignada)
                .concat(actividadesGenerales)
                .map(crearActividad);
        }
        else{
            actividadesFiltradas = actividadesParaFiltrar
                .concat(actividadesGenerales)
                .map(crearActividad);
        }

        return actividadesFiltradas;
    }

    public getActividades():Actividad[]{
        return ActividadService.cronogramaCompleto;
    }

    public getActividadById(idActividad:number):Actividad{
        return ActividadService.cronogramaCompleto.filter(Actividad => Actividad.id === idActividad)[0];
    }

    public getActividadesByDisertanteId(idDisertante:number):Actividad[]{
        return ActividadService.cronogramaCompleto.filter(Actividad => Actividad.disertantes.filter(Disertante => Disertante.idDisertante === idDisertante)[0]);
    }

    public getActividadesByModeradorId(idModerador:number):Actividad[]{
        return ActividadService.cronogramaCompleto.filter(Actividad => Actividad.moderadores.filter(Disertante => Disertante.idDisertante === idModerador)[0]);
    }

    public getTipoActividad(idTipoActividad: number): TipoActividad{
        return this.arrayTiposActividades.filter(TipoActividad => TipoActividad.idTipo === idTipoActividad)[0];
    }

    public getAreaTematicaById(idAreaTematica: number): AreaTematica{
        return this.arrayAreasTematicas.filter(AreaTematica => AreaTematica.idAreaTematica === idAreaTematica)[0];
    }

    public getAreasTematicas(): AreaTematica[]{
        return this.arrayAreasTematicas;
    }

    public asignarImagen(ubicacion:string, icono:string):string {
        const ubicaciones = {default: this.defaultLocation, tema: this.currentTheme };
        return `${ubicaciones[ubicacion]}${icono}.png`;
    }

}
