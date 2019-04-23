const mongoose = require('mongoose');
const schema = require('./schema.js');
const dotenv = require('dotenv');
dotenv.config();
const url = 'mongodb+srv://' + process.env.USER + ':' + process.env.PASS + '@easyclass-z2o4s.mongodb.net/test?retryWrites=true';
const account = require('./functions/account.js')


//Setting up the database
mongoose.connect(url, {
  useNewUrlParser: true
});
let db = mongoose.connection;
  db.once('open', () => {
});

let signUp = async (req, res) => {
  account.signUp(req,res);
}

let login = async (req, res) => {
  account.login(req,res);
}

let api = { 
  signUp : signUp,
  login : login
}

module.exports = api;