const ModelMovie =  require('../database/collections/movies');
const GlobalConfig = require('../config/globalConfigServerPeliplusgt.json');

const MoviesDestacados = require('./pruebas_graphql/recientes')

const getMovies = require('./utils/getMoviesForGenere');
const getDetailMovie = require('./utils/getDetail');
const { model } = require('mongoose');


const getYearRelease=async(stringRelase)=>{
    if(!stringRelase)return stringRelase;
    var aux = parseInt(stringRelase.split('-')[0]);
    return aux;
}

const getGenres=async(arrayGenres)=>{
    if(!arrayGenres)return arrayGenres;
    let aux = await arrayGenres.map(d=>d.slug);
    return aux;
}

const getPoster1=(stringPoster)=>{
    if(!stringPoster)return stringPoster;
    let aux =`${GlobalConfig.dataServerConfig.hostImgasShow}/${stringPoster}/280x420.jpg`;
    return aux;
}

const getPoster3=(stringPoster)=>{
    if(!stringPoster)return stringPoster;
    let aux =`${GlobalConfig.dataServerConfig.hostImgasShow}/${stringPoster}/380x570.jpg`;
    return aux;
}

const getUrlDetailMovieOriginal=async(idMovie, slugMovie)=>{
    if(!idMovie || !slugMovie)return null;
    // let urlDetailMovieOriginal = await  `https://v3.pelisplusgt.com/pelicula/${slugMovie}-${idMovie}`;
    let urlDetailMovieOriginal = await  `${GlobalConfig.dataServerConfig.hostMoviedetail}/${slugMovie}-${idMovie}`;
    return urlDetailMovieOriginal;

}

const getUrlMovies=async(urlsMovie)=>{
    if(!urlsMovie)return urlsMovie;
    var aux=[];
    for (let i = 0; i < urlsMovie.length; i++) {
        
        // let a = await "https://v3.pelisplusgt.com"+urlsMovie[i].url;
        let a = await GlobalConfig.dataServerConfig.hostServer+urlsMovie[i].url;
        urlsMovie[i].url=await a;
    }
    return urlsMovie;
}

// upload movie ::
// genreid: 'XmzUq'
const UploadmoviesDetail = async()=>{
    let genreid='JggUN';
    let firts = 50;
    let offset = 150;

    // const dataMovies = await getMovies.getMovies(genreid,firts,offset);
    const dataMovies = await MoviesDestacados();
    

    // console.log('---upload movies');
    // console.log(dataMovies);

    if(dataMovies.length>0){
        for (let i = 0; i < dataMovies.length; i++) {

            const detailMovie = await getDetailMovie.getDetailMovie(dataMovies[i].id);
            // console.log(detailMovie)
           var movie = await new ModelMovie({
                id2:await detailMovie.id,
                title:await detailMovie.title,
                slug:await detailMovie.slug,
                release_date: await detailMovie.releaseDate,
                yearRelease:await getYearRelease(detailMovie.releaseDate),
                runtime:detailMovie.duration,
                genere: await getGenres(detailMovie.genres),
                spoken_languages:[],
                poster_url:await getPoster1(detailMovie.poster),
                poster2_url:'',
                poster3_url:await getPoster3(detailMovie.poster),
                urlDetailMovieOriginal: await getUrlDetailMovieOriginal(detailMovie.id, detailMovie.slug),
                urls_movie: await getUrlMovies(detailMovie.mirrors),
                overview_movie:detailMovie.overview,
                Director:'',
                writer:'',
                actors:'',
                country:'',
                awards:'',
                ratings_popularity:detailMovie.rating,
                type:'',
                production:'', //producido por
           })

            //    console.log(movie);
            const moviExist = await ModelMovie.find({id2:movie.id2}).exec();
            if(moviExist.length==0){
                const saveed = await movie.save()
                console.log('add movie -->', saveed.title);
            }else{
                console.log('ya existe -->', movie.title)
            }
        //    return movie;
            
        }
    }

}

// UploadmoviesDetail();

module.exports = UploadmoviesDetail;


