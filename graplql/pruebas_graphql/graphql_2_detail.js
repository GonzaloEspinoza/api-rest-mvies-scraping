const fetch = require('node-fetch');

const query = `query ($movieId: ID!) {
    movie: Movie(id: $movieId) {
      id
      title
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
const variables = {movieId: "WBTVn", first: 1, offset: 0};
// https://v2.pelisplusgt.com/graph
var url = 'https://v3.pelisplusgt.com/graph',
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
        console.log(res.data);
        var r = res.data.movie
        console.log(r)
    } catch (e) {
        console.log(e);
    }
}
main()