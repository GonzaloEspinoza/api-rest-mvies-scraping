const fetch = require('node-fetch');


const getMovies = async(StringGenereId, intFirst, intOffset)=>{

    const query = `query ($genreId: ID!, $first: Int!, $offset: Int!) {
        genre: Genre (id: $genreId){
            id
            slug
            name
        }
        movies: allMovies (
            filter: { genres: [$genreId] }, order: { rating: "DESC" }, first: $first, offset: $offset)
            {    
                ...MovieFields          
            }      
        }       
        fragment MovieFields on Movie {
            id
            slug       
            title
            rating
            releaseDate
            released
            poster
            nowPlaying
        }

    `
    const variables = {genreId: StringGenereId, first: intFirst, offset:intOffset};


    const url = 'https://v2.pelisplusgt.com/graph';
    const params = {
        method:'POST',
        body: JSON.stringify({
            query,
            variables
        }),
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }


    try {
        let res = await fetch(url, params);
        res = await res.json();
        console.log(res.data.movies.length);
        return res.data.movies;

    } catch (error) {
        console.log(error);
        return []
    }
}


module.exports ={
    getMovies
}
