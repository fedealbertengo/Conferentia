import {NgModule} from '@angular/core';
import {SponsorComponent} from './sponsor/sponsor';
import {IonicModule} from "ionic-angular";
import {CommonModule} from "@angular/common";
import {ButtonBarComponent} from './button-bar/button-bar';
import {CardActividadComponent} from './card-actividad/card-actividad';
import {CardDisertanteComponent} from './card-disertante/card-disertante';
import {TranslateModule} from "@ngx-translate/core";
import { HeaderBarComponent } from './header-bar/header-bar';
import { AssistanceCounterComponent } from './assistance-counter/assistance-counter';
import {CardDiaOcupadoComponent} from "./card-dia-ocupado/card-dia-ocupado";

@NgModule({
    declarations:
        [
            ButtonBarComponent,
            CardActividadComponent,
            SponsorComponent,
            CardDisertanteComponent,
            CardDiaOcupadoComponent,
            HeaderBarComponent,
            AssistanceCounterComponent
        ],
    imports:
        [
            CommonModule,
            IonicModule,
            TranslateModule
        ],
    exports:
        [
            ButtonBarComponent,
            CardActividadComponent,
            SponsorComponent,
            CardDisertanteComponent,
            CardDiaOcupadoComponent,
            HeaderBarComponent,
            AssistanceCounterComponent
        ]
})
export class ComponentsModule {}
