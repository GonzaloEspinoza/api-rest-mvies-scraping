const ModelnitialState = require('./initialData');


const Update =async()=>{

    const NewUpdate = new ModelnitialState({
        hostServer:`https://v2.pelisplusgt.com`,
        hostGenere:`https://v2.pelisplusgt.com/genero`,
        hostMoviedetail: `https://v2.pelisplusgt.com/pelicula`,
        detailGraphql:`query ($movieId: ID!) {
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
        detailGraphqlVariables:{movieId: 'idMovie', first: 1, offset: 0},
    })

   const data = await ModelnitialState.find({});
//    console.log(data)
   if(data.length>0){
      let d=await ModelnitialState.findOneAndReplace({_id:data[0]._id},
                {
                    hostServer:NewUpdate.hostServer,
                    hostGenere:NewUpdate.hostGenere, 
                    hostMoviedetail:NewUpdate.hostMoviedetail,
                    detailGraphql:NewUpdate.detailGraphql,
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