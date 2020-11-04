'use strict'

const express = require('express');
const Route = express.Router();
const mongoose = require('mongoose');
const VerifyTokenFirebase = require('../../../middlewares/verifyTokenFirebase/verifyTokenFirebase')

const ShowMovies = require('./show_movies')

const AccesVerifyAplication = require('./verifyStateAplication/verifyStateNameAplication');

Route.get('/',(req, res)=>{
    res.status(200).send({message:"Welcome to api movies v0.2"})
})

// registrar el tokeClientfirebase 
Route.post('/token/new/client', VerifyTokenFirebase.registerTokenFirebase);

// ------------------------------


//  metodos de peticions GET, POST, PATCH, DELETE, UPDATE
// para consumir un recurso o un endpint se debe enviar lo siguiente:
// token en el header --> authorization,  Bearer [token], nameaplication.

Route.get('/movies/show/genere=:genere&page=:page/nameaplication=:nameaplication',
            VerifyTokenFirebase.verifyTokemFirebase,
            AccesVerifyAplication,
            ShowMovies.ShowAllMoviesForGenere
            );

Route.get('/movies/show/rating/page=:page/nameaplication=:nameaplication',
            VerifyTokenFirebase.verifyTokemFirebase,
            AccesVerifyAplication,
            ShowMovies.RatingPopularity
            );



module.exports = Route