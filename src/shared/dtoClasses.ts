import {Moment} from "moment";

export class Actividad{
    public id:number;
    public nombre:string;
    public descripcion: string[];
    public moderadores: Disertante[];
    public disertantes: Disertante[];
    public lugar: Lugar;
    public fecha?:string;
    public areaTematica?: AreaTematica;
    public imgString: string;
    public rawFecha?: Moment;
    public duracion?: number;
    public horaInicio?:string;
    public horaFin?:string;
    public tipoActividad: TipoActividad;
    public cuentaAsistencia?:boolean;
    public assignable: boolean;
    public imgStringsContent?: string[];
    public links?: ActividadLink[];
}

export class ActividadLink{
    url: string;
    title: string;
    description: string;
}

export class ActividadRaw{
    public id:number;
    public nombre:string;
    public descripcion: string[];
    public moderadores: number[];
    public disertantes: number[];
    public lugar: number;
    public fecha?:string;
    public areaTematica?: number;
    public imgString: string;
    public rawFecha?: string;
    public duracion?: number;
    public horaInicio?:string;
    public horaFin?:string;
    public tipoActividad: number;
    public cuentaAsistencia?:boolean;
    public imgStringsContent?: string[];
    public url?:string;
}

export class ActividadList{
    public timestamp:string;
    public actividades:ActividadRaw;
}

export class Developer{
    id:number;
    imgSource:string;
    fullName:string;
    institution:string;
    email:string;
    resume: string[];
}

export class MapaInstalaciones{
    public nombre;
    public url;
}

export class Lugar{
    public idLugar: number;
    public nombre: string;
    public marcador: Marcador;
}

export class AreaTematica{
    public idAreaTematica: number;
    public subAreas?: string[];
    public nombre: string;
    public nombreFiltro?: string;
    public descripcion: string;
    public imgString:string;
}

export class Disertante{
    public idDisertante:number;
    public nombreCompleto:string;
    public gender?: string;
    public institucion?:string;
    public imgString:string;
    public curriculum?:string[];
}

export class Chair{
    public idChair:number;
    public nombreCortesia:string; //Dr., Ing., Mg. etc.
    public nombreCompleto:string;
    public institucion:string;
    public areaDeRevision: AreaTematica;
    public cargo: string;
    public imgString:string;
    public curriculum:string;
    public email: string;
}

export class TipoActividad{
    public idTipo: number;
    public nombre: string;
    public color: string;
    public backgroundColor: string;
}

//TODO: Hacer bien la clase de usuario
export class Usuario{
    public id: number;
    public registration_id: number;
    public first_name: string;
    public last_name: string;
    public dni: string;
    public user_name: string;
    public password: string;
    public is_organizer: any;
    public assigned_activities?: number[];
    public team?: Team;
}

export class Team{
    public id: number;
    public name: string;
    public members: string[];
}

export class TipoMarcador{
    public idTipoMarcador: number;
    public nombre: string;
    public icono: any;
    public palabrasClaves: string[];
}

export class Marcador {
    public idMarcador: number;
    public titulo: string;
    public descripcion: string;
    public imagenUrl: String;
    public direccion: string;
    public latitud: number;
    public longitud: number;
    public distancia: number;
    public tipoMarcador: TipoMarcador;
    public telefono: string;
    public marcadorEspecial: boolean;
}

export class Organizador {
    public idOrganizador: number;
    public nombre: string;
    public apellido: string;
    public numeroTelefono: string;
}

export class Sponsor{
    name:string;
    type: string;
    imgSource:string;
    description:string[];
    url?: string;
    phone?: string;
    email?:string;
    detail?:string;
}

export class Asistencia{
    public id: number;
    public idUser: number;
    public idActivity: number;
    public concept: string;
    public dateTime: any;
}

export class ButtonBarEnabledElements{
    public facebook: boolean;
    public instagram: boolean;
    public whatsApp: boolean;
    public generalSurvey: boolean;
    public standings: boolean;
    public twitter: boolean;
    public website: boolean;
}

export class ImplementedModuleStatus{
    public AboutPage: boolean;
    public AreasTematicasPage: boolean;
    public AsistenciaPage: boolean;
    public ChairsPage: boolean;
    public DisertantesPage: boolean;
    public InicioPage: boolean;
    public LocalizacionPage: boolean;
    public MiCronogramaPage: boolean;
    public ProximaActividadPage: boolean;
    public SponsorsPage: boolean;
    public SettingsPage: boolean;
    public CompetitionsPage: boolean;
}

export class NotificationParameters{
    action: string;
    destination: string;
    title: string;
    message: string;
    data?: string;

    constructor(accion?: string, destination?: string, title?: string, message?: string, data?: string) {
        this.action = accion;
        this.destination = destination;
        this.title = title;
        this.message = message;
        if (data) {
            this.data = data;
        }
    }
}

export interface PageInterface {
    title: string;
    name: string;
    component: any;
    icon: string;
    logsOut?: boolean;
    index?: number;
    tabName?: string;
    tabComponent?: any;
    isImplemented?: boolean;
}

export class Favorito {
    public IdUsuario: number;
    public IdActividad: number;
}