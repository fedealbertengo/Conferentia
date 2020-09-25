#Instrucciones de instalación

Los siguientes son comandos a ejecutar desde la terminal una vez que estamos posicionados en el directorio de desarrollo de la aplicación

1. Instalar Ionic y Cordova vía npm, en modo global:
	npm install -g cordova
	npm install -g ionic
2. Instalar el resto de las dependencias vía npm:
	npm install
4. Instalar plugins de Cordova:
    ionic cordova prepare
3. Para ejecutar aplicación:
	ionic serve

#Instrucciones para versionado

 - No versionar las carpetas:

    - platform
    - www
    - plugins
    - node_modules