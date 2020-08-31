
const fetch = require('node-fetch');
const { Model } = require('mongoose');

const query = `
query {
    trends: List (id: "XmzUq") {
                   movies {
                    ...MovieFields
                    duration
                    backdrop        
                }
                },
                highlighted: List (id: "GZ1Uk") {
                    movies {
                        ...MovieFields
                        duration
                        backdrop
                    }
                },
                releasedRecently: 
                allMovies (
                    order: { 
                        releaseDate: "DESC" },
                            first: 49) {
                        ...MovieFields
                    },
                bestOf2017: allMovies (
                filter: { 
                    releaseYear: 2017 }, 
                    order: { rating: "DESC" },
                        first: 14) {
                            ...MovieFields
                        },
                newMovies: allMovies (
                    order: { creation: "DESC" }, first: 14) {
                        ...MovieFields
                    },
                        comingSoon: allMovies (
                            filter: { comingSoon: true }, order: { releaseDate: "ASC" }, first: 21) 
                            {
                                ...MovieFields
                        },
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
// const variables = {genreId: "XmzUq", first: 50, offset: 0};
// https://v2.pelisplusgt.com/graph
var url = 'https://v2.pelisplusgt.com/graph',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query
        })
    };
async function main(){
    try {
        let res = await fetch(url, options);
        res = await res.json();
        console.log(res.data.highlighted);
        return res.data.highlighted.movies;
        // console.log(res.data.movies.length);
    } catch (e) {
        console.log(e);
    }
}



// main()

module.exports = main;

