'use strict'

const ApiInfo = (req, res)=>{

    res.status(200).send({
        api_info:[
            {
            genere:{
                message:'Muestra peliculas por genero, 25 por cada pagina',
                endpoint:'http://localhost:8000/show/movies/genere=ciencia%20ficcion&page=1'
                }
            },{
                rating_polularity:{
                    message:'Muestra las 25 peliculas con rating mas altos por cada pagina (descnedente de mayor a menor)',
                    endpoint:'http://localhost:8000/show/rating/page=1'
                }
            },{
                Realease_Year:{
                    message:'Muestra las 25 peliculas más actuales (descnedente de mayor a menor-año)',
                    endpoint:'http://localhost:8000/show/movies/year/page=1'
                }
                
            },{
                Realease_Year_specific:{
                    message:'Muestra las 25 peliculas de acuerdo a un año en especifico',
                    endpoint:'http://localhost:8000/show/movies/yearspecific?year=2018&page=1'
                }
                
            }
        ]
    })
}


module.exports = ApiInfo;