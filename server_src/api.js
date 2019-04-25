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

let courses = async (req, res) => {
  account.verify(req, res);
  let courses = await schema.Course.find({});
  res.status(200).send(courses);
}

let rating = async (req, res) => {
  let course = await schema.Course.findOne({_id : req.params.id}).populate({
    path: "reviews",
    model: schema.Review,
    select: "-courseID",
    populate: {
      path: "ownerID",
      model: schema.User,
      select: "username",
    }
  }).catch(err => res.status(400).send(err));
  if(course!==null){
    res.status(200).send(course);
  }
}

let review = async (req, res) =>{
  console.log(req.body);
  res.status(200).send({message: "Goodjob"});
}

let api = { 
  signUp : signUp,
  login : login,
  courses : courses,
  rating : rating,
  review : review
}

module.exports = api;