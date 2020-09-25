import {Component} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {Usuario} from "../../shared/dtoClasses";
import {UsuarioService} from "../../shared/usuarioService";
import {Storage} from "@ionic/storage";
import {RouterService} from "../../shared/routerService";

@Component({
  selector: "page-perfil",
  templateUrl: "perfil.html"
})
export class PerfilPage {
  usuario: Usuario;
  createdCode: string;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public storage: Storage
  ) {
    //Obtengo el usuario logeado
    this.usuario = UsuarioService.getUsuarioLogeado();

    if(this.usuario){
        this.createCode();
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

  createCode() {
    this.createdCode = this.usuario.registration_id.toString();
  }

  goToAsistencia() {
    RouterService.goToAsistencia(this.navCtrl);
  }

  cerrarSesion() {
    const removeUser = this.storage.remove("username");
    const removePassword = this.storage.remove("password");

    Promise.all([removeUser, removePassword]).then(() => {
      RouterService.goToInicioSesionPage(this.navCtrl, {});
      location.reload();
    });
  }

}
