const ModelnitialState = require('./initialData');


const Update =async()=>{

    const NewUpdate = new ModelnitialState({
        hostServer:`https://v2.pelisplusgt.com`,
        hostGenere:`https://v2.pelisplusgt.com/genero`,
        hostMoviedetail: `https://v2.pelisplusgt.com/pelicula`,
        hostGraphQlServer: `https://v2.pelisplusgt.com/graph`,
        headers:{
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         },
         detailGraphqlQuery:`query ($movieId: ID!) {
            movie: Movie(id: $movieId) {
              id
              title
              slug
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
        `,
        detailGraphqlVariables:{'movieId': 'idMovie'},
    })

   const data = await ModelnitialState.find({});
//    console.log(data)
   if(data.length>0){
      let d=await ModelnitialState.findOneAndReplace({_id:data[0]._id},
                {
                    hostServer:NewUpdate.hostServer,
                    hostGenere:NewUpdate.hostGenere, 
                    hostMoviedetail:NewUpdate.hostMoviedetail,
                    hostGraphQlServer:NewUpdate.hostGraphQlServer,
                    headers:NewUpdate.headers,
                    detailGraphqlQuery:NewUpdate.detailGraphqlQuery,
                    detailGraphqlVariables:NewUpdate.detailGraphqlVariables
                });
     let d2=await ModelnitialState.findById({_id:data[0]._id}); 
      console.log('update -->',d2);

   }else{
      let d=  await NewUpdate.save();
      console.log('saved--->',d)
   }
}



// Update();

module.exports = Update;