'use strict'

const mongoose = require('mongoose');
// gonzalo4
// moviepasswordmoviedb

// mongo atlas: mongodb+srv://gonzalo4:moviepasswordmoviedb@cluster0.xujpf.mongodb.net/<dbname>?retryWrites=true&w=majority
        //    :'mongodb+srv://gonzalo4:moviepasswordmoviedb@cluster0.xujpf.mongodb.net/<dbname>?retryWrites=true&w=majority'
// 'mongodb://192.168.99.100:27017/MovieDB'
mongoose.connect('mongodb+srv://gonzalo4:moviepasswordmoviedb@cluster0.xujpf.mongodb.net/<dbname>?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log('Connected database mongoDB -> ok');
})
.catch((err)=>{
    console.log(err);
})


module.exports = mongoose