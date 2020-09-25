
import {Component, ViewChild} from "@angular/core";
import {RouterService} from "../../shared/routerService";
import {Sponsor} from "../../shared/dtoClasses";
import {NavController, Slides} from "ionic-angular";
import {GlobalService} from "../../shared/globalService";
import {SponsorService} from "../../shared/sponsor.service";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the SponsorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    providers: [SponsorService],
    selector: "sponsor",
    templateUrl: "sponsor.html"
})
export class SponsorComponent {
    @ViewChild("slides") slides: Slides;
    private imagePath = "";

    constructor(
        public navCtrl: NavController,
        public sponsorService: SponsorService,
        public storage: Storage
    ) {
        this.imagePath = GlobalService.sponsorsFolder;
    }

    ngAfterViewInit() {
        if (this.slides) {
            this.slides.noSwiping = true;
            this.slides.autoplayDisableOnInteraction = false;
        }
    }

    navigateToSponsors(params) {
        if (GlobalService.sponsorsConVistaDetallada) {
            RouterService.goToSponsors(this.navCtrl, params);
        }
    }
}
