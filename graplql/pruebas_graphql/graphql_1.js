
const fetch = require('node-fetch')

const query = `query ($genreId: ID!, $first: Int!, $offset: Int!) {
    genre: Genre(id: $genreId) {
      id
      slug
      name
    }
    movies: allMovies(filter: {genres: [$genreId]}, order: {rating: "DESC"}, first: $first, offset: $offset) {
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
const variables = {genreId: "XmzUq", first: 50, offset: 0};
// https://v2.pelisplusgt.com/graph
var url = 'https://v2.pelisplusgt.com/graph',
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
async function main(){
    try {
        let res = await fetch(url, options);
        res = await res.json();
        console.log(res.data.movies.length);
    } catch (e) {
        console.log(e);
    }
}
main()
// --
