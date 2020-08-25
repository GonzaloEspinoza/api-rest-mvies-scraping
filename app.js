'use strict'

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan =require('morgan');

const app = express();
const PORT = process.env.PORT || 8000;


const services = require('./routes/api/v0.1/services')
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())




app.use('/',services);

const Scraping = require('./scraping/pelisPlus_gt_com/scraping_pelisplus')
// Scraping.ScrapingMovieDetail();
// Scraping.ScrapingPelisPlus();

const Control_scrapin= require('./scraping/pelisPlus_gt_com/control_scraping');
// Control_scrapin()

const uploadMmovie= require('./scraping/pelisPlus_gt_com/upload_movies');
// uploadMmovie.UploadMovie();


// ............grphql
const uploadData = require('./graplql/graphql_3_upload_movies');
// uploadData();


// uploda dataserver initial data
const uploadDataInitialConfigServer = require('./database/collections/data_server_movies/uploadInitialData');
// uploadDataInitialConfigServer();

app.listen(PORT,()=>{
    console.log(`Server on port: ${PORT}`)
})






