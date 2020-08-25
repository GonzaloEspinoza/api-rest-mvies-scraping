const ModelMovie =  require('../database/collections/movies');

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
    let aux =`https://v2.pelisplusgt.com/_images/posters/${stringPoster}/280x420.jpg`;
    return aux;
}

const getPoster3=(stringPoster)=>{
    if(!stringPoster)return stringPoster;
    let aux =`https://v2.pelisplusgt.com/_images/posters/${stringPoster}/380x570.jpg`;
    return aux;
}

const getUrlDetailMovieOriginal=async(idMovie, slugMovie)=>{
    if(!idMovie || !slugMovie)return null;
    let urlDetailMovieOriginal = await  `https://v2.pelisplusgt.com/pelicula/${slugMovie}-${idMovie}`;
    return urlDetailMovieOriginal;

}

const getUrlMovies=async(urlsMovie)=>{
    if(!urlsMovie)return urlsMovie;
    var aux=[];
    for (let i = 0; i < urlsMovie.length; i++) {
        
        let a = await "https://v2.pelisplusgt.com"+urlsMovie[i].url;
        urlsMovie[i].url=await a;
    }
    return urlsMovie;
}

// upload movie ::
// genreid: 'XmzUq'
const UploadmoviesDetail = async()=>{
    let genreid='JggUN';
    let firts = 100;
    let offset = 50;

    const dataMovies = await getMovies.getMovies(genreid,firts,offset);
    // console.log('---upload movies');
    // console.log(dataMovies);

    if(dataMovies.length>0){
        for (let i = 0; i < dataMovies.length; i++) {

            const detailMovie = await getDetailMovie.getDetailMovie(dataMovies[i].id);
            // console.log(detailMovie)
           var movie = await new ModelMovie({
                id2:detailMovie.id,
                title:detailMovie.title,
                slug:detailMovie.slug,
                release_date: detailMovie.releaseDate,
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


