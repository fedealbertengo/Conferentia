import {Component} from "@angular/core";
import {NotificationParameters} from "./dtoClasses";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {GlobalService} from "./globalService";

@Component({
    providers: [HttpClient]
})

export class NotificacionesService {

    private static _appId: string = '18fba1c1-9b7d-48e1-9646-e0a8b7144427'; //OneSignal

    private static _authKey: string = 'NDRiNDU0NWYtMjE3OC00ZmZhLWE5NmYtYzQ5OGE5MTBhYjY1';

    private static _senderId: string = '337515566840'; //Para Android - Sender ID de Firebase

    private static _archivo: string = 'notificaciones.php';
    private static _urlAux: string = GlobalService.webApiLocation;

    notification = new NotificationParameters('enviar', 'All');

    constructor(public httpClient: HttpClient) {
    }

    static get appId(): string {
        return this._appId;
    }

    static get senderId(): string {
        return this._senderId;
    }

    public sendNotification(notification): any {
        return this.executeNotification(notification);
    }

    private initializeRequestParameters (notification: NotificationParameters): HttpParams {
        return new HttpParams()
            .set('accion', notification.action)
            .set('destinatarios', notification.destination)
            .set('titulo', notification.title)
            .set('mensaje', notification.message)
            .set('data', notification.data)
            .set('apiID', NotificacionesService._appId) //TODO: Corregir y hacer que esto sea consistente en front-end de configuración y back-end
            .set('authKey',  NotificacionesService._authKey);
    }

    private initializeRequestHeaders() {
        return new HttpHeaders();
        // .set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
        // .set('Access-Control-Allow-Origin', '*');
    }

    private executeNotification(notification: NotificationParameters) {
        const requestParameters = this.initializeRequestParameters(notification);
        const requestHeaders = this.initializeRequestHeaders();

        const url = `${NotificacionesService._urlAux}${NotificacionesService._archivo}`;
        const response: Observable<any> =
            requestParameters ?
                this.httpClient.get(url, {headers: requestHeaders, params: requestParameters}) :
                this.httpClient.get(url);
        response.subscribe(res => console.log(res.status, res.response));
    }
}
