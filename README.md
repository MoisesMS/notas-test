# Primer proyecto backend
Este es mi primer proyecto backend en el que desarrollo una api para gestionar tareas utilizando nodejs y express.

## Instalación
Clona el repositorio

~~~
git clone https://github.com/MoisesMS/notas-test
~~~

Muevete a la carpeta del proyecto
~~~
cd notas-test
~~~

Instala las dependencias
~~~
npm install
~~~

Importa la base de datos incluida en la carpeta bbdd

Ejecuta el proyecto
~~~
npm run start
~~~

## Rutas de la API

### GET localhost:3000/api/
Muestra todas las notas en la base de datos.
~~~
localhost:3000/api/
~~~

### GET localhost:3000/api/:id
Muestra la nota cuyo id coincida con el pasado como parámetro.
~~~
localgost:3000/api/1  
~~~

### POST localhost:3000/api/upload
Publica una nueva nota en función del archivo JSON pasado en el body de la petición.

~~~
localhost/api/upload/
~~~

JSON en el body de la petición
~~~ JSON
{
  "titulo": "Inserta un título",
  "descripcion": "Inserta una descripción"
}
~~~

### PUT localhost:3000/api
Actualiza la información de la nota con el JSON pasado por el body de la petición.

~~~
localhost:3000/api
~~~

JSON en el body de la petición
~~~ JSON
{
  "titulo": "Inserta el nuevo título"
  "descripcion": "Inserta la nueva descripción"
}
~~~

### POST localhost:3000/api/:id
Marca como completada la nota cuyo id se pasa como parámetro
~~~
localhost:3000/api/1
~~~

### POST localhost:3000/api/
Marca como completada todas las notas guardadas
~~~
localhost:3000/api
~~~

### DELETE localhost:3000/api
Elimina la nota cuyo id coincida con el pasado en el body.

~~~
localhost:3000/api/
~~~

JSON En el body de la petición
~~~ JSON
{
  "id": 1
}
~~~
