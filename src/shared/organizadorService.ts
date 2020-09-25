import {Organizador} from "./dtoClasses";
import {GlobalService} from "./globalService";
import {Component} from "@angular/core";
import {DataBaseAccess} from "./databaseAccess";
import {Http} from "@angular/http";

@Component({
  providers: [GlobalService]
})

export class OrganizadorService {

  public arrayOrganizadores: Organizador[] = [];

  private globalService:GlobalService;

  constructor(gs: GlobalService, public dataBaseAccess: DataBaseAccess, public http: Http){

    this.globalService = gs;
    this.getOrganizadoresCAEII2018();
  }

  public getOrganizadoresCAEII2018(){
    this.arrayOrganizadores = [
      {
        idOrganizador: 10030,
        nombre: 'Lucía',
        apellido: 'Monti',
        numeroTelefono: '5493434674222'
      },
      {
        idOrganizador: 10064,
        nombre: 'Tamara',
        apellido: 'Lozano',
        numeroTelefono: '5493445532547'
      }
    ];
  }

  public getOrganizadores():Organizador[]{
    return this.arrayOrganizadores;
  }

  public getOrganizadorById(idOrganizador:number):Organizador{
    return this.arrayOrganizadores.filter(Organizador => Organizador.idOrganizador === idOrganizador)[0];
  }

  public getCargaTelefonoOrganizadoresCAEII2018(){
      return this.dataBaseAccess.consultarDB(DataBaseAccess.archivoConsulta, ["command", "getCargaTelefono", 'jwt', GlobalService.jwt], this.http);
  }

  public aumentarCargaTelefono(idOrganizador: number){
      return this.dataBaseAccess.excecuteSentenceDB(DataBaseAccess.archivoEjecucion, ["command", "aumentarCargaTelefono", "id_organizador", idOrganizador.toString(), 'jwt', GlobalService.jwt], this.http);
  }

  public getCargaTelefono(){
    let carga: any;
        carga = this.getCargaTelefonoOrganizadoresCAEII2018();

    return carga;
  }

  public getOrganizadorMinimaCargaTelefono(cargaTelefonoOrganizadores: Map<number, number>):Organizador{
      let min: number = Math.min(...Array.from(cargaTelefonoOrganizadores.values()));
      let organizadoresMinCarga: number[] = [];
      cargaTelefonoOrganizadores.forEach(function (item, key, mapObj) {
        if(item == min){
          organizadoresMinCarga.push(key);
        }
      });
      let i = Math.floor((Math.random() * organizadoresMinCarga.length));
      return this.getOrganizadorById(organizadoresMinCarga[i]);
  }

  public getNumeroOrganizador(cargaTelefonoOrganizadores: Map<number, number>): string{
    if(this.arrayOrganizadores.length){
      let org: Organizador = this.getOrganizadorMinimaCargaTelefono(cargaTelefonoOrganizadores);
      this.aumentarCargaTelefono(org.idOrganizador).subscribe(data=>{}, error => {});
      return org.numeroTelefono;
    }
    else{
      return null;
    }
  }
}
