# miniYoutube
Para la parte del backend utilice symfony 3 en el cual se pueden probar los servicios con postman

En primer lugar debes tener Composer instalador globalmente. Si utilizas Linux o Mac OS X, ejecuta los siguientes comandos:

$ curl -sS https://getcomposer.org/installer | php

$ sudo mv composer.phar /usr/local/bin/composer

Si utilizas Windows, descárgate el instalador ejecutable de Composer y sigue los pasos indicados por el instalador.
Una vez instalado Composer, ejecuta los siguientes comandos para descargar e instalar la aplicación miniYoutube:

# clona el código de la aplicación
$ git clone git://github.com/mercedita24/miniYoutube.git

# instala las dependencias del proyecto 
(debes estar en la carpeta de symfony)
$ composer install

# Probando la aplicación

La forma más sencilla de probar la aplicación, ejecuta el siguiente comando, que arranca el servidor web interno de PHP y hace que tu aplicación se pueda ejecutar sin necesidad de usar Apache o Nginx:

$ php app/console server:run

# ANGULAR 2
la parte de Frontend esta desarrollada en angular lo cual debes estar en la carpeta "angular" de este repositorio

# Descarga las dependencias
npm install

# Probando la aplicación
ng serve
