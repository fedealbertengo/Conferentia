import {Component, Input} from '@angular/core';
import {Disertante} from "../../shared/dtoClasses";
import {RouterService} from "../../shared/routerService";
import {NavController, NavParams} from "ionic-angular";

/**
 * Generated class for the CardDisertanteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'card-disertante',
    templateUrl: 'card-disertante.html'
})
export class CardDisertanteComponent {

    @Input() disertante: Disertante;
    @Input() fullSize: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams) {

    }

    goToDisertante = (params:any) =>
    {
        if(!this.fullSize){
            RouterService.goToDisertante(this.navCtrl, params)
        }
    }

}
