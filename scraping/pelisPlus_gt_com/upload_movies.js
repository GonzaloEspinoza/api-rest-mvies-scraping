'use strict'

const Movie = require('../../database/collections/movies');
const storageMovie = require('../../urlsLinks-pages-0-3-documentales.json');
const fs = require('fs');

const CorregirTitle= async(titleString)=>{
    var title = titleString.split(':');
    var title2 ='';
    if(title.length>2 && title.length<=3){
            title2= await (title[1])+":"+(title[2])              
    }else{
        title2=title[1]
    }
    return title2.trim();
}

const removeAccents = (str) => {

    var st= str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return st.toLowerCase();
}

const CorregirGenero= async(generoString)=>{
    if(!generoString)return generoString;
    var genere = generoString.split(',');
    genere = await genere.length>1?genere.map(d=>removeAccents(d.trim())):[removeAccents(genere[0].trim())];
    return genere;
}

const CorregirLanguage = async(SpokenLanguaje)=>{
    if(!SpokenLanguaje)return SpokenLanguaje;
    var language = SpokenLanguaje.split('•');
    language = await language.length>1 ? language.map(d=>removeAccents(d.trim())):[removeAccents(language[0].trim())];
    // console.log(language)
    return language;
}

const CorregirRuntiem= async(runtime)=>{
    if(!runtime)return runtime;
    var time = await runtime.replace('—','').trim();
    return time;
}

const CorregirRating = async(ratingSting)=>{
    if(!ratingSting)return ratingSting;
    var rating = await ratingSting.replace('de 10','').trim();
    // console.log(rating)
    return rating;
}


const CorregirRelease = async(realeaseString)=>{
    if(!realeaseString)return realeaseString;
    var release =await realeaseString.replace('—','').trim();
    // console.log(release)
    return release;
}

const YearRelease = async(dateReleaseString) => {
    if(!dateReleaseString)return dateReleaseString;
    var yearRelease = await dateReleaseString.replace('_','').trim();
    var aux = yearRelease.split('del');
    yearRelease = aux[aux.length-1].trim();
    return parseInt(yearRelease);
}

const AddEstado=async(urlArray)=>{
    if(!urlArray && urlArray.length>0)return urlArray;
    var aux = [];
    for (let i = 0; i < urlArray.length; i++) {
        var element = await Object.assign(urlArray[i],{disponible:true});
        // console.log(element);
        if(element.hostname==="fembed.com"){
            element.url = await element.url.replace('/f/','/v/');
            // console.log(element.url)
        }
        if(element.hostname==="uptobox.com"){
            var h ="https://uptostream.com/"
            var n = await element.url.split('/');
            element.url= await h+n[n.length-1];

        }
        aux[i]= await element;
    }

    return aux;
}

const Poster3Url= async(urlPoster)=>{
    if(!urlPoster)return urlPoster;
    var newUlr = await urlPoster.replace('280x420','380x570');
    return newUlr;
}
// main --------
async function UploadMovie(){

    // console.log(storageMovie.movies[0].title)
    for (let i = 0; i < storageMovie.movies.length; i++) {
        storageMovie.movies[i].title = await CorregirTitle(storageMovie.movies[i].title);
        storageMovie.movies[i].genere = await CorregirGenero(storageMovie.movies[i].genere);
        storageMovie.movies[i].spoken_languaje = await CorregirLanguage(storageMovie.movies[i].spoken_languaje);
        storageMovie.movies[i].runtime = await CorregirRuntiem(storageMovie.movies[i].runtime);
        storageMovie.movies[i].ratings_popularity = await CorregirRating(storageMovie.movies[i].ratings_popularity);
        storageMovie.movies[i].release_date = await CorregirRelease(storageMovie.movies[i].release_date);
        var YearReleased = await YearRelease(storageMovie.movies[i].release_date);
        var poster3_url = await Poster3Url(storageMovie.movies[i].poster_url);
        storageMovie.movies[i].urls_movie = await AddEstado(storageMovie.movies[i].urls_movie)
        // console.log(storageMovie);
        var movie = new Movie({
            title: storageMovie.movies[i].title,
            release_date: storageMovie.movies[i].release_date,
            yearRelease:YearReleased,
            runtime: storageMovie.movies[i].runtime,
            genere: storageMovie.movies[i].genere,
            spoken_languages: storageMovie.movies[i].spoken_languaje,
            poster_url: storageMovie.movies[i].poster_url,
            poster2_url: storageMovie.movies[i].poster2_url?storageMovie.movies[i].poster2_url:'',
            poster3_url:poster3_url,
            urls_movie: storageMovie.movies[i].urls_movie,
            overview_movie: storageMovie.movies[i].overview_movie,
            urlDetailMovieOriginal:storageMovie.movies[i].urlDetailMovieOriginal,
            Director:'',
            writer:'',
            actors:'',
            country:'',
            awards:'',
            ratings_popularity: storageMovie.movies[i].ratings_popularity,
            type:'movie',
            production:'',
        })
        
        const moviExist = await Movie.find({title:movie.title}).exec();
        if(moviExist.length==0){
            const saveed = await movie.save()
            console.log('add movie -->', saveed.title);
        }else{
            console.log('ya existe -->', movie.title)
        }
       
    }
    // await fs.appendFile('storage_urls2.json', JSON.stringify(storageMovie),'utf8', (err) => {
    //     if (err) throw err;
    //     console.log('archivo json creado --> storage_urls2.json');
    // });
}


module.exports={
    UploadMovie
}