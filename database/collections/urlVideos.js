'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideosUrls = new Schema({
    idMovie:String,
    id2:String,
    languaje:String,
    audio:String,
    url:String,
    quality:String,
    type:{
        type:String, 
        enum:[
            'free',
            'pay'
        ],
        default:'free'
    },
    status:Boolean,
    server:String,
    hostname:String,
    dataCreated:{ type:Date, default:Date.now }  


})

module.exports = mongoose.model('urlsvideos', VideosUrls);