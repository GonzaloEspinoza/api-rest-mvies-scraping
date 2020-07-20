'use strict'

const mongoose = require('mongoose');


mongoose.connect('mongodb://192.168.99.100:27017/MovieDB',{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log('Connected database mongoDB -> ok');
})
.catch((err)=>{
    console.log(err);
})


module.exports = mongoose