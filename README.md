## Arquitectura

El núcleo fundamental del proyecto "game-quest-booking-core" , actúa como el principal microservicio y opera en un entorno impulsado por Node.js, Express y TypeScript. Enfocándome en una arquitectura API REST, seguí el patrón Modelo-Vista-Controlador (MVC) para una organización eficiente del código.

En el ámbito de las bases de datos, este microservicio se apoya en MySQL y utiliza TypeORM para simplificar la interacción con la base de datos. La implementación de migraciones facilita el control y la administración de los cambios en la estructura de la base de datos, asegurando una gestión fluida y ordenada.

En lo que respecta a la autenticación de usuarios, he optado por la integración de JWT (JSON Web Tokens) para agilizar la comunicación y fortalecer la seguridad del sistema.

Adicionalmente, para ofrecer una experiencia en tiempo real mediante websockets, he incorporado la librería Pusher. Además, para la carga eficiente de archivos relacionados con los eventos y reservas, he integrado Cloudinary, proporcionando una solución robusta y escalable para la gestión de recursos multimedia.

## Instalacion

Para instalar el proyecto, he preparado un contenedor en Docker para facilitar los pasos. Asi que es importante que tengas instalado tanto Docker como docker compose en tu sistema operativo, ya sea Windows, Mac o Linux. Si no lo tienes, puedes hacerlo [siguiendo la documentacion de Docker](https://docs.docker.com/engine/install/) 🐋

<blockquote>
<span>
💡
</span>
<span>
Si instalas Docker Desktop (en Windows y Mac), ya viene con docker compose, pero si lo haces en Linux debes instalarlo a parte.
</span>
</blockquote>

#### Paso 1

Clonar el proyecto

```
$ git clone https://github.com/Dante05S/game-quest-booking-core.git
```

#### Paso 2

Normalmente las `.env` estan ocultas y no se suben al respositorio, pero en esta ocación las deje con acceso publico para facilitar la configuración del entorno

#### Paso 3

Montar la infraestructura con los contenedores de docker, esto lo haces ejecutando el siguiente comando en la terminal, estando desde el path del proyecto.

```
$ docker-compose up -d
```

Este comando construira un contenedor que hace posible el funcionamiento del proyecto: MySQL.

#### Paso 4

Instalar dependencias

```
$ npm install
```

#### Paso 5

Realizar las migraciones de la base de datos ejecutando el siguiente comando

```
$ npm run migration:run
```

#### Paso 6

Levantar el servidor

```
$ npm run local
```

#### Paso 7

[Probar instalacion](http://localhost:3001)

<blockquote>
<span>
💡
</span>
<span>
Si tienes algun problema al momento de realizar uno de estos pasos, no dudes en mencionarmelo.
</span>
</blockquote>

## Pantallazos

<img width="400" height="400" src="/public/1.png">
<br/>
<img width="400" height="400" src="/public/2.png">
<br/>
<img width="400" height="400" src="/public/3.png">
<br/>
<img width="400" height="400" src="/public/4.png">
<br/>
<img width="400" height="400" src="/public/5.png">
