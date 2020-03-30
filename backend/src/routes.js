const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

/* 

MÉTODOS HTTP 

GET: Buscar/listar informações no backend
POST: Criar uma informação no backend
PUT: Alterar uma informação no backend
DELETE: Deletar uma informação no backend

Tipos de paramêtros:

Query params: Parâmetros nomeados enviados na rota após '?' (Filtros, paginação)
Route params: Parâmetros utilizados para identificar recursos

SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL server
NOSQL: MongoDB, couchDB, etc

*/

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

//validação sempre antes
routes.post('/ongs',  celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.number().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }) 
}), IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), IncidentController.delete);
module.exports = routes;