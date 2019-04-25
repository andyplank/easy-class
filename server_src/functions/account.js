const bcrypt = require('bcrypt');
const saltRounds = 10;
const schema = require('../schema.js');
const jwt = require('jsonwebtoken');

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

    const payload = { user : user._id };
    let token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '24h'
    });

    // return the information including token as JSON
    res.setHeader('Set-Authorization', token);
    res.status(200).send({message:'Authentication successful '});
}

let verify = async (req, res) => {
  let token = req.headers.authorization;
  // verifies secret and checks exp
  let status = await jwt.verify(token, process.env.SECRET, 
  (err, decode) => {       
    if (err) {
      return false;       
    } else {
      return decode;
    }
  });
  if(!status){
    res.status(401).send({message : "Token authentication failed"});
    return false;
  }
  return status;
}

let account = {
    signUp : signUp,
    login : login,
    verify : verify
}

module.exports = account;