# PangoDB

## Enoncé
L'objectif est de créer un mini carnet d'adresse pour "Pangolin" sur Express.js (sous forme d'API) avec un front sur angular &  DB Mongo de préférence. 
- (Inscription/Connexion/Déconnexion) du "Pangolin" par login/mot de passe 
- (Afficher/Modifier) son rôle (Guerrier, Alchimiste, Sorcier, Espions, Enchanteur)
- (Ajouter/Supprimer) en amis un autre "Pangolin" à partir d'une liste des autres Pangolins inscrits.

## API

port: `http://localhost/8080`

Modele: 
Pangolin
```js
type Pangolin = {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    friend: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    role: {
        type: String,
        enum: ['Guerrier', 'Alchimiste', 'Sorcier', 'Espion', 'Enchanteur'],
        default: 'Guerrier',
    },  
}
```
### AUTH

- sign up:
POST `/auth/signup` 

- login:
POST `/auth/signup` 


### CREATE (auth)
POST `/pangolin` 

### READ (auth)
findAll:
GET `/pangolin` 

findOne:
GET `/pangolin/:id` 

### UPDATE (auth)
PUT `/pangolin/:id` 

### DELETE (auth)
DELETE `/pangolin/:id`

## Maquette UI 

Voir le figma [ICI](https://www.figma.com/file/UJoRrhzQ8ll8ni7kRAiNi1/PangoDB?type=design&node-id=0%3A1&t=m2YhP6smNUg7kqX0-1)