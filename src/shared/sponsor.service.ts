import * as moment from "moment";
import {Moment} from "moment";
import {Component} from "@angular/core";
import {GlobalService} from "./globalService";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sponsor} from "./dtoClasses";
import {Storage} from "@ionic/storage";

@Component({
  providers: []
})
export class SponsorService {
  private _sponsors: Sponsor[] = [];
  public sponsorsTimestamp: Moment;
  public sponsorsLoaded: boolean = false;

  constructor(public http: HttpClient, public storage: Storage) {
    this.sponsors = [];
    this.compareSponsorsTimeStamp();
  }

  set sponsors(sponsors) {
    this._sponsors = sponsors;
  }

  get sponsors() {
    return this._sponsors;
  }

  getTimestamp(): Observable<any> {
    const url = GlobalService.webApiLocation + "sponsors.php";
    let params = new HttpParams().set("action", "getTimestamp").set('jwt', GlobalService.jwt);
    return this.http.get(url, { params: params });
  }

  getSponsorsFromJson(): Observable<any> {
    const url = GlobalService.webApiLocation + "sponsors.php";
    let params = new HttpParams().set("action", "getSponsors").set('jwt', GlobalService.jwt);
    return this.http.get(url, { params: params });
  }

  shuffle(array: any[]): any[] {
    let i = 0,
        j = 0,
        temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  compareSponsorsTimeStamp() {
    const observableTimestamp = this.getTimestamp();
    this.storage.get("sponsors-timestamp").then(value => {
      this.sponsorsTimestamp = value;

      const suscripcionTimestamp = observableTimestamp.subscribe(
          data => {
            GlobalService.jwt = data.JWT;
            let result = data.data;
            const remoteTimestamp = moment(result);
            if (this.sponsorsTimestamp) {
              const localTimestamp = moment(this.sponsorsTimestamp);

              if (remoteTimestamp.isAfter(localTimestamp)) {
                this.sponsorsTimestamp = result;
                this.storage.set("sponsors-timestamp", result);
                this.getSponsorsFromRemote();
              } else {
                this.getSponsorsFromLocal();
              }
            } else {
              this.sponsorsTimestamp = result;
              this.storage.set("sponsors-timestamp", result);
              this.getSponsorsFromRemote();
            }

            suscripcionTimestamp.unsubscribe();
          },
          error => {
            console.error(
                "Error loading last timestamp from JSON data source file."
            );
            suscripcionTimestamp.unsubscribe();
          }
      );
    });
  }

  getSponsorsFromRemote() {
    const observableSponsors = this.getSponsorsFromJson();
    const suscripcionSponsors = observableSponsors.subscribe(
        data => {
          GlobalService.jwt = data.JWT;
          let result = data.data;
          if(result && result.length){
              this.sponsors = this.shuffle(result);
              this.sponsorsLoaded = true;
              this.storage.remove("sponsors");
              this.storage.set("sponsors", JSON.stringify(result));
          }
          suscripcionSponsors.unsubscribe();
        },
        error => {
          console.error(
              "Error loading speakers and moderators from JSON data source file."
          );
          suscripcionSponsors.unsubscribe();
        }
    );
  }

  getSponsorsFromLocal() {
    this.storage.get("sponsors").then(value => {
      if (value) {
        this.sponsors = this.shuffle(JSON.parse(value));
        this.sponsorsLoaded = true;
      }
    });
  }

}
