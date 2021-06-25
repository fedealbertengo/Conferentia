import {ButtonBarEnabledElements, ImplementedModuleStatus} from "./dtoClasses";

export class GlobalService{

    //public static _dataSourceLocation: string = 'http://rolivencia.xyz/lidera-2019/';

    //public static _dataSourceLocation: string = 'http://localhost/conferentia/';
    //public static _dataSourceLocation: string = 'http://rolivencia.xyz/mecom/';

    public static _dataSourceLocation: string = 'http://fedealb.ddns.net:8396/Conferentia/';
	
    public static _webApiLocation:string = GlobalService._dataSourceLocation + 'api/';
    public static _actividadesSinVistaDetallada = [];
    public static _buttonBarEnabled: boolean = true;
    public static _imagesFolder: string = 'assets/img/';
    public static _currentLanguage: string;
    private static _eventName: string = 'ENIEF 2019';
    public static _logoEnabled: boolean = true;
    public static _sponsorsEnabled: boolean = true;
    public static _sponsorsConVistaDetallada: boolean = true;
    public static _usaInicioSesion: boolean = true;
    public static _minimumAssistanceRequired: boolean = true;
    private static _assistanceWithTimeFrame: boolean = true;
    private static _teamsEnabled: boolean = true;

    private static _sponsorsFolder: string = GlobalService._webApiLocation + "img/sponsors/";
    private static _avataresFolder: string = GlobalService._webApiLocation + "img/avatares/";

    private static _primerPlano = false;
    private static _tokenNotif: string = "";
    private static _jwt: string = "";

    public static pageAccessEnabled:ImplementedModuleStatus = {
        AboutPage: true,
        AreasTematicasPage: false,
        AsistenciaPage: true,
        ChairsPage: false,
        DisertantesPage: true,
        InicioPage: true,
        LocalizacionPage: true,
        MiCronogramaPage: true,
        ProximaActividadPage: true,
        SponsorsPage: true,
        SettingsPage: true,
        CompetitionsPage: false
    };

    public static pageTabBarVisibility:ImplementedModuleStatus = {
        AboutPage: false,
        AreasTematicasPage: false,
        AsistenciaPage: true,
        ChairsPage: false,
        DisertantesPage: true,
        InicioPage: true,
        LocalizacionPage: true,
        MiCronogramaPage: true,
        ProximaActividadPage: true,
        SponsorsPage: false,
        SettingsPage: true,
        CompetitionsPage: false
    };


    public static _buttonBarEnabledElements:ButtonBarEnabledElements = {
        facebook: true,
        instagram: true,
        whatsApp: false,
        generalSurvey: false,
        standings: false,
        twitter: true,
        website: true
    };

    static get teamsEnabled(): boolean {
        return this._teamsEnabled;
    }

    static set teamsEnabled(value: boolean) {
        this._teamsEnabled = value;
    }

    static get avataresFolder(): string {
        return this._avataresFolder;
    }

    static set avataresFolder(value: string) {
        this._avataresFolder = value;
    }

    static get sponsorsFolder(): string {
        return this._sponsorsFolder;
    }

    static set sponsorsFolder(value: string) {
        this._sponsorsFolder = value;
    }

    static get assistanceWithTimeFrame(): boolean {
        return this._assistanceWithTimeFrame;
    }

    static set assistanceWithTimeFrame(value: boolean) {
        this._assistanceWithTimeFrame = value;
    }

    static get webApiLocation(): string {
        return this._webApiLocation;
    }

    static set webApiLocation(value: string) {
        this._webApiLocation = value;
    }

    static get dataSourceLocation(): string {
        return this._dataSourceLocation;
    }

    static set dataSourceLocation(value: string) {
        this._dataSourceLocation = value;
    }

    static get minimumAssistanceRequired(): boolean {
        return this._minimumAssistanceRequired;
    }

    static set minimumAssistanceRequired(value: boolean) {
        this._minimumAssistanceRequired = value;
    }

    static get tokenNotif(): string {
        return this._tokenNotif;
    }

    static set tokenNotif(value: string) {
        this._tokenNotif = value;
    }

    static get primerPlano(): boolean {
        return this._primerPlano;
    }

    static set primerPlano(value: boolean) {
        this._primerPlano = value;
    }

    static get jwt(): string {
        return this._jwt;
    }

    static set jwt(value: string) {
        this._jwt = value;
    }

    static get usaInicioSesion(): boolean {
        return this._usaInicioSesion;
    }

    static set usaInicioSesion(value: boolean){
        this._usaInicioSesion = value;
    }

    static get imagesFolder() {
        return this._imagesFolder;
    }

    static set imagesFolder(value: string){
        this._imagesFolder = value;
    }

    static get sponsorsEnabled(){
        return this._sponsorsEnabled;
    }

    static set sponsorsEnabled(value: boolean){
        this._sponsorsEnabled = value;
    }

    static get sponsorsConVistaDetallada(){
        return this._sponsorsConVistaDetallada;
    }

    static set sponsorsConVistaDetallada(value: boolean){
        this._sponsorsConVistaDetallada = value;
    }

    static get logoEnabled(){
        return this._logoEnabled;
    }

    static set logoEnabled(value: boolean){
        this._logoEnabled = value;
    }

    static get actividadesSinVistaDetallada(){
        return this._actividadesSinVistaDetallada;
    }

    static set actividadesSinVistaDetallada(value: string[]){
        this._actividadesSinVistaDetallada = value;
    }

    static get buttonBarEnabled(){
        return this._buttonBarEnabled;
    }

    static set buttonBarEnabled(value: boolean){
        this._buttonBarEnabled = value;
    }

    static get buttonBarElements():ButtonBarEnabledElements{
        return this._buttonBarEnabledElements;
    }

    static set buttonBarElements(buttonBarEnabledElements){
        this._buttonBarEnabledElements = buttonBarEnabledElements;
    }

    static changeButtonBarPropertyStatus(buttonKey:string, buttonStatus:boolean){
        this._buttonBarEnabledElements[buttonKey] = buttonStatus;
    }

    static get eventName(): string {
        return this._eventName;
    }

    static set eventName(value: string) {
        this._eventName = value;
    }

    constructor(){
    }

    //TODO: Define an object that would allow to know which modules should be loaded to each implementation of the app
    //TODO: Find a way to relate SCSS to TS code to be able to know which styles to apply to an implementation of the app
}
