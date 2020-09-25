import {TipoMarcador} from "./dtoClasses";
export class MarcadorObject {


  private _marcadorId: number;
  private _marcadorTitulo: string;
  private _marcadorDesc: string;
  private _hasImage: Boolean;
  private _imageUrl: String;
  private _marcadorLat: number;
  private _marcadorLong: number;
  private _distancia: number;
  private _tipoMarcador: TipoMarcador;
  private _direccion: string;


  set marcadorId(value: number) {
    this._marcadorId = value;
  }

  set marcadorDireccion(value: string){
    this._direccion = value;
  }

  set marcadorTitulo(value: string) {
    this._marcadorTitulo = value;
  }

  set marcadorDesc(value: string) {
    this._marcadorDesc = value;
  }

  set hasImage(value: Boolean) {
    this._hasImage = value;
  }

  set imageUrl(value: String) {
    this._imageUrl = value;
  }

  set marcadorLat(value: number) {
    this._marcadorLat = value;
  }

  set marcadorLong(value: number) {
    this._marcadorLong = value;
  }

  set distancia(value: number) {
    this._distancia = value;
  }

  set tipoMarcador(value: TipoMarcador) {
    this._tipoMarcador = value;
  }

  get marcadorId(): number{
    return this._marcadorId;
  }

  get direccion(): string{
    return this._direccion;
  }

  get marcadorTitulo(): string{
    return this._marcadorTitulo;
  }

  get marcadorDesc(): string{
    return this._marcadorDesc;
  }

  get hasImage(): Boolean{
    return this._hasImage;
  }

  get imageUrl(): String{
    return this._imageUrl;
  }

  get marcadorLat(): number{
    return this._marcadorLat;
  }

  get marcadorLong(): number{
    return this._marcadorLong;
  }

  get distancia(): number {
    return this._distancia;
  }

  get tipoMarcador(): TipoMarcador {
    return this._tipoMarcador;
  }

  public constructor(marcadorId: number, marcadorTitulo: string, marcadorDesc: string, hasImage: Boolean, imageUrl: String, marcadorLat: number, marcadorLong: number, tipoMarcador: TipoMarcador, direccion: string) {
    this._marcadorId = marcadorId;
    this._marcadorTitulo = marcadorTitulo;
    this._marcadorDesc = marcadorDesc;
    this._hasImage = hasImage;
    this._imageUrl = imageUrl;
    this._marcadorLat = marcadorLat;
    this._marcadorLong = marcadorLong;
    this._tipoMarcador = tipoMarcador;
    this._direccion = direccion;
  }
}

