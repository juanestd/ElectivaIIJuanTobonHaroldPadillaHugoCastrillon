# ElectivaIIJuanTobonHaroldPadillaHugoCastrillon


## Integrantes
- [Hugo Armando Castrillón Rivera](https://github.com/HArmandoCRivera)
- [Juan Esteban Tobón](https://github.com/juanestd)
- [Harold Yesid Padilla](https://github.com/hypadilla)

## Tecnología
- <NodeJs ^20.11.1>
- <express ^4.19.2>

# Trabajo 1 Electiva II (Clon de X)

Este proyecto pretende realizar un clon de la red social X el cual permitirá ejecutar las funcionalidades de registro, inicio de sesión, publicación de
tweets, gestión de seguidores y seguidos.

# Como correr el proyecto

1. **Clona el Repositorio:**
```bash
git clone https://github.com/juanestd/ElectivaIIJuanTobonHaroldPadillaHugoCastrillon
```

Correr la app en modo desarrollador

### `npm run dev`
Abrir [http://localhost:3000](http://localhost:3000) para ver en el navegador.

# Listado de endpoints

## Auth

### POST: 

/api/auth/register
/api/auth/login

## Posts

### POST: 
/api/:username/posts
### GET
/api/:username/posts
/api/:username/posts/:id_post
### PUT
/api/:username/posts/
### DELETE
/api/:username/posts/:id_post

## Followers

### POST: 

/api/:username/followers
### GET
/api/:username/followers
/api/:username/followers/:id_followers
### PUT
/api/:username/followers/
### DELETE
/api/:username/followers/:id_followers

## Following

### POST: 
/api/:username/following
### GET
/api/:username/following
/api/:username/following/:id_following
### PUT
/api/:username/following/
### DELETE
/api/:username/following/:id_following






