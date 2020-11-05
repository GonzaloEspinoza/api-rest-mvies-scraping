'use strict'

const TokenUser = require('../../database/collections/tokenUser');


const verifyTokemFirebase = async (req, res, next) => {
    

    const bearerHerder = await req.headers.authorization;
    console.log(typeof(req.headers.authorization))

    if(typeof(bearerHerder) !== 'undefined'){

        if(bearerHerder.length < 150) return res.status(400).send({error:"Token is invalid"});
        
        const TOKEN = await req.headers.authorization.split(" ")[1];
        console.log(req.headers.authorization);
    
        
        var result = await TokenUser.tokenUser.findOne({tokenUserClient:TOKEN});
        console.log(result, typeof(result));
        if(result){
    
            console.log('token existente');
            next();
    
        }
        else{
            console.log('Invalid token');
            res.status(404).send({error:'Invalid token', message:"client token is required to continue"});
            return;
        }
    }else{
        console.log({veryfyTokenFirebase:"token is required"});
        res.status(403).send({error:"access denied",message:"Access token is required"});
        return;
    }
   


}

const registerTokenFirebase = async (req, res) => {
    
    var newtokenCLientFirebase = await req.body.tokenCLientFirebase;
    
    if(newtokenCLientFirebase != undefined && newtokenCLientFirebase.length < 150) return res.status(400).send({error:"Invalid token"});

    var tokenExist = await TokenUser.tokenUser.findOne({tokenUserClient:newtokenCLientFirebase});
    if(tokenExist) return res.status(200).send({message:"token has already been registered"});
    
    var newTokenClient = new TokenUser.tokenUser({
        tokenUserClient: newtokenCLientFirebase
    });

    newTokenClient.save((error, newData)=>{
        if(error) return res.status(400).send({error:"Error not register token"});
        if(newData){
            res.status(200).send({message:"ok",newCreateToken:newData})
        }
    });
}






module.exports = {
    verifyTokemFirebase,
    registerTokenFirebase
}