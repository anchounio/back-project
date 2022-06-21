# Entrenamientos App

Aplicación para organizar internamente los entrenamientos en un gimnasio.

# Características

Se trata de una API que permita publicar ejercicios para la gestión de los mismos en un gimnasio. Los usuarios serán los trabajadores del gimnasio.

# Entidades en la base de datos

-   [users] - Pueden ser de tipo "admin" o "normal" (trabajadores).

    -   id
    -   name
    -   email
    -   password
    -   role
    -   createdAt

-   [exercises] - Contiene información acerca de los ejercicios

    -   id
    -   name
    -   description
    -   photo
    -   typology
    -   muscularGroup
    -   createdAt

-   [exercisesUsers] - Tabla de relación m/n de las 2 anteriores. Se utiliza como contador de likes que los usuarios den a los ejercicios y tambien guarda los ejercicios marcados como favoritos por cada usuario.
    -   id
    -   idUsers
    -   idExercises
    -   likes
    -   favourite
    -   createdAt

# Endpoints users

-   POST - [/user/login] - Logarse.

-   POST - [/user/register] - Registrarse.

# Endpoints exercises

-   POST - [/exercise] - Registrar un nuevo ejercicio. **CON TOKEN - ADMIN** ✅

-   PUT - [/exercise/:idExercise] - Modificar un ejercicio. **CON TOKEN - ADMIN** ✅

-   DELETE - [/exercise/:idExercise] - Eliminar un ejercicio. **CON TOKEN - ADMIN** ✅

-   GET - [/exercises] - Ver listado de los ejercicios. **CON TOKEN**

-   GET - [/exercise/:idExercise/details] - Ver detalles de un ejercicio. **CON TOKEN**

-   GET - [/exercises/typology/:typology] - Filtrar por la categoria typology **CON TOKEN**

-   GET - [/exercises/muscularGroup/:muscularGroup] - Filtrar por la categoria muscularGroup **CON TOKEN**

-   GET - [/exercises/favourite] - Ver listado de los ejercicios agregados a favoritos del usuario logueado **CON TOKEN**

-   PUT - [/exercise/:idExercise/likes] - Dar o quitar like a un ejercicio **CON TOKEN**

-   PUT - [/exercise/:idExercise/favourite] - Asignar o eliminar un ejercicio a favoritos **CON TOKEN**
