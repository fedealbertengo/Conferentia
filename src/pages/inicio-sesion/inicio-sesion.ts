import { Component } from "@angular/core";
import {LoadingController, NavController, NavParams} from "ionic-angular";
import { Usuario } from "../../shared/dtoClasses";
import { Storage } from "@ionic/storage";
import { GlobalService } from "../../shared/globalService";
import { UsuarioService } from "../../shared/usuarioService";
import { RouterService } from "../../shared/routerService";
import { TranslateService } from "@ngx-translate/core";
import { LoginService } from "../../shared/loginService";
import {Observable} from "rxjs/Rx";
import * as moment from "moment";
import {ActividadService} from "../../shared/actividadService";
import {DisertanteService} from "../../shared/disertanteService";
import {CompetitionService} from "../../shared/competition-service";
import {SponsorService} from "../../shared/sponsor.service";
import {DataBaseAccess} from "../../shared/databaseAccess";
import {Moment} from "moment";

@Component({
  selector: "page-inicio-sesion",
  templateUrl: "inicio-sesion.html",
  providers: [UsuarioService, GlobalService, LoginService, ActividadService, DisertanteService, SponsorService, CompetitionService, DataBaseAccess]
})
export class InicioSesionPage {
  nombreUsuario: string;
  contrasenia: string;

  tabBarElement: any;
  sideMenuElement: any;

  logoSource: string = `${GlobalService.imagesFolder}logo.png`;

  disertantesCargados: boolean = false;
  actividadesCargadas: boolean = false;
  sponsorsCargados: boolean = false;

  datosListos: boolean = false;

  actividadesTimestamp: Moment;
  disertantesTimestamp: Moment;
  sponsorsTimestamp: Moment;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public storage: Storage,
      private loginService: LoginService,
      public translate: TranslateService,
      public actividadService: ActividadService,
      public disertanteService: DisertanteService,
      public sponsorService: SponsorService,
      public competitionService: CompetitionService,
      public loadingCtrl: LoadingController
  ) {
    this.sideMenuElement = document.querySelector("#menu");
    this.tabBarElement = document.querySelector("#menu");
  }

  login(username: string, password: string) {

    if(username && password) {
      this.loginService.getUserAndActivities(username, password).then(
          ([user, activities]) => {
              if (user) {
                  GlobalService.jwt = user.JWT;
                  this.competitionService.cargarDatos();

                  this.compareDisertantesTimestamp();
                  this.compareSponsorsTimestamp();
                  let loaded: boolean = false;
                  let loading = this.loadingCtrl.create({
                      spinner: 'dots',
                      content: `
                          <div class="custom-spinner-container">
                            <div class="custom-spinner-box">Iniciando Sesión</div>
                          </div>
                        `
                  });
                  loading.present();
                  const cargarDataSources = Observable.interval(100).subscribe(() => {

                      if (this.disertantesCargados && !loaded) {
                          loaded = true;
                          this.compareActividadesTimestamp();
                      }

                      if (this.actividadesCargadas && this.sponsorsCargados) {
                          //if (this.splashScreen.hide()) cargarDataSources.unsubscribe();
                          cargarDataSources.unsubscribe()
                          let loggedUser: Usuario = this.loginService.assignActivities(
                              user.data,
                              activities.data
                          );

                          this.loginService.setAndStoreUser(loggedUser, password);

                          if (loggedUser.is_organizer !== 1 && loggedUser.assigned_activities) {
                              //TODO: Aplicar token para enviar notificaciones de usuario
                              // if(GlobalService.tokenNotif){
                              //     context.usuariosService.setTokenNotif(user.id, GlobalService.tokenNotif);
                              // }
                          }

                          //FIXME: Corregir caso para el guest
                          else if (loggedUser.is_organizer === 1 || loggedUser.is_organizer === 2) {
                              //TODO: Aplicar token para enviar notificaciones de usuario
                              // if(GlobalService.tokenNotif){
                              //     context.usuariosService.setTokenNotif(user.id, GlobalService.tokenNotif);
                              // }
                          }
                          loading.dismiss();
                          this.goToTabsPage({});
                      }

                  });
            }
            else{
              alert(this.translate.instant("Username or password is incorrect"));
            }
          }
      );
    }
    else{
      alert(this.translate.instant("Username or password is incorrect"));
    }

  }

  compareActividadesTimestamp() {
      const observableTimestamp = this.actividadService.getTimestamp();
      this.storage.get("actividades-timestamp").then(value => {
          this.actividadesTimestamp = value;

          const suscripcionTimestamp = observableTimestamp.subscribe(
              data => {
                  GlobalService.jwt = data.JWT;
                  let result = data.data;
                  const remoteTimestamp = moment(result);
                  if (this.actividadesTimestamp) {
                      const localTimeStamp = moment(this.actividadesTimestamp);

                      if (remoteTimestamp.isAfter(localTimeStamp)) {
                          this.actividadesTimestamp = result;
                          this.storage.set("actividades-timestamp", result);
                          this.getCronogramaFromRemote();
                      } else {
                          this.getCronogramaFromLocal();
                      }
                  } else {
                      this.actividadesTimestamp = result;
                      this.storage.set("actividades-timestamp", result);
                      this.getCronogramaFromRemote();
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

  compareDisertantesTimestamp() {
      const observableTimestamp = this.disertanteService.getTimestamp();
      this.storage.get("disertantes-timestamp").then(value => {
          this.disertantesTimestamp = value;

          const suscripcionTimestamp = observableTimestamp.subscribe(
              data => {
                  GlobalService.jwt = data.JWT;
                  let result = data.data;
                  const remoteTimestamp = moment(result);
                  if (this.disertantesTimestamp) {
                      const localTimestamp = moment(this.disertantesTimestamp);

                      if (remoteTimestamp.isAfter(localTimestamp)) {
                          this.disertantesTimestamp = result;
                          this.storage.set("disertantes-timestamp", result);
                          this.getDisertantesFromRemote();
                      } else {
                          this.getDisertantesFromLocal();
                      }
                  } else {
                      this.disertantesTimestamp = result;
                      this.storage.set("disertantes-timestamp", result);
                      this.getDisertantesFromRemote();
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

    compareSponsorsTimestamp() {
        const observableTimestamp = this.sponsorService.getTimestamp();
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
        const observableSponsors = this.sponsorService.getSponsorsFromJson();
        const suscripcionSponsors = observableSponsors.subscribe(
            data => {
                GlobalService.jwt = data.JWT;
                let result = data.data;
                if(result && result.length){
                    //this.sponsorService.sponsors = this.sponsorService.shuffle(result);
                    this.sponsorService.sponsors = result;
                    this.sponsorsCargados = true;
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
                //this.sponsorService.sponsors = this.sponsorService.shuffle(JSON.parse(value));
                this.sponsorService.sponsors = JSON.parse(value);
                this.sponsorsCargados = true;
            }
        });
    }

  getDisertantesFromLocal() {
      this.storage.get("disertantes").then(value => {
          if (value) {
              const parsedValue = JSON.parse(value);
              this.disertanteService.arrayDisertantes = this.disertanteService.generateDisertantes(
                  parsedValue
              );
              this.disertantesCargados = true;
          }
      });
  }

  //Datos cargados desde data sources
  getDisertantesFromRemote() {
      const observableDisertantes = this.disertanteService.getDisertantesFromJson();
      const suscripcionDisertantes = observableDisertantes.subscribe(
          data => {
              GlobalService.jwt = data.JWT;
              let result = data.data;
              this.disertanteService.arrayDisertantes = this.disertanteService.generateDisertantes(
                  result
              );
              this.disertantesCargados = true;
              this.storage.remove("disertantes");
              this.storage.set("disertantes", JSON.stringify(result));
              suscripcionDisertantes.unsubscribe();
          },
          error => {
              console.error(
                  "Error loading speakers and moderators from JSON data source file."
              );
              suscripcionDisertantes.unsubscribe();
          }
      );
  }

  getCronogramaFromLocal() {
      this.storage.get("actividades").then(value => {
          if (value) {
              const parsedValue = JSON.parse(value);
              ActividadService.cronogramaCompleto = this.actividadService.generateActividades(
                  parsedValue
              );
              ActividadService.cronogramaCompleto.sort(
                  ActividadService.ordenarActividades
              );
              this.actividadesCargadas = true;
          }
      });
  }

  /**
   * Obtiene el cronograma completo suscribiéndose al servicio de actividades
   */
  getCronogramaFromRemote() {
      const observableActividades = this.actividadService.getActividadesFromJson();
      const suscripcionActividades = observableActividades.subscribe(
          data => {
              GlobalService.jwt = data.JWT;
              let result = data.data;
              ActividadService.cronogramaCompleto = this.actividadService.generateActividades(
                  result
              );
              ActividadService.cronogramaCompleto.sort(
                  ActividadService.ordenarActividades
              );
              this.actividadesCargadas = true;
              this.storage.remove("actividades");
              this.storage.set("actividades", JSON.stringify(result));
              suscripcionActividades.unsubscribe();
          },
          error => {
              console.error("Error loading activities from JSON data source file.");
              suscripcionActividades.unsubscribe();
          }
      );
  }

  goToRegistro(params) {
    RouterService.goToRegistroPage(this.navCtrl, params);
  }

  goToTabsPage(params) {
    RouterService.goToTabsPage(this.navCtrl, params);
  }

  ionViewWillEnter() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = "none";
    }
    if (this.sideMenuElement) {
      this.sideMenuElement.style.display = "none";
    }
  }

  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = "";
    }
    if (this.sideMenuElement) {
      this.sideMenuElement.style.display = "";
    }
  }
}
