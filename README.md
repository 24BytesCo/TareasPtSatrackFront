Video Funcionamiento: https://drive.google.com/file/d/1Cg4lhyWy2RJq0oohhGrlEpikQpn7gpkA/view?usp=drivesdk

# Gestor de Tareas

El **Gestor de Tareas** es una aplicación de gestión de tareas que permite a los usuarios crear, asignar fechas límite, categorizar, y marcar tareas como completadas. Este proyecto se ha desarrollado como parte de una prueba técnica para la empresa Satrack.

## Características Clave

- **Carga Perezosa**: La aplicación utiliza la técnica de carga perezosa (Lazy Loading) para cargar módulos y componentes de manera eficiente.

- **Interceptor para Loader**: Se ha implementado un interceptor para mostrar un indicador de carga (loader) durante las solicitudes HTTP.

- **@Input y @Output**: Los decoradores @Input y @Output se emplean para pasar datos entre componentes y módulos.

- **RxJS BehaviorSubject**: Se utiliza RxJS BehaviorSubject para crear observables que almacenan y transmiten el estado de la aplicación.

- **Peticiones HTTP**: La aplicación realiza peticiones HTTP a una API para crear, leer y actualizar tareas y categorías.

- **SweetAlert2**: Se utiliza SweetAlert2 para mostrar notificaciones y diálogos interactivos al usuario.

- **Modularizado**: El proyecto está modularizado para facilitar el mantenimiento y escalabilidad.

## Requisitos

Asegúrate de tener las siguientes herramientas y dependencias instaladas:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://cli.angular.io/)

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/24BytesCo/TareasPtSatrackFront
```

2. Navega al directorio del proyecto:

```bash
cd TareasPtSatrackFront
```

3. Instala las dependencias:

```bash
npm install
```

4. Inicia la aplicación:

```bash
ng serve
```

## Uso

La aplicación se ejecutará en http://localhost:4200. Abre tu navegador web y accede a esa dirección para comenzar a utilizar el Gestor de Tareas.

