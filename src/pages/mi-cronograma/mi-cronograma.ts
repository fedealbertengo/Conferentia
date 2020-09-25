import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {ActionSheetController, NavController, Platform, PopoverController, VirtualScroll} from 'ionic-angular';
import {Actividad, AreaTematica, Favorito, TipoActividad} from "../../shared/dtoClasses";
import {ActividadService} from "../../shared/actividadService";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";
import {UsuarioService} from "../../shared/usuarioService";

@Component({
    selector: 'page-mi-cronograma',
    templateUrl: 'mi-cronograma.html'
})
export class MiCronogramaPage {

    private listCronograma: Actividad[] = [];

    private calculatedButtonWidth:string;

    diasOcupados: any[] = [];
    diaFiltrado: string;

    itemsPrueba: string[] = ['Hola', 'Que', 'Tal'];

    tiposActividades: TipoActividad[];
    tipoActividadFilt: TipoActividad;

    areasTematicas: AreaTematica[];
    areasTematicaFilt: AreaTematica;

    actividades: Actividad[];

    lugarFiltro: any;

    searchKey: string = "";

    vistaCompleta: boolean = true;

    favoritos: Favorito[];
    idUsuario: number;

    constructor(public navCtrl: NavController,
                public platform: Platform,
                public actionsheetCtrl: ActionSheetController,
                public popoverCtrl: PopoverController,
                private changeDetectorRef: ChangeDetectorRef,
                public actividadService:ActividadService,
                public translate: TranslateService,
                public storage: Storage) {
        this.diaFiltrado = null;
        this.tipoActividadFilt = null;

        //Este bloque de código permite evitar el comportamiento
        // que deriva el footer de tabs ocultándose.
        platform.registerBackButtonAction(() => {
            if (navCtrl.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
                navCtrl.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
            } else {
                platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
            }
        });

    }

    ngOnInit(){
        this.filtrar();
        this.listCronograma = this.listCronograma.sort(ActividadService.ordenarActividades);
        this.getDias(this.actividadService.getActividades());
        this.getTiposActividades(this.listCronograma);
        this.getAreasTematicas(this.listCronograma);
        this.storage.get("favoritos").then(favoritos => {
            this.favoritos = favoritos;
        });
        this.idUsuario = UsuarioService.getUsuarioLogeado() ? UsuarioService.getUsuarioLogeado().id : 0;
    }

    ngAfterViewInit(){
        this.calculatedButtonWidth = (100/this.diasOcupados.length - 1) + '%';
    }

    onInput(event) {
        let context = this;
        this.filtrar();
        this.changeDetectorRef.detectChanges();
    }

    aplicarFiltroBusqueda(list: Actividad[]){
        return list.filter(Actividad => (Actividad.nombre.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0) || ((Actividad.areaTematica && Actividad.areaTematica.nombre) ? Actividad.areaTematica.nombre.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0 : Actividad.tipoActividad.nombre.toLowerCase().indexOf(this.searchKey.toLowerCase()) > 0));
    }

    aplicarFiltroDia(list: Actividad[]): Actividad[]{
        if(this.diaFiltrado){
            return list.filter(Actividad => ((this.mostrarFechaActual(Actividad) === this.diaFiltrado)));
        }
        else{
            return list;
        }
    }

    aplicarFiltroTipoActividad(list: Actividad[]): Actividad[]{
        if(this.tipoActividadFilt){
            return list.filter(act => act.tipoActividad.nombre.toLowerCase() === this.tipoActividadFilt.nombre.toLowerCase());
        }
        else{
            return list;
        }
    }

    aplicarFiltroAreaTematica(list: Actividad[]): Actividad[]{
        if(this.areasTematicaFilt){
            return list.filter(act => act.areaTematica && act.areaTematica.nombre && act.areaTematica.nombre.toLowerCase() === this.areasTematicaFilt.nombre.toLowerCase());
        }
        else{
            return list;
        }
    }

    aplicarFiltroSede(list:Actividad[]):Actividad[]{
        if(this.lugarFiltro){
            return list.filter(Actividad => Actividad.lugar.idLugar === this.lugarFiltro.idLugar);
        }
        else{
            return list;
        }
    }

    filtrar(){
        this.listCronograma = this.actividadService.getActividades();

        if(this.diaFiltrado){
            this.listCronograma = this.aplicarFiltroDia(this.actividadService.getActividades());
        }
        if(this.tipoActividadFilt){
            this.listCronograma = this.aplicarFiltroTipoActividad(this.listCronograma);
        }
        if(this.areasTematicaFilt){
            this.listCronograma = this.aplicarFiltroAreaTematica(this.listCronograma);
        }
        if(this.lugarFiltro){
            this.listCronograma = this.aplicarFiltroSede(this.listCronograma);
        }
        if(!this.diaFiltrado && !this.tipoActividadFilt && !this.areasTematicaFilt && !this.lugarFiltro){
            this.listCronograma = this.actividadService.getActividades();
        }
        this.listCronograma = this.aplicarFiltroBusqueda(this.listCronograma);
        this.listCronograma = this.listCronograma.sort(ActividadService.ordenarActividades);
        this.getDias((this.tipoActividadFilt) ? (this.areasTematicaFilt) ? this.aplicarFiltroBusqueda(this.aplicarFiltroTipoActividad(this.aplicarFiltroAreaTematica(this.actividadService.getActividades()))) : this.aplicarFiltroBusqueda(this.aplicarFiltroTipoActividad(this.actividadService.getActividades())) : (this.areasTematicaFilt) ? this.aplicarFiltroBusqueda(this.aplicarFiltroAreaTematica(this.actividadService.getActividades())) : this.aplicarFiltroBusqueda(this.actividadService.getActividades()));
        this.generateDiasOcupadosObjects();
        this.getTiposActividades((this.tipoActividadFilt) ? this.aplicarFiltroBusqueda(this.aplicarFiltroTipoActividad(this.aplicarFiltroDia(this.actividadService.getActividades()))) : this.listCronograma);
        this.generateTiposActividadesObjects();
        this.getAreasTematicas((this.areasTematicaFilt) ? this.aplicarFiltroBusqueda(this.aplicarFiltroAreaTematica(this.aplicarFiltroDia(this.actividadService.getActividades()))) : this.listCronograma);
        this.generateAreaTematicaObjects();
        this.generateSedeObjects();
        this.actividades = this.getTodasActividades();
    }

    filtrarPorDia(dia: string){
        this.diaFiltrado = dia;
        this.filtrar();
        this.getTiposActividades((this.diaFiltrado) ? this.aplicarFiltroBusqueda(this.aplicarFiltroDia(this.actividadService.getActividades())) : this.aplicarFiltroBusqueda(this.actividadService.getActividades()));
        this.generateTiposActividadesObjects();
        this.getDias((this.tipoActividadFilt) ? (this.areasTematicaFilt) ? this.aplicarFiltroBusqueda(this.aplicarFiltroTipoActividad(this.aplicarFiltroAreaTematica(this.actividadService.getActividades()))) : this.aplicarFiltroBusqueda(this.aplicarFiltroTipoActividad(this.actividadService.getActividades())) : (this.areasTematicaFilt) ? this.aplicarFiltroBusqueda(this.aplicarFiltroAreaTematica(this.actividadService.getActividades())) : this.aplicarFiltroBusqueda(this.actividadService.getActividades()));
    }

    filtrarTipoActividad(tipoActividad: TipoActividad){
        this.tipoActividadFilt = tipoActividad;
        this.filtrar();
        this.getDias((this.tipoActividadFilt) ?
            this.aplicarFiltroBusqueda(this.aplicarFiltroTipoActividad(this.actividadService.getActividades())) :
            this.aplicarFiltroBusqueda(this.actividadService.getActividades()));
        this.generateDiasOcupadosObjects();
    }

    filtrarAreaTematica(areaTematica: AreaTematica){
        this.areasTematicaFilt = areaTematica;
        this.filtrar();
        this.getDias((this.areasTematicaFilt) ?
            this.aplicarFiltroBusqueda(this.aplicarFiltroAreaTematica(this.actividadService.getActividades())) :
            this.aplicarFiltroBusqueda(this.actividadService.getActividades()));
        this.generateDiasOcupadosObjects();
    }

    filtrarSede(lugar: any){
        this.lugarFiltro = lugar;
        this.filtrar();
        this.getDias((this.lugarFiltro) ?
            this.aplicarFiltroBusqueda(this.aplicarFiltroSede(this.actividadService.getActividades())) :
            this.aplicarFiltroBusqueda(this.actividadService.getActividades()));
        this.generateDiasOcupadosObjects();
    }

    /**
     * Obtiene, en formato (número de día del mes) + de + (nombre de mes) todas las fechas durante las que hay
     * actividades programadas en el cronograma.
     * @param {Actividad[]} lista
     */
    getDias(lista: Actividad[]){

        this.diasOcupados = Array.from(new Set(lista.map(Actividad => this.mostrarFechaActual(Actividad))));

        this.diasOcupados.sort(function(a,b){
            return (a < b) ? -1 : ((a > b) ? 1 : 0);
        });
    }

    /**
     * Devuelve los tipos de todas las actividades existentes en el cronograma actual
     * @param listaActividades
     */
    getTiposActividades(lista: Actividad[]){
        this.tiposActividades = [];
        if(lista.length){
            lista.forEach(act => {
                if (!this.tiposActividades.filter(tipoAct => tipoAct.idTipo === act.tipoActividad.idTipo).length) {
                    this.tiposActividades.push(act.tipoActividad);
                }
            });
        }
        this.tiposActividades.sort(function(a,b) {
            return (a.nombre < b.nombre ? -1 : ((a.nombre > b.nombre) ? 1 : 0));
        });
    }

    /**
     * Devuelve las áreas temáticas de todas las actividades existentes en el cronograma actual
     * @param listaActividades
     */
    getAreasTematicas(listaActividades: Actividad[]){
        this.areasTematicas = [];
        if(listaActividades && listaActividades.length){
            listaActividades.forEach(act => {
                if(act.areaTematica){
                    if (!this.areasTematicas.filter(areaTem => areaTem.idAreaTematica === act.areaTematica.idAreaTematica).length) {
                        this.areasTematicas.push(act.areaTematica);
                    }
                }
            });
        }
        this.areasTematicas.sort(function(a,b) {
            return (a.nombre < b.nombre ? -1 : ((a.nombre > b.nombre) ? 1 : 0));
        });
    }

    getActividades(dia: string):Actividad[]{
        return this.listCronograma
            .filter(Actividad => (this.mostrarFechaActual(Actividad) === dia))
            .sort(ActividadService.ordenarActividades);
    }

    getTodasActividades(): Actividad[]{
        return this.listCronograma.sort(ActividadService.ordenarActividades);
    }

    esPrimerActividadDia(actividad: Actividad){
        let esPrimer: boolean = false;
        for(let dia of this.getDiasOcupados()){
            if(this.getActividades(dia)[0].id === actividad.id){
                esPrimer = true;
            }
        }
        return esPrimer;
    }

    getDiasOcupados(){
        return this.diasOcupados.filter(dia => this.getActividades(dia).length);
    }

    /**
     * Devuelve la fecha en formato (número de día del mes) + de + (nombre de mes)
     * @param {Actividad} actividad
     * @returns {string}
     */
    mostrarFechaActual(actividad: Actividad): string{
        return actividad.rawFecha.locale('es').format('DD') + ' de ' + actividad.rawFecha.format('MMMM');
    }

    private abrirMenuFiltro() {
        let actionSheet = this.actionsheetCtrl.create({
            title: this.translate.instant('Select a day to filter activities by:'),
            cssClass: 'action-sheets-basic-page',
            buttons: this.generateDiasOcupadosObjects()
        });
        actionSheet.present();
    }

    private generateDiasOcupadosObjects(){

        let diasOcupadosObjects:any = [];

        for(let diaOcupado of this.diasOcupados){
            diasOcupadosObjects.push(
                {
                    text: diaOcupado,
                    role: 'Filtrar ' + diaOcupado,
                    icon: 'arrow-dropright-circle',
                    handler: () =>{
                        this.filtrarPorDia(diaOcupado);
                    }
                }
            )
        }

        diasOcupadosObjects.push(
            {
                text: this.translate.instant("See All"),
                role: 'cancel', // will always sort to be on the bottom
                icon: !this.platform.is('ios') ? 'calendar' : null,
                handler: () => {
                    this.filtrarPorDia(null);
                }
            });

        return diasOcupadosObjects;
    }

    private generateAreaTematicaObjects(){
        let areaTematicaObjects:any = [];

        for(let areaTematica of this.areasTematicas){

            let nombreParaMostrar = areaTematica.nombreFiltro ? areaTematica.nombreFiltro : areaTematica.nombre;
            areaTematicaObjects.push(
                {
                    text: nombreParaMostrar,
                    role: 'Filtrar ' + nombreParaMostrar,
                    icon: 'arrow-dropright-circle',
                    handler: () =>{
                        this.filtrarAreaTematica(areaTematica);
                    }
                }
            )
        }

        areaTematicaObjects.push(
            {
                text: this.translate.instant("See All"),
                role: 'cancel', // will always sort to be on the bottom
                icon: !this.platform.is('ios') ? 'calendar' : null,
                handler: () => {
                    this.filtrarAreaTematica(null);
                }
            });

        return areaTematicaObjects;
    }

    private generateSedeObjects() {
        let sedeObjects: any = [];

        //TODO: Mover este método a una zona compartida genérica
        const setActividades = (arrArg) => {
            return arrArg.filter((elem, pos, arr) => {
                return arr.indexOf(elem) == pos;
            });
        };

        const lugaresActividades = setActividades(this.actividadService.getActividades().map(Actividad => Actividad.lugar));

        for(let lugar of lugaresActividades){
            sedeObjects.push(
                {
                    text: lugar.nombre,
                    role: 'Filtrar ' + lugar.nombre,
                    icon: 'arrow-dropright-circle',
                    handler: () =>{
                        this.filtrarSede(lugar);
                    }
                }
            )
        }

        sedeObjects.push(
            {
                text: this.translate.instant("See All"),
                role: 'cancel', // will always sort to be on the bottom
                icon: !this.platform.is('ios') ? 'calendar' : null,
                handler: () => {
                    this.filtrarSede(null);
                }
            });

        return sedeObjects;
    }


    private generateTiposActividadesObjects(){

        let tiposActividadesObjects:any = [];

        for(let tipoActividad of this.tiposActividades){
            this.translate.get(tipoActividad.nombre).subscribe(res => {
                tiposActividadesObjects.push(
                    {
                        text: res,
                        role: 'Filtrar ' + res,
                        icon: 'arrow-dropright-circle',
                        handler: () =>{
                            this.filtrarTipoActividad(tipoActividad);
                        }
                    }
                )
            });
        }

        tiposActividadesObjects.push(
            {
                text: this.translate.instant("See All"),
                role: 'cancel', // will always sort to be on the bottom
                icon: !this.platform.is('ios') ? 'calendar' : null,
                handler: () => {
                    this.filtrarTipoActividad(null);
                }
            });

        return tiposActividadesObjects;
    }

    abrirMenuFiltroTipoActividad() {
        let actionSheet = this.actionsheetCtrl.create({
            title: this.translate.instant("Pick an activity type"),
            cssClass: 'action-sheets-basic-page',
            buttons: this.generateTiposActividadesObjects()
        });
        actionSheet.present();
    }

    abrirMenuFiltroAreaTematica() {
        let actionSheet = this.actionsheetCtrl.create({
            title: this.translate.instant("Select a topic to filter activities by"),
            cssClass: 'action-sheets-basic-page',
            buttons: this.generateAreaTematicaObjects()
        });
        actionSheet.present();
    }

    abrirFiltroSede(){
        let actionSheet = this.actionsheetCtrl.create({
            title: this.translate.instant("Select a room to filter activities by"),
            cssClass: 'action-sheets-basic-page',
            buttons: this.generateSedeObjects()
        });
        actionSheet.present();
    }

    borrarTodosLosFiltros(){
        this.areasTematicaFilt = null;
        this.diaFiltrado = null;
        this.tipoActividadFilt = null;
        this.lugarFiltro = null;
        this.filtrar();
    }

    getFavoritos(){
        let favoritos: Actividad[] = null;
        if(this.listCronograma && this.listCronograma.length && this.favoritos && this.favoritos.length){
            let idsActividades: number[] = this.favoritos.filter(f => f.IdUsuario == this.idUsuario).map(f => f.IdActividad);
            favoritos = this.listCronograma.filter(act => idsActividades.indexOf(act.id) >= 0);
        }
        return favoritos;
    }

    cambiarVistaCompleta(){
        if(this.vistaCompleta){
            this.storage.get("favoritos").then(favoritos => {
                this.favoritos = favoritos;
                this.vistaCompleta = !this.vistaCompleta;
            });
        }
        else{
            this.vistaCompleta = !this.vistaCompleta;
        }
    }

}
