'use strict'

const Movie = require('../../../database/collections/movies');



const  ShowMovies = async (req,res)=>{
    var pag = parseInt(req.params.page);
    var page = !pag?1:pag;
    var skip1 = (page-1)*50;
    var limit1 = 50;
    
    var genere = req.params.genere
    if(!genere)res.status(400).send({error:'se require el genero'})

   const movies = await Movie.find({genere:genere})
                        .skip(skip1)
                        .limit(limit1)
                        .exec();

    const totalResults = await movies.length;

    res.status(200).send({totalResults,movies})
    
}


const RatingPopularity = async(req, res)=>{
    var pag = parseInt(req.params.page) 
    var page = !pag?1:pag;
    var skit1 = (page-1)*50;
    var limit1=50;


    var movies = await Movie.find({}).sort({ratings_popularity:-1})
                .skip(skit1)
                .limit(limit1)
                .exec();
    
    const totalResults = await movies.length;
    
    res.status(200).send({totalResults,movies});
    
}


const YearRelease =async (req,res) =>{
    var pag = parseInt(req.params.page) 
    var page = !pag?1:pag;
    var skit1 = (page-1)*50;
    var limit1=50;

  const movies = await Movie.find({}).sort({yearRelease:-1})
                    .skip(skit1)
                    .limit(limit1)
                    .exec()

    const totalResults = await movies.length;
    res.status(200).send({totalResults,movies})
}

const YearReleaseSpecific = async(req, res)=>{
    var year = parseInt(req.query.year);
    var pag = parseInt(req.query.page);
    var page = !pag?1:pag;
    var skit1 = (page-1)*50;
    var limit1=50;
    console.log(typeof(year));

    const movies = await Movie.find({yearRelease:year})
                    .skip(skit1)
                    .limit(limit1)
                    .exec()

    const totalResults = await movies.length;

    res.status(200).send({totalResults,movies})

}

// muestra las urls por hostname y por lenguaje
const ShowUrlMovies=async(req, res)=>{
    const idMovie = req.params.idmovie;
    const hostname = req.query.hostname;
    const language = req.query.language;

// console.log(idMovie, hostname, language)

    Movie.findById({_id:idMovie},async (err,data)=>{
        if(err){res.status(400).send({message:'Error query'})}
        if(!data){res.status(400).send({message:'no found'})}
        if(data){

            // console.log(data.urls_movie[0].audio);
            
            var urlM = new Array;
            for (let i = 0; i < data.urls_movie.length; i++) {
                console.log(data.urls_movie[i].audio)
                if(data.urls_movie[i].hostname===hostname && data.urls_movie[i].audio===language ){
                    urlM = [...urlM,data.urls_movie[i]];
                 }
            }
                
            res.status(200).send({movieUrls:urlM})
            
        }
       
    
    });

    // console.log(resultMovie);
    // res.status(200).send({movie:resultMovie})

}


module.exports={
    ShowMovies,
    RatingPopularity,
    YearRelease,
    YearReleaseSpecific,
    ShowUrlMovies
}