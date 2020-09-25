import {Actividad, Favorito, Usuario} from "../../shared/dtoClasses";
import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {GlobalService} from "../../shared/globalService";
import {NavController, NavParams} from "ionic-angular";
import {RouterService} from "../../shared/routerService";
import {Storage} from '@ionic/storage';
import {TranslateService} from "@ngx-translate/core";
import {UsuarioService} from "../../shared/usuarioService";

@Component({
    selector: 'card-actividad',
    templateUrl: 'card-actividad.html',
})
export class CardActividadComponent implements AfterViewInit{

    @Input() actividad: Actividad;
    @Input() fullSize: boolean = false;
    @Input() showFavorite: boolean = true;

    esFavorito: boolean;
    idUsuario: number;
    showActivityId: boolean = false;
    meses: string[];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public translate: TranslateService) {
        let usuarioLogeado = UsuarioService.getUsuarioLogeado();
        this.idUsuario = usuarioLogeado ? usuarioLogeado.id : 0;
    }

    ngAfterViewInit(){
        if(this.actividad){
            this.storage.get("favoritos").then(favoritos => {
                if(favoritos) {
                    this.esFavorito = (favoritos.filter(fav => fav.IdUsuario == this.idUsuario && fav.IdActividad == this.actividad.id).length > 0);
                }
            });
        }
    }

    goToMapaCiudad = (actividad:Actividad) => RouterService.goToMapaCiudad(this.navCtrl, {marcador: actividad.lugar.marcador});
    goToEncuesta = (link: string) =>  {
        window.open(link, '_system', 'location=yes');
        return false;
    };

    // mostrarFechaActual =
    mostrarFechaActual = (actividad:Actividad):string => {

        const supportedLocales = {
          en: actividad.rawFecha.locale('en').format('MMMM') + ' ' + actividad.rawFecha.locale('en').format('DD'),
          es: actividad.rawFecha.locale('es').format('DD') + ' de ' + actividad.rawFecha.format('MMMM')
        };

        return supportedLocales[this.translate.defaultLang];
    };

    /**
     * Determina si la actividad clickeada en la lista del cronograma tiene o no vista detallada accesible
     * @param {number} idActividad
     * @returns {boolean}
     */
    tieneVistaDetallada(actividad:Actividad):boolean {
        return (actividad && (GlobalService.actividadesSinVistaDetallada.indexOf(actividad.tipoActividad.nombre) === -1 || !actividad.descripcion));
    }

    goToActividad(){
        if(!this.fullSize && this.tieneVistaDetallada(this.actividad)){
            RouterService.goToActividad(this.navCtrl, this.actividad.id);
        }
    }

    modificarFavorito(e){
        e.stopPropagation();
        this.storage.get("favoritos").then(favoritos => {
            let favorito: Favorito = { IdUsuario: this.idUsuario , IdActividad: this.actividad.id };
            if (favoritos) {
                if(!favoritos.filter(f => f.IdActividad == this.actividad.id).length){
                    favoritos.push(favorito);
                    this.storage.set("favoritos", favoritos);
                    this.esFavorito = true;
                } else {
                    if(favoritos.length > 1){
                        let indice = favoritos.indexOf(favoritos.filter(fav => fav.IdUsuario == this.idUsuario && fav.IdActividad == this.actividad.id)[0]);
                        favoritos.splice(indice, 1);
                        this.storage.set("favoritos", favoritos);
                        this.esFavorito = false;
                    }
                    else{
                        this.storage.remove("favoritos");
                        this.esFavorito = false;
                    }
                }
            } else {
                favoritos = [];
                favoritos.push(favorito);
                this.storage.set("favoritos", favoritos);
                this.esFavorito = true;
            }
        });
    }
}
