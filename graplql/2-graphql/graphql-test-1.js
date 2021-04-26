
const ModelMovie = require('../../database/collections/movies')
const fetch = require('node-fetch');
const Utils = require('./utils')
const URLMOVIES = require('../../database/collections/urlVideos');
// datat
var data ={
    endPointGraphql : 'https://api.esplay.io/graphql',
    hostWeb : 'https://www.pelisplus2.io/'
}
// metos de peticion 

const query = `
query movies_list(
    $list: String, 
    $year: Int, 
    $page: Int, 
    $limit: Int) {
         showList(
             type: "movie", 
             list: $list, 
             year: $year, 
             page: $page, 
             limit: $limit
    ) {
    totalCount 
        items {
        id 
        title
        originalTitle
        overview
        coverPath
        year
        slug
        year
        genres {
            id
            slug
            name
            __typename
        }
        country {
            name
            __typename
        }
        gallery {type
            photoPath
            backdrop
            __typename
        }
            quality {
                    type
                    language
                    __typename
                }
                    __typename
                }
                    __typename
                }}

`
// const variables = {list: "premiere", limit: 2}
const variables = {limit: 10, type: "movie"}

const main = async () => {

    const url ="https://api.esplay.io/graphql";
    const params = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    }
    
    try {
        var result = await fetch(url, params);
        var dataMovies = await result.json();

        // console.log(dataMovies)
        // console.log(dataMovies.data.showList)
        // console.log(dataMovies.data.showList.items[0].genres)
       
        console.log("--------before for------");
        console.log(dataMovies.data.showList.items.length)
         
        for (let i = 0; i < dataMovies.data.showList.items.length; i++) {

            const detailMovie = await dataMovies.data.showList.items[i]
            // console.log(detailMovie)
           var movie = await new ModelMovie({
                id2:await detailMovie.id,
                title:await detailMovie.title,
                slug:await detailMovie.slug,
                release_date: await detailMovie.year,
                yearRelease:detailMovie.year,
                runtime:"",
                genere: await Utils.getGenres(detailMovie.genres),
                spoken_languages:[],
                poster_url:await Utils.getUrlImage(detailMovie.coverPath),
                poster2_url:'',
                poster3_url:await Utils.getUrlImage(detailMovie.coverPath),
                // urlDetailMovieOriginal: await getUrlDetailMovieOriginal(detailMovie.id, detailMovie.slug),
                // urls_movie: await getUrlMovies(detailMovie.mirrors),
                urls_movies: [],
                overview_movie: await Utils.getOverview(detailMovie.overview),
                // Director:'',
                // writer:'',
                // actors:'',
                // country:'',
                // awards:'',
                // ratings_popularity:detailMovie.rating,
                // type:'',
                // production:'', //producido por
           })
                // console.log("------model test-----");
            //    console.log(movie);

            const moviExist = await ModelMovie.find({id2:movie.id2}).exec();
            if(moviExist.length==0){
                const saveed = await movie.save()
                console.log('add movie -->', saveed.title);
                console.log(moviExist)
                // saveDataUrls(moviExist[0]._id,detailMovie.id,)

            }else{
                console.log('ya existe -->', movie.title)
                saveDataUrls(moviExist[0]._id,detailMovie.id,)

            }
            
        }

    //    console.log(movie)
    } catch (error) {
        console.log(error)
    }

    
}


const getUrlMovies =async(idMovie)=>{

    const query =`
    query queryVideos($itemId: String!) { videos(itemId: $itemId) 
        { language  
          url
        quality   
          sandbox    
          type    
          server    
          updatedAt    
          status    
          __typename }
      }
    `
    
    const variables = {
        "itemId": idMovie
    };

    const urlGraphql='https://api.esplay.io/graphql';
    const params={
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })

    }

    var data =await fetch(urlGraphql, params);
    var urls = await data.json();
    // console.log(urls.data.videos)
    
    return urls.data.videos
    
}

const saveDataUrls=async(_id,id2)=>{

    const urls = await getUrlMovies(id2);
    console.log('lllllllllllllllllll')
console.log(_id)
console.log(id2)
    for(var i=0; i<urls.length;i++){

        var urlMovies =await new URLMOVIES({
            idMovie:_id,
            id2:id2,
            languaje:urls[i].language,
            audio:urls[i].language,
            url:urls[i].url,
            quality:urls[i].quality,
            type:'free',
            status:urls[i].status,
            server:urls[i].server,
            hostname:urls[i].server
        
        })

        // var ifExist=urlMovies.find({})
        urlMovies.save((err,data)=>{
            if(err)console.log(err);
            if(data)console.log(data)
        })
    }
}

// main();
// getUrlMovies();


module.exports = main