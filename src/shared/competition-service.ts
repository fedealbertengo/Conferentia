import {Observable} from "rxjs";
import {GlobalService} from "./globalService";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Team} from "./dtoClasses";
import {Injectable} from "@angular/core";

@Injectable()
export class CompetitionService {

    private _competitions = [];
    private _standings = [];

    public constructor(private http: HttpClient) {
        this.cargarDatos();
    }

    get competitions(): any[] {
        return this._competitions;
    }

    set competitions(value: any[]) {
        this._competitions = value;
    }

    get standings(): any[] {
        return this._standings;
    }

    set standings(value: any[]) {
        this._standings = value;
    }

    getStandingsByCompetition(competition: string) {
    }

    getTeams(){

    }

    public cargarDatos(){
        this.getData().toPromise().then((result) => {
            GlobalService.jwt = result.JWT;
            let CompetitionData = result.data;
            this.standings = CompetitionData.standings;
            this.competitions = CompetitionData.competitions;
        }).catch(error => {

        });
    }

    public getData(): Observable<any>{
        const url = GlobalService.webApiLocation + 'competition.php';
        let params = new HttpParams().set('action', 'getData').set('jwt', GlobalService.jwt);
        return this.http.get(url, {params: params});
    }

}

export class Standings {
    team: Team;
    competition: string;
    points: number;
}
