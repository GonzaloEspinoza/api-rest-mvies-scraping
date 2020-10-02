'use strict'

const express = require('express');
const Route = express.Router();
const mongoose = require('mongoose');
const VerifyTokenFirebase = require('../../../middlewares/verifyTokenFirebase/verifyTokenFirebase')

const ShowMovies = require('./show_movies')


Route.get('/',(req, res)=>{
    res.status(200).send({message:"Welcome to api movies v1.0.1"})
})

Route.get('/show/movies/genere=:genere/token=:token',
            VerifyTokenFirebase.verifyTokemFirebase,
            ShowMovies.ShowAllMoviesForGenere,
            (req, res)=>{
             res.status(200).send({movies:"......"})
})




module.exports = Route