Lanzamiento local de la aplicación (para testear durante el desarrollo usualmente) (no utiliza cordova y sus plugins):
	ionic serve

Web (utiliza cordova y sus plugins):
	Compilación Web:
		ionic cordova build browser [--prod] [--release]
	Ejecucion Web:
		ionic cordova run browser
	Emulación Web:
		ionic cordova emulate browser

Android:
	Compilación Android:
		ionic cordova build android [--prod] [--release] (se requiere de componentes de android como gradle y el sdk)
	Ejecucion Android (se requiere de componentes de android como gradle y el sdk y aws (o un celular android con la opcion de debugging activada)):
		ionic cordova run android [--livereload]
	Emulación Android (se requiere de componentes de android como gradle y el sdk y aws (o un celular android con la opcion de debugging activada)):
		ionic cordova emulate android [--livereload]
		
iOS (se requiere de una computadora Apple):
	Compilación iOS:
		ionic cordova build ios [--prod] [--release]
	Ejecucion iOS:
		ionic cordova run ios [--livereload]
	Emulación iOS:
		ionic cordova emulate ios [--livereload]