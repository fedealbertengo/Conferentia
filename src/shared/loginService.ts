import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "./dtoClasses";
import { UsuarioService } from "./usuarioService";
import { Storage } from "@ionic/storage";
import { TranslateService } from "@ngx-translate/core";
import { RouterService } from "./routerService";

@Component({
    providers: [UsuarioService]
})
export class LoginService {
    constructor(
        public storage: Storage,
        public translate: TranslateService,
        public userService: UsuarioService
    ) {}

    public setAndStoreUser(user: Usuario, password: string) {
        this.storage.set("username", user.user_name.toLowerCase());
        this.storage.set("password", password.toLowerCase()); // FIXME: Password shouldn't be stored this way
        UsuarioService.setUsuarioLogeado(user);
    }

    public getUserCredentials(
        username: string,
        password: string
    ): Observable<any> {
        // return this.userService.getUsuarios(username, password);
        return this.userService.getUser(username, password);
    }

    public getUserActivities(user: any): Observable<any> {
        //Si NO es organizador (puede ser guest o usuario regular registrado)
        return this.userService.getActividadesAsignadasUsuario(user.id);
    }
    public assignActivities(user: Usuario, activities: any[]) {
        user.assigned_activities = [];

        //FIXME: Rever los usuarios que devuelve el caso de actividades no asignadas en el PHP de usuarios - RO 19/11/2018
        if (Array.isArray(activities)) {
            user.assigned_activities = activities.map(AssignedActivity =>
                parseInt(AssignedActivity.id_activity)
            );
        }

        return user;
    }

    public async getUserAndActivities(
        username: string,
        password: string
    ): Promise<any> {

        if (username && password) {
            const credentialsPromise = this.getUserCredentials(
                username,
                password
            ).toPromise();

            const userActivitiesPromise = credentialsPromise.then(user => {
                if (user) {
                    return this.getUserActivities(user.data).toPromise();
                } else return Promise.resolve([]);
            });

            return Promise.all([credentialsPromise, userActivitiesPromise]);
        }
    }

    removeUserCredentialsFromStorage() {
        this.storage.remove("username");
        this.storage.remove("password");
    }
}
