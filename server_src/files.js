const path = require('path');

let login = function (req,res){
    res.status(200).sendFile(path.resolve('./public/login.html'));
}

let index = function (req,res){
    res.status(200).sendFile(path.resolve('./public/login.html'));
}

module.exports = {
    login : login,
    index : index
}