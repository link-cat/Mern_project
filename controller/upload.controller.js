UserModel = require('../models/user.model');
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.uploadProfil = async (req, res) =>{
    console.log(req)
    

}
