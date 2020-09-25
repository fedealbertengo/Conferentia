import { Component, ViewEncapsulation } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CompetitionService } from "../../shared/competition-service";
import {GlobalService} from "../../shared/globalService";

@IonicPage()
@Component({
  selector: "page-competitions",
  templateUrl: "competitions.html",
  encapsulation: ViewEncapsulation.None
})
export class CompetitionsPage {
  selectedCompetition: any;
  competitionStandings: any[] = [];
  private logoSource: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public competitionService: CompetitionService
  ) {}

  ngOnInit() {
    this.logoSource = `${GlobalService.imagesFolder}logo.png`;
  }

  //Ordena, usando el método sortStandings, de mayor cantidad de puntos a menor cada una de las posiciones de los equipos en una competencia
  filterStandingsByCompetition(competition) {
    this.competitionStandings = this.competitionService.standings
      .filter(Standing => Standing.competition === competition)
      .sort(this.sortStandings);
  }

  sortStandings(a: any, b: any) {
    const pointsA = a.points;
    const pointsB = b.points;

    if (pointsA > pointsB) {
      return -1;
    }
    if (pointsA < pointsB) {
      return 1;
    }

    return 0;
  }
}
