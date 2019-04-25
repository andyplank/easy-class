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
  let courses = await schema.Course.find({}).sort({rating : -1});
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
    var rating = 0;
    var numRatings = 0;
    course.reviews.forEach(review => {
      rating += review.rating;
      numRatings++;
    });
    if(numRatings!=0){
      course.rating = rating/numRatings;
      course.save();
    }
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
  let review = new schema.Review({
    ownerID : auth.user,
    courseID : req.body.courseID,
    rating : req.body.rating,
    comments : req.body.comments
  });
  let error = review.validateSync();
  if(error){
    res.status(400).send({ message : error.message });
  } else {
    course.reviews.push(review._id);
    course.save();
    user.reviews.push(course._id);
    user.save();
    review.save();
    res.status(200).send({message:'Review successfully posted'});
  }
}

let newCourse = async (req, res) =>{
  const auth = await account.verify(req, res);
  if (auth===false) return;
  let course = await schema.Course.findOne({name : req.body.name});
  if(course!==null){
    res.status(400).send({ message : "Course already exists "});    
    return;
  }
  let newCourse = new schema.Course({
    name : req.body.name,
  });
  let error = newCourse.validateSync();
  if(error){
    res.status(400).send({ message : error.message });
  } else {
    newCourse.save();
    res.status(200).send({message:'Course successfully added'});
  }
}

let api = { 
  signUp : signUp,
  login : login,
  courses : courses,
  rating : rating,
  review : review,
  newCourse : newCourse
}

module.exports = api;