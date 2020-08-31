'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InitialDataServer = new Schema({
    hostServer:String,
    hostGenere:String,
    hostMoviedetail: String,
    hostGraphQlServer:String,
    headers:Object,
    detailGraphqlQuery:String,
    detailGraphqlVariables:Object,

})


module.exports = mongoose.model('initialserver', InitialDataServer);