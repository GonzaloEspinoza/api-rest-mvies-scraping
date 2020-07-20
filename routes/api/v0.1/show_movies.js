'use strict'

const Movie = require('../../../database/collections/movies');



const  ShowMovies = async (req,res)=>{
    var pag = parseInt(req.params.page);
    var page = !pag?1:pag;
    var skip1 = (page-1)*25;
    var limit1 = 25;
    
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
    var skit1 = (page-1)*25;
    var limit1=25;


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
    var skit1 = (page-1)*25;
    var limit1=25;

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
    var skit1 = (page-1)*25;
    var limit1=25;
    console.log(typeof(year));

    const movies = await Movie.find({yearRelease:year})
                    .skip(skit1)
                    .limit(limit1)
                    .exec()

    const totalResults = await movies.length;

    res.status(200).send({totalResults,movies})

}



module.exports={
    ShowMovies,
    RatingPopularity,
    YearRelease,
    YearReleaseSpecific
}