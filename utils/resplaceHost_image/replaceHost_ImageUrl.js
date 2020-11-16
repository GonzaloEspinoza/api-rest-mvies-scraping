'use strict'
const Movie = require('../../database/collections/movies');



const replaceHostImage = async ()=>{

    console.log("replace host");
    var newHost = "pelisplus2.app";
    

    const results = await Movie.find({});
    
    results.map(async(d,i)=>{
        // console.log(d.title);
        const update = await {
            poster_url:d.poster_url.replace("pelisplus.li","pelisplus2.app"),
            poster3_url: d.poster3_url.replace("pelisplus.li","pelisplus2.app"),
            urlDetailMovieOriginal: d.urlDetailMovieOriginal.replace("pelisplus.li","pelisplus2.app")
        };

        // console.log(d._id);

        Movie.findOneAndUpdate({ _id : d._id }, update ,(error, up)=>{
            console.log(d.poster_url);
        });
        

    })


}

module.exports = replaceHostImage;