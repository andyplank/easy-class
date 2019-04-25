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
  const auth = await account.verify(req, res);
  if (auth===false) return;
  let courses = await schema.Course.find({});
  res.status(200).send(courses);
}

let rating = async (req, res) => {
  const auth = await account.verify(req, res);
  if (auth===false) return;
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
  const auth = await account.verify(req, res);
  if (auth===false) return;
  let user = await schema.User.findById(auth.user);
  let index = user.reviews.find(elm => elm == req.body.courseID);
  if(index!==undefined){
    res.status(400).send({message: "Already reviewed"});
    return;
  }
  let course = await schema.Course.findById(req.body.courseID);
  let id = mongoose.Types.ObjectId()
  let review = new schema.Review({
    _id : id,
    ownerID : auth.user,
    courseID : req.body.courseID,
    rating : req.body.rating,
    comments : req.body.comments
  });
  let error = review.validateSync();
  if(error){
    res.status(400).send({ message : error.message });
  } else {
    course.reviews.push(req.body.courseID);
    course.save();
    user.reviews.push(id);
    user.save();
    review.save();
    res.status(200).send({message:'Review successfully posted'});
  }
}

let api = { 
  signUp : signUp,
  login : login,
  courses : courses,
  rating : rating,
  review : review
}

module.exports = api;