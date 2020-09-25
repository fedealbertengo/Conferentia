import { Component } from "@angular/core";
import { GlobalService } from "../../shared/globalService";
import { ActividadService } from "../../shared/actividadService";
import { AsistenciaService } from "../../shared/asistenciaService";
import { UsuarioService } from "../../shared/usuarioService";

@Component({
  selector: "assistance-counter",
  templateUrl: "assistance-counter.html"
})
export class AssistanceCounterComponent {
  counter: number;
  currentAssistances: number;
  totalAssistances: number;
  minimumPercentage: number;
  eventName: string;

  minimumAssistanceRequired = GlobalService.minimumAssistanceRequired;

  constructor(
    private actividadService: ActividadService,
    private asistenciaService: AsistenciaService
  ) {
    this.eventName = GlobalService.eventName;
    this.currentAssistances = 0;
    this.totalAssistances = this.getTotalAssistances(this.actividadService);
    this.minimumPercentage = 75;
    this.counter = this.calculatePercentage();
  }

  ngOnInit() {
    this.getCurrentAssistances();
  }

  calculatePercentage() {
    return (this.currentAssistances / this.totalAssistances) * 100;
  }

  getTotalAssistances(actividadService: ActividadService) {
    return actividadService
      .getActividades()
      .filter(Actividad => Actividad.cuentaAsistencia).length;
  }

  //TODO: Contar desde la base de datos la cantidad de asistencias del usuario actual. Ver cómo hacer para consultar la menor cantidad de veces el dato.
  //TODO: Excluir entradas y salidas. Dejar para próxima release.
  getCurrentAssistances() {
    //Obtengo el usuario logeado
    const usuario = UsuarioService.getUsuarioLogeado();
    this.asistenciaService.obtenerAsistencias(usuario.id, null, true).subscribe(
      result => {
        GlobalService.jwt = result.JWT;
        let data = result.data;
        if (data && Array.isArray(data) && data.length) {
          const numberOfAssistances = Array.from(
            new Set(data.map(Asistencia => Asistencia.idActivity))
          ).length; // FIXME: Emprolijar esto
            this.currentAssistances = numberOfAssistances;
        }
        if (data === "No hay resultados") {
          this.currentAssistances = 0;
        }
      },
      error => {
        console.error("Se ha producido un error");
      },
      () => {}
    );
  }
}
