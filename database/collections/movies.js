'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie= new Schema({
    title:String,
    release_date: String,
    yearRelease:Number,
    runtime:String,
    genere:[],
    spoken_languages:[],
    poster_url:String,
    poster2_url:String,
    urls_movie:[],
    overview_movie:String,
    Director:String,
    writer:String,
    actors:String,
    country:String,
    awards:String,
    ratings_popularity:String,
    type:String,
    production:String, //producido por
    recentlyAdded:{type:Date, default:Date.now}    //vovies recently added

})


module.exports = mongoose.model('movie',Movie);