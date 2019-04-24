const bcrypt = require('bcrypt');
const saltRounds = 10;
const schema = require('../schema.js');

let signUp = async (req, res) => {
  
    let pass = bcrypt.hashSync(req.body.password, saltRounds);
    let user = new schema.User({
      username : req.body.username,
      password : pass
    });
    let error = user.validateSync();
    if(error){
      res.status(400).send({ message : error.message });
    } else {
      user.save();
      res.setHeader('Set-Authorization', 'Hello');
      res.status(200).send({message:'Authentication successful '});
    }
}

let login = async (req, res) => {
    let user = await schema.User.findOne({username : req.body.username});
    if(user === null ){
        res.status(401).send({message: "Unauthorized"});
        return;
    }
    if(req.body.password === undefined){
        res.status(401).send({message: "Unauthorized"});
        return;
    }
    if(!bcrypt.compareSync(req.body.password, user.password)){
        res.status(401).send({message: "Unauthorized"});
        return;
    }
    res.setHeader('Set-Authorization', 'Hello');
    res.status(200).send({message:'Authentication successful '});
}

let account = {
    signUp : signUp,
    login : login
}

module.exports = account;