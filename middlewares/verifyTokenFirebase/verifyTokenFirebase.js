'use strict'

const verifyTokemFirebase=(req, res, next)=>{
    const TOKEN = req.params.token

    console.log('tokne->',TOKEN)
    if(TOKEN==="123456PPP"){
        console.log('token existente');
        next();
    }
    else{
        console.log('token no es valido');
        res.status(404).send({error:'token no valido'});
    }


}




module.exports = {
    verifyTokemFirebase
}