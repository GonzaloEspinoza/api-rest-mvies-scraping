const fetch = require('node-fetch');



const query = `query($term: String!, $first: Int!) {
            
                results: allMovies (search: $term, first: $first) {
                    id
                    slug
                    title
                    overview
                    duration
                    rating
                    releaseDate
                    poster
                
                }
             
            }
        
        `
        const variables = {term:'code 8', first:50};
        
        
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
    
    const searchMovie = async()=>{
    
        try {
            let res = await fetch(url, params);
            res = await res.json();
            console.log(res.data.results);
            // return <res className="data results"></res>;
            
        } catch (error) {
            console.log(error);
            return []
        }
    }


    searchMovie();
