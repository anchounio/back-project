# Entrenamientos App

Aplicación para organizar internamente los entrenamientos en un gimnasio.

Se trata de una API que permita publicar ejercicios para la gestión de los mismos en un gimnasio. Los usuarios serán los trabajadores del gimnasio.

# Características

- Se diferencian dos tipos de usuarios: "admin" y "normal".

- Solo el administrador (propietario del bar o jefe de sala) puede dar de alta a
  otros usuarios (camareros), que por defecto serán de tipo "normal".

- Los clientes no necesitan usuario, navegarán de forma anónima desde un terminal
  ubicado en cada una de las mesas del local.

- Los clientes no podrán hacer la solicitud de bebidas desde el terminal, deberán
  llamar al camarero y comunicárselo verbalmente.

- Del mismo modo los clientes deberán solicitar la cuenta al camarero cuando quieran
  pagar.

# Entidades en la base de datos

- [users] - Pueden ser de tipo "admin" (propietario del bar) o "normal" (camareros).

  - id
  - name
  - role
  - createdAt

- [exercises] - Contiene información acerca de las mesas del local.

  - id
  - request
  - pay
  - attended
  - createdAt

- [drinks] - Lista de bebidas que se sirven en el establecimiento.

  - id
  - name
  - createdAt

# Endpoints bebidas

- GET - [/drinks] - Mostrar listado de bebidas.
- POST - [/drink] - Registrar una nueva bebida. **CON TOKEN - ADMIN** ✅
- DELETE - [/drinks/:idDrink] - Eliminar una bebida. **CON TOKEN - ADMIN** ✅

# Endpoints mesas

- POST - [/table] - Registrar una nueva mesa. **CON TOKEN - ADMIN**

- PUT - [/table/:idTable/request] - Solicitar la atención de un camarero o camarera disponible.
  Cambia el atributo `request` a `true`.

- PUT - [/table/:idTable/pay] - Solicitar la cuenta. Cambia el atributo `pay` a `true`.

- PUT - [/table/:idTable/attend] - Atender una solicitud de atención o de cobro.
  Cambia el atributo `attend` a `true`. **CON TOKEN**

- PUT - [/table/:idTable/request/end] - Finalizar una solicitud de atención.
  Cambia los atributos `request` y `attend` a `false`. **CON TOKEN**

- PUT - [/table/:idTable/pay/end] - Finalizar una solicitud de cuenta.
  Cambia los atributos `pay` y `attend` a `false`. **CON TOKEN**

- DELETE - [/table/:idTable] - Eliminar una mesa. **CON TOKEN**

# Endpoints usuarios

- POST - [/login] - Logea a un usuario válido y retorna un token. ✅
- POST - [/user/register] - Registrar un nuevo usuario normal (camarero). **CON TOKEN - ADMIN**
- DELETE - [/user/:idUser] - Eliminar un usuario (no se puede eliminar al usuario administrador). **CON TOKEN - ADMIN**
