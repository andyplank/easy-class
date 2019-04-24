const path = require('path');

let login = function (req,res){
    res.status(200).sendFile(path.resolve('./public/login.html'));
}

let courses = (req,res) => {
    res.status(200).sendFile(path.resolve('./public/courses.html'));
}

let course = (req,res) => {
    res.status(200).sendFile(path.resolve('./public/ratings.html'));
}

module.exports = {
    login : login,
    courses : courses,
    course : course
}