

const ModelServerConfid = require('../../../database/collections/data_server_movies/initialData');


const DataServerInitial = async (req, res)=>{

    const data = await  ModelServerConfid.find({}).exec();
    if(data.length>0){
        res.status(200).send({'initialDataServer':data});
    }else{
        res.status(400).send({message:'no hay datos'})
    }
}




module.exports = {
     DataServerInitial
}