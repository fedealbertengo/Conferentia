1) Descargar el proyecto en su computadora (Github: https://github.com/fedealbertengo/Conferentia--Fede-)
2) Instalar nodejs en su computadora (Versión 8.16.2):
	Link: https://nodejs.org/dist/v8.16.2/node-v8.16.2-x64.msi
3) Instalar ionic y cordova:
	Ingresar el siguiente comando en una consola: npm install -g ionic cordova
4) En la consola ir a la carpeta donde se descargó el proyecto
5) Ingresar el siguiente comando: npm install

Opcional para Android (https://ionicframework.com/docs/installation/android):
	1) Instalar sdk de android (instalar android studio con el sdk incluido para tener todas las herramientas)
	2) Abrir el sdk manager
	3) Instalar Api de android 28
	4) Instalar el cliente de JAVA (jre-8u241-windows-x64.exe)
	5) Instalar el JDK de JAVA (jdk-8u241-windows-x64.exe)
	6) Abrir barra de busqueda
	7) Escribir cmd y darle enter
	8) Escribir el siguiente comando y darle enter: setx -m JAVA_HOME "C:\Progra~1\Java\jdk1.8.0_241"
	9) Escribir el siguiente comando reemplazando "_usuario_" por su usuario de la pc y darle enter: setx -m ANDROID_HOME "C:\Users\_usuario_\AppData\Local\Android\Sdk"
	10) Escribir el siguiente comando y darle enter: set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin;%ANDROID_HOME%\platform-tools
	
Opcional para servidor local:
	1) Instalar WampServer64 (https://razaoinfo.dl.sourceforge.net/project/wampserver/WampServer%203/WampServer%203.0.0/wampserver3.2.0_x64.exe)
	2) Copiar contenido de la carpeta Server en la carpeta www de WampServer64
	3) Ejecutar WampServer64
	4) Editar en el proyecto el archivo src\shared\globalService.ts:
		Cambiar el texto de la variable _dataSourceLocation por 'http://localhost/'