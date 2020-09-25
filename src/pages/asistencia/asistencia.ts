import { Component } from "@angular/core";
import { AlertController, NavController, Platform } from "ionic-angular";
import { UsuarioService } from "../../shared/usuarioService";
import { Actividad, Asistencia, Usuario } from "../../shared/dtoClasses";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { GlobalService } from "../../shared/globalService";
import { ActividadService } from "../../shared/actividadService";
import { AsistenciaService } from "../../shared/asistenciaService";
import { DataBaseAccess } from "../../shared/databaseAccess";
import * as moment from "moment";
import { Moment } from "moment";
import { AlertasService } from "../../shared/alertasService";
import { Observable } from "rxjs";

@Component({
  selector: "page-asistencia",
  templateUrl: "asistencia.html",
  providers: [UsuarioService, DataBaseAccess]
})
export class AsistenciaPage {
  createdCode = null;
  usuarioLogeado: Usuario;
  actividades: Actividad[];
  actividadService: ActividadService;
  asistenciaService: AsistenciaService;
  usuariosService: UsuarioService;

  actividad: any;
  entradaSalida: any;

  cronogramaCompleto: Actividad[] = [];
  actividadesCargadas: boolean = false;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private barcodeScanner: BarcodeScanner,
    as: ActividadService,
    ass: AsistenciaService,
    us: UsuarioService,
    public alertCtrl: AlertController
  ) {
    this.usuarioLogeado = UsuarioService.getUsuarioLogeado();
    this.asistenciaService = ass;
    this.actividadService = as;
    this.usuariosService = us;

    if(this.usuarioLogeado){
        if (this.usuarioLogeado.is_organizer) {
            this.cargarActividades();
        }
        if (
            !this.usuarioLogeado.is_organizer
        ) {
            this.createCode();
        }
    }

    //Este bloque de código permite evitar el comportamiento
    // que deriva el footer de tabs ocultándose.
    platform.registerBackButtonAction(() => {
      if (navCtrl.canGoBack()) {
        // CHECK IF THE USER IS IN THE ROOT PAGE.
        navCtrl.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
      } else {
        platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
      }
    });
  }

  ionViewWillEnter() {
    this.getCronogramaCompleto();
    if(this.usuarioLogeado){
        if (this.usuarioLogeado.is_organizer) {
            const cargarActividadesSubscription = Observable.interval(100).subscribe(
                () => {
                    if (this.actividadesCargadas) {
                        this.cargarActividades();
                        cargarActividadesSubscription.unsubscribe();
                    }
                }
            );
        }
        if (
            !this.usuarioLogeado.is_organizer
        ) {
            this.createCode();
        }
    }
  }

  /**
   * Obtiene el cronograma completo suscribiéndose al servicio de actividades
   */
  getCronogramaCompleto() {
    const observableActividades = this.actividadService.getActividadesFromJson();
    const suscripcionActividades = observableActividades.subscribe(
      data => {
        GlobalService.jwt = data.JWT;
        let result = data.data;
        this.cronogramaCompleto = this.actividadService.generateActividades(
          result
        );
        this.cronogramaCompleto.sort(ActividadService.ordenarActividades);
        this.actividadesCargadas = true;
        suscripcionActividades.unsubscribe();
      },
      error => {
        console.error("Error loading activities from JSON data source file.");
        suscripcionActividades.unsubscribe();
      }
    );
  }

  cargarActividades() {
    const actividadesParaAsistencia = [
      "Charla",
      "Charla Magistral",
      "Visita Técnica",
      "Taller",
      "Acreditaciones"
    ];
    this.entradaSalida = true;
    this.actividades = this.cronogramaCompleto;

    this.actividades = this.actividades.filter(
      Actividad =>
        Actividad.cuentaAsistencia ||
        (Actividad.cuentaAsistencia === undefined &&
          actividadesParaAsistencia.indexOf(Actividad.tipoActividad.nombre) !==
            -1)
    );

    //Valida si hay límite temporal para el registro de la asistencia (entrada o salida) de las actividades, según el horario de cada una
    if (
      GlobalService.minimumAssistanceRequired &&
      GlobalService.assistanceWithTimeFrame
    ) {
      this.actividades = this.actividades.filter(Actividad =>
        this.chequearValidezAsistencia(Actividad)
      );
    }

    this.actividades.sort(ActividadService.ordenarActividades);
  }

  /**
   * Se encarga de determinar si una actividad dada está dentro del intervalo válido para que pueda tomarse asistencia
   * sobre la misma. Cuenta con un margen de media hora antes del comienzo de la actividad y 15 minutos después del
   * término en caso de cualquier eventualidad.
   * @param {Actividad} actividad
   * @returns {boolean}
   */
  chequearValidezAsistencia(actividad: Actividad): boolean {
    const currentDateTime = moment();
    let asistenciaStart: Moment;
    let asistenciaEnd: Moment;

    asistenciaStart = moment(actividad.rawFecha).subtract(1, "hours");
    asistenciaEnd = moment(actividad.rawFecha).add(
      actividad.duracion + 1,
      "hours"
    );

    return (
      currentDateTime.isSameOrAfter(asistenciaStart) &&
      currentDateTime.isSameOrBefore(asistenciaEnd)
    );
  }

  createCode() {
    this.createdCode = this.usuarioLogeado.registration_id.toString();
  }

  realizarAsistencia(
    registrationId: string,
    idActividad: number,
    entrada: boolean
  ) {
    let mensaje: string = "";
    let titulo: string = "";
    let err: boolean;
    let usuario: Usuario;
    let yaRegistrado: boolean = false;
    let actividadesAsignadas: any[] = [];
    err = true;
    this.usuariosService.getUsuarioByRegistrationId(registrationId).subscribe(
      result => {
          GlobalService.jwt = result.JWT;
          let data = result.data;
        if (data != null) {
          if (Array.isArray(data)) {
            if (data.length) {
              usuario = data[0];
              err = false;
            }
          }
        }
      },
      error => {
        err = true;
        titulo = "Se ha producido un error";
        mensaje = error;
      },
      () => {
        if (!err && usuario) {
          this.usuariosService
            .getActividadesAsignadasUsuario(usuario.id)
            .subscribe(
              result => {
                  GlobalService.jwt = result.JWT;
                  let data = result.data;
                  if (data != null) {
                  if (Array.isArray(data)) {
                    if (data.length) {
                      actividadesAsignadas = data;
                    }
                  }
                }
              },

              error => {
                err = true;
                titulo = "Se ha producido un error";
                mensaje = error;
              },
              () => {
                if (!err) {
                  if (
                    usuario // ! FIXME: Corregir este problema de asignaciones, para también incluir las actividades generales
                    // usuario &&
                    // actividadesAsignadas &&
                    // actividadesAsignadas.length &&
                    // actividadesAsignadas.filter(
                    //   act => act.id_activity == idActividad
                    // ).length
                  ) {
                    this.asistenciaService
                      .obtenerAsistencias(usuario.id, idActividad, null)
                      .subscribe(
                        result => {
                          GlobalService.jwt = result.JWT;
                          let data = result.data;
                          if (data && Array.isArray(data) && data.length) {
                            let entradas: Asistencia[] = data.filter(
                              Asistencia => Asistencia.concept === "Entrada"
                            );
                            let salidas: Asistencia[] = data.filter(
                              Asistencia => Asistencia.concept === "Salida"
                            );

                            if (entrada) {
                              if (
                                entradas.length >= 1 &&
                                salidas.length < entradas.length
                              ) {
                                yaRegistrado = true;
                              }
                            } else {
                              if (
                                entradas.length >= 1 &&
                                salidas.length >= 1 &&
                                entradas.length < salidas.length
                              ) {
                                yaRegistrado = true;
                              }
                            }
                          }
                        },
                        error => {
                          err = true;
                          titulo = "Se ha producido un error";
                          mensaje = error;
                        },
                        () => {
                          if (!err) {
                            if (!yaRegistrado && usuario) {
                              this.asistenciaService
                                .registrarAsistencia(
                                  usuario.id,
                                  idActividad,
                                  entrada
                                )
                                .subscribe(
                                  result => {
                                    GlobalService.jwt = result.JWT;
                                    let data = result.data;
                                    if (
                                      data != "No hay resultados" &&
                                      data != "Se ha ejecutado correctamente"
                                    ) {
                                      titulo = "Se ha producido un error";
                                      mensaje = data;
                                      err = true;
                                    }
                                  },
                                  error => {
                                    titulo = "Se ha producido un error";
                                    mensaje = error;
                                    err = true;
                                  },
                                  () => {
                                    if (!err) {
                                      titulo =
                                        "Asistencia tomada correctamente";
                                      mensaje =
                                        "Nombre y Apellido: " +
                                        usuario.first_name +
                                        " " +
                                        usuario.last_name +
                                        "\nDNI: " +
                                        usuario.dni;
                                    }
                                    AlertasService.mostrarMensaje(
                                      titulo,
                                      mensaje,
                                      "Cerrar",
                                      "alertaCorrecto",
                                      this.alertCtrl
                                    );
                                  }
                                );
                            } else {
                              titulo = "Se ha producido un error";
                              mensaje =
                                "Alerta, ya se ha registrado la " +
                                (entrada ? "Entrada" : "Salida") +
                                " del usuario " +
                                usuario.first_name +
                                " " +
                                usuario.last_name +
                                " en esta actividad anteriormente.";
                              AlertasService.mostrarMensaje(
                                titulo,
                                mensaje,
                                "Cerrar",
                                "alertaError",
                                this.alertCtrl
                              );
                            }
                          } else {
                            AlertasService.mostrarMensaje(
                              titulo,
                              mensaje,
                              "Cerrar",
                              "alertaError",
                              this.alertCtrl
                            );
                          }
                        }
                      );
                  } else {
                    titulo = "Se ha producido un error";
                    mensaje =
                      "Alerta, el asistente no está registrado en la actividad o debe ingresar por otra entrada.";
                    AlertasService.mostrarMensaje(
                      titulo,
                      mensaje,
                      "Cerrar",
                      "alertaError",
                      this.alertCtrl
                    );
                  }
                } else {
                  AlertasService.mostrarMensaje(
                    titulo,
                    mensaje,
                    "Cerrar",
                    "alertaError",
                    this.alertCtrl
                  );
                }
              }
            );
        } else {
          titulo = "Se ha producido un error";
          mensaje = "No se ha podido encontrar al usuario en la base de datos.";
          AlertasService.mostrarMensaje(
            titulo,
            mensaje,
            "Cerrar",
            "alertaError",
            this.alertCtrl
          );
        }
      }
    );
  }

  leerCodigo() {
    let context = this;
    this.barcodeScanner.scan().then(
      barcodeData => {
        let registrationId = barcodeData.text;
        if (context.actividad) {
          context.realizarAsistencia(
            registrationId,
            context.actividad,
            context.entradaSalida
          );
        } else {
          alert("Primero debe seleccionar una actividad");
        }
      },
      err => {
        console.log("Error: ", err);
      }
    );
  }
}
