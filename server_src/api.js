const mongoose = require('mongoose');
//const schemaCtrl = require('../models/schema');
const url = "";

//Setting up the database
mongoose.connect(url, {
  useNewUrlParser: true
});
let db = mongoose.connection;
    db.once('open', () => {
});

let login = function login(req, res){
    res.status(200).sendFile(path.resolve('./public/login.html'));
}

let api = { 
    login : login
}

module.exports = api;