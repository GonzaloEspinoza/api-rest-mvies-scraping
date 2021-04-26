'use strict'
const UrlMovies = require('../../../database/collections/urlVideos')

const UrlVideos = async (req, res) => {
    console.log(req.body)
    console.log(req.body.variables.movieId)
    var idmovie = await req.body.variables.movieId;

    console.log('url movies ');
    const result = await UrlMovies.find({id2:idmovie}).exec();
    console.log(result)
    const data = await {
        movie:{
            mirrors:result
        }
    }

    res.status(200).send({data})

}


module.exports = {
    UrlVideos
}
