const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
    username : { type : String, required : true },
    password : { type: String, required: true },
    reviews: { type: [Schema.Types.ObjectId], default: [], ref: "Review", required : true},
});

let Course = new Schema({
    name : { type : String, required : true },
    rating : { type : Number, required : true },
    reviews: { type: [Schema.Types.ObjectId], default: [], ref: "Review", required : true},
});

let Review = new Schema({
    ownerID : { type: Schema.Types.ObjectId, ref: "Profile", required : true},
    courseID : { type: Schema.Types.ObjectId, ref: "Profile", required : true},
    rating : { type : Number, required : true },
    comments : { type : String, required : true }
})

//map the schemas to mongo collections
let schema = {
    User: mongoose.model("User", User, 'Users'),
    Course: mongoose.model("Course", Course, 'Courses'),
    Review: mongoose.model("Review", Review, 'Reviews')
}

module.exports = schema;