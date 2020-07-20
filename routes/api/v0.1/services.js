'use strict'

const express = require('express');
const route=express.Router();
const mongoose = require('mongoose');
const connectDB = require('../../../database/collections/connectDB');
const ApinInfo = require('./show_movies');
const Movies = require('./show_movies');
const ApiInfo = require('./api_info');

route.get('/',(req, res)=>{
    res.status(200).send({ok:'server api-rest movie run'})
})

// ----Servicios de api rest POST, GET ,DELETE, UPDATE ETC

route.get('/show/movies/genere=:genere&page=:page',Movies.ShowMovies)


// por rating
route.get('/show/rating/page=:page',Movies.RatingPopularity)

// por año decendente 
route.get('/show/movies/year/page=:page', Movies.YearRelease)


// por un año espeficico
// http://localhost:8000/show/movies/yearspecific?year=2018&page=1
route.get('/show/movies/yearspecific',Movies.YearReleaseSpecific)



// api info
route.get('/api/info',ApiInfo);

// respuesta por defecto de la api
route.get('*',(req, res, next)=>{
    res.status(404).send({error:{
        status:404,
        error: 'Error en la peticion',
        message: 'Ruta o petición incorrecta'
    }})
})




module.exports= route