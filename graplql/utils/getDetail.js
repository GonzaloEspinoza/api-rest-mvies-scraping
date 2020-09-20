const fetch = require('node-fetch');
const GlobalConfig = require('../../config/globalConfigServerPeliplusgt.json');


const getDetailMovie = async(stringIdMovie)=>{
    // :::get detail movie-->  https://v2.pelisplusgt.com/graph
    const query = `query ($movieId: ID!) {
        movie: Movie(id: $movieId) {
          id
          title
          slug
          poster
          duration
          rating
          releaseDate
          overview
          trailer
          backdrop
          released
          genres {
            id
            slug
            name
          }
          mirrors {
            id
            quality
            audio
            type
            hostname
            url
          }
        }
      }
    `
    const variables = {movieId: stringIdMovie, first: 1, offset: 0};
    //url = https://v2.pelisplusgt.com/graph
    var url = GlobalConfig.dataServerConfig.hostGraphQlServer,
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables
            })
        };
    
        
        try {
            let res = await fetch(url, options);
            res = await res.json();
            // console.log(res.data);
            var result = res.data.movie;
            // console.log(r);
            return result;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    

    module.exports = {
        getDetailMovie
    }