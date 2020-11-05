const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenUser = ({
    tokenUserClient     : String,
    startinUseApp : { type:Date, default:Date.now()},
    lastUseApp    : Date

});

var tokenUser = mongoose.model('tokenuser', TokenUser);


module.exports = {
    tokenUser
}