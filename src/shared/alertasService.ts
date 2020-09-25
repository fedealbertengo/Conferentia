import { AlertController } from 'ionic-angular';

export class AlertasService{

  public constructor(){

  }

  public static mostrarMensaje(titulo: string, mensaje:string, boton: string, claseCSS: string, alertCtrl: AlertController){
    let alert = alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      cssClass: claseCSS,
      buttons: [boton]
    });
    alert.present();
  }

  public static mostrarMensajeConfirmacion(titulo: string, mensaje: string, context, callbackConfirmar, callbackCancelar, alertCtrl: AlertController){
    let alert = alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            if(callbackCancelar){
              callbackCancelar(context);
            }
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            if(callbackConfirmar){
              callbackConfirmar(context);
            }
          }
        }
      ]
    });
    alert.present();
  }

}
