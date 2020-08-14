'use strict'
const fs = require('fs');
const StorageUrls = require('../../urlsLinks-pages-0-3-documentales-urls.json');

const Scraping= require('./scraping_pelisplus');


// extre los detalles de la pellidcula
async function CrontolScraping(){
    console.log(StorageUrls.length)

    var movies=[]
    for (let i = 0; i < StorageUrls.length; i++) {
        movies[i]=await Scraping.ScrapingMovieDetail(StorageUrls[i]);
    }
    
    await fs.appendFile('./urlsLinks-pages-0-3-documentales.json', JSON.stringify({movies}),'utf8', (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });

}


module.exports = CrontolScraping;