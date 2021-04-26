'use strict'

const express = require('express');
const Route = express.Router();
const mongoose = require('mongoose');
const VerifyTokenFirebase = require('../../../middlewares/verifyTokenFirebase/verifyTokenFirebase')

const UrlVideos = require('./showUrlMovies');

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

// muestra las peliculas las primeras 20 por genero
Route.get('/movies/show/genere=:genere&page=:page/nameaplication=:nameaplication',
            VerifyTokenFirebase.verifyTokemFirebase,
            AccesVerifyAplication,
            ShowMovies.ShowMovies
            );
// por rating
Route.get('/movies/show/rating/page=:page/nameaplication=:nameaplication',
            VerifyTokenFirebase.verifyTokemFirebase,
            AccesVerifyAplication,
            ShowMovies.RatingPopularity
            );

// por año decendente 
Route.get('/movies/show/year/page=:page/nameaplication=:nameaplication',
            VerifyTokenFirebase.verifyTokemFirebase,
            AccesVerifyAplication,
            ShowMovies.YearRelease
          );

// por un año espeficico
// http://localhost:8000/show/movies/yearspecific?year=2018&page=1
Route.get('/movies/show/yearspecific/year=:year&page=:page/nameaplication=:nameaplication',
            VerifyTokenFirebase.verifyTokemFirebase,
            AccesVerifyAplication,
            ShowMovies.YearReleaseSpecific
        );



// muestra las urls disponibles de una pelicula por id 
// http://localhost:8000/show/movie/idmovie=5f15fbac4a07a629fc838f95?hostname=upstream.to&&language=es-mx
// http://localhost:8000/show/movie/idmovie=5f15fbad4a07a629fc838f97?hostname=fembed.com&&language=es-es
//localhost:8000/api/v0.2/movies/show/urlmovie/idmovie=5f6b77ede43eb4302c1eb64c/hostname=upstream.to/languaje=we-mx/nameaplication=fanpelis
Route.get('/movies/show/urlmovie/idmovie=:idmovie/hostname=:hostname/languaje=:languaje/nameaplication=:nameaplication', 
            VerifyTokenFirebase.verifyTokemFirebase,
            AccesVerifyAplication,
            ShowMovies.ShowUrlMovies
          );



// mostrar todas las peliculas pertenecientes a un genero
Route.get('/movies/show/all/genere=:genere&page=:page/nameaplication=:nameaplication', 
            VerifyTokenFirebase.verifyTokemFirebase,
            AccesVerifyAplication,
            ShowMovies.ShowAllMoviesForGenere
        );


// muestra la data de una sola pelicula por medio del idMovie
Route.get('/movie/show/idmovie=:idmovie',


            ShowMovies.ShowMovieForId
          );



//(Serach) muestra los resultados de un query search 
Route.get('/movie/search/query=:query/nameaplication=:nameaplication', 

            AccesVerifyAplication,
           ShowMovies.searchMovieForTitle
          );


// info config data initial server movies
const ConfigData = require('./configServerData');
Route.get('/config/data/server/movies',
            // VerifyTokenFirebase.verifyTokemFirebase,
            // AccesVerifyAplication,
            ConfigData.DataServerInitial
          );


// funcion de la api-v01 no borrar
Route.post('/urls/idmovie', UrlVideos.UrlVideos)
  



module.exports = Route