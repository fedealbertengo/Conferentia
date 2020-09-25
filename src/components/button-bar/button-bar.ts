import { Component } from '@angular/core';
import {GlobalService} from "../../shared/globalService";
import {ButtonBarEnabledElements} from "../../shared/dtoClasses";
import {RouterService} from "../../shared/routerService";
import {NavController} from "ionic-angular";

/**
 * Generated class for the ButtonBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'button-bar',
    templateUrl: 'button-bar.html'
})
export class ButtonBarComponent {

    buttonBarEnabledElements:ButtonBarEnabledElements= GlobalService.buttonBarElements;

    constructor(public navCtrl: NavController) {
    }

    goToCompetitions(){
        RouterService.goToCompetitions(this.navCtrl);
    }

    abrirWhatsapp(grupo?: string){


        if(grupo){
            window.open('https://chat.whatsapp.com/JfWoNc9nKETKLyQUpXs1Bz', '_system', 'location=yes');
            return false;
        }
        else{
            const numerosDeTelefono = [
                '5493434674222',
                '5493445532547'
            ];

            const randomNumber = Math.random() > 0.5 ? 0 : 1;
            window.open('https://wa.me/' + numerosDeTelefono[randomNumber], '_system', 'location=yes');
        }

        //FIXME: Reactivar este código para balanceo de carga
        // let numeroTelefono;
        // numeroTelefono = localStorage.getItem("NumeroOrganizador");
        // if(numeroTelefono == null || numeroTelefono == ""){
        //     let cargaTelefonoOrganizadores: Map<number, number> = new Map<number, number>();
        //     this.organizadorService.getCargaTelefono().subscribe(data => {
        //         if(data != null){
        //             if(Array.isArray(data)){
        //                 for(let carga of data){
        //                     cargaTelefonoOrganizadores.set(carga.id_organizer, carga.load);
        //                 }
        //             }
        //         }
        //     }, error => {
        //         alert(error);
        //     }, () => {
        //         numeroTelefono = this.organizadorService.getNumeroOrganizador(cargaTelefonoOrganizadores);
        //         if(numeroTelefono != null){
        //             localStorage.setItem("NumeroOrganizador", numeroTelefono);
        //             window.location.href='https://wa.me/' + numeroTelefono;
        //         }
        //         else{
        //             alert("Error, no hay ningún organizador disponible actualmente.")
        //         }
        //     });
        // }
        // else{
        //     window.location.href='https://wa.me/' + numeroTelefono;
        // }
    }

}
