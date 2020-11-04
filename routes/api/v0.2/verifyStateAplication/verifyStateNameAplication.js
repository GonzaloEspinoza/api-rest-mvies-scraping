'use strict'
const AccesStateApliction = require('../../../../config/v0.2GlobalConfig/accesStateAplication');

const DatosSensurados = require('../datosSensurados/storageMovies.json');



const verifyAccesAplication = async (req, res, next) => {

    const nameAplication = await req.params.nameaplication;

    AccesStateApliction.forEach(objApp => {
        console.log(objApp.nameApliction);
        if(objApp.nameApliction === nameAplication){
            if(objApp.state){
    
                next();
    
            }else{
                res.status(200).send({
                    message:"datosSensurados",
                    totalResults:DatosSensurados.movies.length, 
                    movies:DatosSensurados.movies});
            }
        };
    });

}





module.exports = verifyAccesAplication;