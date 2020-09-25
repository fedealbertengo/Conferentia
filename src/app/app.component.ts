import { AboutPage } from "../pages/about/about";
import { AreasTematicasPage } from "../pages/areas-tematicas/areas-tematicas";
import { AsistenciaPage } from "../pages/asistencia/asistencia";
import { ChairsPage } from "../pages/chairs/chairs";
import { Component, ViewChild } from "@angular/core";
import { DataBaseAccess } from "../shared/databaseAccess";
import { DisertantesPage } from "../pages/disertantes/disertantes";
import { GlobalService } from "../shared/globalService";
import { InicioPage } from "../pages/inicio/inicio";
import { LocalizacionPage } from "../pages/localizacion/localizacion";
import { MiCronogramaPage } from "../pages/mi-cronograma/mi-cronograma";
import { Nav, Platform } from "ionic-angular";
import { NotificacionesService } from "../shared/notificacionesService";
import { OneSignal } from "@ionic-native/onesignal";
import { PageInterface, Usuario } from "../shared/dtoClasses";
import { ProximaActividadPage } from "../pages/proxima-actividad/proxima-actividad";
import { RouterService } from "../shared/routerService";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SponsorsPage } from "../pages/sponsors/sponsors";
import { StatusBar } from "@ionic-native/status-bar";
import { Storage } from "@ionic/storage";
import { TabsPage } from "../pages/tabs-controller/tabs-controller";
import { TranslateService } from "@ngx-translate/core";
import { UsuarioService } from "../shared/usuarioService";
import { SettingsPage } from "../pages/settings/settings";
import { ActividadService } from "../shared/actividadService";
import { Observable } from "rxjs";
import { DisertanteService } from "../shared/disertanteService";
import * as moment from "moment";
import { Moment } from "moment";
import { LoginService } from "../shared/loginService";
import { SponsorService } from "../shared/sponsor.service";
import {CompetitionService} from "../shared/competition-service";
import {CompetitionsPage} from "../pages/competitions/competitions";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
    templateUrl: "app.html",
    providers: [DataBaseAccess, LoginService, SponsorService, UsuarioService, CompetitionService]
})
export class MyApp {
    @ViewChild(Nav) navCtrl: Nav;

    primerPlano: boolean = false;
    callbackAlLogear = null;

    disertantesCargados: boolean = false;
    actividadesCargadas: boolean = false;

    sponsorsTimestamp: Moment;
    sponsorsCargados: boolean = false;

    datosListos: boolean = false;

    //TODO: Traer esta lista de propiedades desde un lugar único, en un servicio, para alimentar la tabBar y el menú.
    sideMenuPages: PageInterface[] = [
        {
            title: "Home",
            name: "InicioPage",
            component: TabsPage,
            tabComponent: InicioPage,
            index: 0,
            icon: "home",
            isImplemented: false
        },
        {
            title: "Schedule",
            name: "MiCronogramaPage",
            component: TabsPage,
            tabComponent: MiCronogramaPage,
            index: 1,
            icon: "calendar",
            isImplemented: false
        },
        {
            title: "Assistance",
            name: "AsistenciaPage",
            component: TabsPage,
            tabComponent: AsistenciaPage,
            index: 2,
            icon: "qr-scanner",
            isImplemented: true
        },
        {
            title: "Next Activity",
            name: "ProximaActividadPage",
            component: TabsPage,
            tabComponent: ProximaActividadPage,
            index: 3,
            icon: "clock",
            isImplemented: false
        },
        {
            title: "Speakers",
            name: "DisertantesPage",
            component: TabsPage,
            tabComponent: DisertantesPage,
            index: 4,
            icon: "people",
            isImplemented: false
        },
        {
            title: "Comité Organizador",
            name: "ChairsPage",
            component: TabsPage,
            tabComponent: ChairsPage,
            index: 5,
            icon: "school",
            isImplemented: true
        },
        {
            title: "Localization",
            name: "LocalizacionPage",
            component: TabsPage,
            tabComponent: LocalizacionPage,
            index: 6,
            icon: "pin",
            isImplemented: false
        },
        {
            title: "Settings",
            name: "SettingsPage",
            component: TabsPage,
            tabComponent: SettingsPage,
            index: 7,
            icon: "cog",
            isImplemented: true
        },
        {
            title: "About...",
            name: "AboutPage",
            component: TabsPage,
            tabComponent: AboutPage,
            index: 8,
            icon: "information",
            isImplemented: false
        },
        {
            title: "Sessions",
            name: "AreasTematicasPage",
            component: TabsPage,
            tabComponent: AreasTematicasPage,
            index: 9,
            icon: "information",
            isImplemented: false
        },
        {
            title: "Sponsors",
            name: "SponsorsPage",
            component: TabsPage,
            tabComponent: SponsorsPage,
            index: 10,
            icon: "information",
            isImplemented: false
        },
        {
            title: "Competitions",
            name: "CompetitionsPage",
            component: TabsPage,
            tabComponent: CompetitionsPage,
            index: 11,
            icon: "trophy",
            isImplemented: true
        }
    ];

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        public splashScreen: SplashScreen,
        private oneSignal: OneSignal,
        public storage: Storage,
        public translate: TranslateService,
        public actividadService: ActividadService,
        public disertanteService: DisertanteService,
        public loginService: LoginService,
        public sponsorService: SponsorService,
        public competitionService: CompetitionService,
        public httpClient: HttpClient) {
        this.sideMenuPages.forEach(
            Page => (Page.isImplemented = GlobalService.pageAccessEnabled[Page.name])
        );
        this.sideMenuPages = this.sideMenuPages.filter(Page => Page.isImplemented);

        //Idioma por default
        translate.setDefaultLang("es");

        //Carga el idioma seleccionado, si es que éste existe en el LocalStorage
        storage.get("language").then(value => {
            if (value) {
                translate.use(value);
            } else {
                translate.use("es");
                storage.set("language", "es");
            }
        });

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();

            if (platform.is("cordova")) {
                this.oneSignalInitializer();
            }

            this.loginHandler();
        });
    }

    /**
     * Determina el tipo de inicio de sesión de la aplicación, discriminando en base a la configuración
     * global si es que la aplicación usa un formulario de login o permite al usuario acceder directamente
     * al uso de las funcionalidades sin identificación
     */
    loginHandler() {
        if (GlobalService.usaInicioSesion) {
            Promise.all([
                this.storage.get("username"),
                this.storage.get("password")
            ]).then(([user, password]) => {
                if (user && password) {
                    this.logear(user, password);
                } else {
                    this.splashScreen.hide();
                    this.datosListos = true;
                    RouterService.goToInicioSesionPage(this.navCtrl, {});
                }
            });
        } else {
            this.splashScreen.hide();
            this.datosListos = true;
            RouterService.goToTabsPage(this.navCtrl, {});
        }
    }

    /**
     * Usado para gestionar el envío de notificaciones a la aplicación
     */
    oneSignalInitializer() {
        this.oneSignal.startInit(
            NotificacionesService.appId,
            NotificacionesService.senderId
        );
        this.oneSignal.inFocusDisplaying(
            this.oneSignal.OSInFocusDisplayOption.Notification
        );
        this.oneSignal.handleNotificationReceived().subscribe(data => {});

        this.oneSignal.handleNotificationOpened().subscribe(data => {
            let datos: any = data;
            this.primerPlano = GlobalService.primerPlano;
            if (
                datos &&
                datos.notification &&
                datos.notification.payload &&
                datos.notification.payload.additionalData
            ) {
                let informacion: string = datos.notification.payload.additionalData;

                this.callbackAlLogear = () => {
                    if (informacion.indexOf("idActividad") >= 0) {
                        let idActividad: number = Number(
                            informacion.replace("idActividad=", "")
                        );
                        RouterService.goToActividad(this.navCtrl, { id: idActividad });
                    } else {
                        RouterService.goToTabsPage(this.navCtrl, {});
                    }
                };

            }
        });

        this.oneSignal.endInit();

        this.oneSignal.getIds().then(ids => {});
    }

    logear(username: string, password: string) {
        if (username && password) {
            this.loginService
                .getUserAndActivities(username, password)
                .then(([user, activities]) => {
                    if (user) {
                        GlobalService.jwt = user.JWT;
                        this.competitionService.cargarDatos();

                        this.compareDisertantesTimestamp();
                        this.compareSponsorsTimestamp();
                        let loaded: boolean = false;

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
                                if (loggedUser) {
                                    this.loginService.setAndStoreUser(loggedUser, password);

                                    //TODO: Aplicar token para enviar notificaciones de usuario
                                    // if(GlobalService.tokenNotif){
                                    //     context.usuariosService.setTokenNotif(usuarios[0].id, GlobalService.tokenNotif);
                                    // }

                                    this.splashScreen.hide();
                                    this.datosListos = true;
                                    RouterService.goToTabsPage(this.navCtrl, {});
                                } else {
                                    this.splashScreen.hide();
                                    this.datosListos = true;
                                    this.loginService.removeUserCredentialsFromStorage();
                                }
                            }

                        });
                    }
                    else{
                        this.splashScreen.hide();
                        this.datosListos = true;
                    }
                });
        } else {
            this.splashScreen.hide();
            this.datosListos = true;
        }
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

    private openPage(page: PageInterface) {
        let params = {};

        // the nav component was found using @ViewChild(Nav)
        // setRoot on the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            params = { tabIndex: page.index };
        }

        // If we are already on tabs just change the selected tab
        // don't setRoot again, this maintains the history stack of the
        // tabs even if changing them from the menu
        if (this.navCtrl.getActiveChildNavs().length && page.index != undefined) {
            this.navCtrl.getActiveChildNavs()[0].select(page.index);
            // Set the root of the navCtrl with params if it's a tab index
        } else {
            this.navCtrl.setRoot(page.tabComponent, params).catch((err: any) => {
                console.log(`Didn't set navCtrl root: ${err}`);
            });
        }
    }

    private isPageActive(page: PageInterface) {
        let childNav = this.navCtrl.getActiveChildNavs()[0];

        // Tabs are a special case because they have their own navigation
        if (childNav) {
            if (
                childNav.getSelected() &&
                childNav.getSelected().root === page.component
            ) {
                return "primary";
            }
            return;
        }

        if (
            this.navCtrl.getActive() &&
            this.navCtrl.getActive().name === page.name
        ) {
            return "primary";
        }
        return;
    }

    ngOnInit() {

    }

    actividadesTimestamp: Moment;
    disertantesTimestamp: Moment;

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
}
