import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActionSheetController, NavController, NavParams, Platform, PopoverController} from 'ionic-angular';
import { Marcador } from "../../shared/dtoClasses";
import { MarcadorService } from "../../shared/marcadorService";
import {TipoMarcador} from "../../shared/dtoClasses";

import { Geolocation } from '@ionic-native/geolocation';
import {TranslateService} from "@ngx-translate/core";

declare var google;

const styles : string[] = ['./mapa-ciudad.scss'];

@Component({
    selector: 'page-mapa-ciudad',
    styles: styles,
    templateUrl: 'mapa-ciudad.html',
    providers: [MarcadorService]
})
export class MapaCiudadPage{

    DEFAULT_LATITUDE: number = 0.0;
    DEFAULT_LONGITUDE: number = 0.0;

    marcadores: Marcador[] = [];
    map;
    viewMode: string = "list";
    searchKey: string = "";
    tiposMarcadores: TipoMarcador[] = [];
    marcadorService: MarcadorService;
    rubros: string[] = [];

    textoFiltroRubros = "";

    constructor(public navCtrl: NavController,
                public platform: Platform,
                ms: MarcadorService,
                public navParams: NavParams,
                public geolocation: Geolocation,
                public actionsheetCtrl: ActionSheetController,
                public popoverCtrl: PopoverController,
                public translate: TranslateService) {
        this.marcadorService = ms;
        if(navParams.get('marcador') != null){
            this.abrirMarcador(navParams.get('marcador'));
        }

        this.textoFiltroRubros = this.translate.instant('Place types');

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

    public ngOnInit(): void {
        this.getDataMarcadores();
        this.getDataTipoMarcadores();
    }

    obtenerMarcadores(tipoMarcador: TipoMarcador): Marcador[]{
        var marcadoresFilt: Marcador[] = this.marcadores.filter(marcador => marcador.tipoMarcador.nombre === tipoMarcador.nombre).sort(function(a,b){
            if(a.distancia >= b.distancia){
                return 1;
            }
            else{
                return -1;
            }
        });
        return marcadoresFilt;
    }

    onInput(event) {
        this.getDataMarcadores();
        var marcadoresFilt: Marcador[] = this.marcadores.filter(marcador => marcador.titulo.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0 || marcador.tipoMarcador.nombre.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0 || marcador.tipoMarcador.palabrasClaves.filter(pc => pc.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0).length > 0 );
        this.marcadores = marcadoresFilt;
        this.marcadorService.actualizarDistancias(marcadoresFilt, this.geolocation);
        this.marcadores = this.marcadores.sort(function(a,b){
            if(a.distancia >= b.distancia){
                return 1;
            }
            else{
                return -1;
            }
        });

        if(this.viewMode === "map"){
            this.mostrarMarcadores();
        }
    }

    filtrarRubro(rubro: string){
        this.getDataMarcadores();
        var marcadoresFilt: Marcador[] = this.marcadores.filter(marcador => marcador.titulo.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0 || marcador.tipoMarcador.nombre.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0 || marcador.tipoMarcador.palabrasClaves.filter(pc => pc.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0).length > 0 );
        if(rubro != null){
            this.textoFiltroRubros = rubro;
            marcadoresFilt = marcadoresFilt.filter(marcador => marcador.tipoMarcador.nombre.toLowerCase() == rubro.toLowerCase());
        }
        else{
            this.textoFiltroRubros = this.translate.instant('Place types');
        }
        this.marcadores = marcadoresFilt;
        this.marcadorService.actualizarDistancias(marcadoresFilt, this.geolocation);
        this.marcadores = this.marcadores.sort(function(a,b){
            if(a.distancia >= b.distancia){
                return 1;
            }
            else{
                return -1;
            }
        });
    }

    obtenerTiposMarcadores(): TipoMarcador[]{
        var tiposFilt: TipoMarcador[] = this.tiposMarcadores.filter(tipoMarc => (tipoMarc.nombre.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0 || tipoMarc.palabrasClaves.filter(pc => pc.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0).length > 0));
        if(!tiposFilt.length){
            tiposFilt = this.tiposMarcadores;
            this.rubros = this.tiposMarcadores.map(tip => tip.nombre);
        }
        return tiposFilt;
    }

    getDataTipoMarcadores(){
        this.tiposMarcadores = this.marcadorService.getTipoMarcadores();
        this.rubros = this.tiposMarcadores.map(tip => tip.nombre);
    }

    getDataMarcadores(){
        this.marcadores = this.marcadorService.getMarcadores();
        this.marcadorService.actualizarDistancias(this.marcadores, this.geolocation);
        this.marcadores = this.marcadores.sort(function(a,b){
            if(a.distancia >= b.distancia){
                return 1;
            }
            else{
                return -1;
            }
        });
    }

    addMarker(marcador: Marcador){
        let marker;
        if(marcador.imagenUrl || marcador.tipoMarcador.icono){
            let icono = {
                url: marcador.imagenUrl ? marcador.imagenUrl : marcador.tipoMarcador.icono,
                size: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                icon: icono,
                position: new google.maps.LatLng(marcador.latitud, marcador.longitud)
            });
        }
        else{
            marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(marcador.latitud, marcador.longitud)
            });
        }
        let content = "<h4>" + marcador.titulo + "</h4>";
        this.addInfoWindow(marker, content);
    }

    addInfoWindow(marker, content){

        let infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });

    }

    mostrarMapa(marcador: Marcador){
        this.viewMode = 'map';
        this.geolocation.getCurrentPosition().then((position) => {
            let mapObj = document.getElementById("map");
            this.map = new google.maps.Map(mapObj);
            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            this.map.setZoom(18);
            this.map.setCenter(latLng);
            this.mostrarMarcadores();
            if(marcador){
                let latLng = new google.maps.LatLng(marcador.latitud, marcador.longitud);
                this.map.setCenter(latLng);
            }
        });
    }

    mostrarLista(){
        this.viewMode = "list";
    }

    mostrarMarcadores(){
        for(let marcador of this.marcadores){
            if(marcador.marcadorEspecial){
                this.addMarker(marcador);
            }
            else{
                if(marcador.idMarcador == 150){
                    alert(JSON.stringify(marcador));
                }
            }
        }
    }

    abrirMarcador(marcador: Marcador){
        this.mostrarMapa(marcador);
    }

    private abrirMenuFiltroRubro() {
        let actionSheet = this.actionsheetCtrl.create({
            title: this.translate.instant('Pick an activity type') + ': ',
            cssClass: 'action-sheets-basic-page',
            buttons: this.generateRubrosObjects()
        });
        actionSheet.present();
    }

    private generateRubrosObjects(){

        let tiposActividadesObjects:any = [];

        for(let rubro of this.rubros){
            tiposActividadesObjects.push(
                {
                    text: this.translate.instant(rubro),
                    role: this.translate.instant('Filter') +" - " + rubro,
                    icon: 'arrow-dropright-circle',
                    handler: () =>{
                        this.filtrarRubro(rubro);
                    }
                }
            )
        }

        tiposActividadesObjects.push(
            {
                text: this.translate.instant('See All'),
                role: 'cancel', // will always sort to be on the bottom
                icon: !this.platform.is('ios') ? 'calendar' : null,
                handler: () => {
                    this.filtrarRubro(null);
                }
            });

        return tiposActividadesObjects;
    }

}
