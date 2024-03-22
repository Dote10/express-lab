
const {User} = require('../models');

exports.helloUser = (req,res) =>{
    res.send('Hello User');
}

exports.helloParamQuery = (req,res) => {
    console.log('params = ',req.params);
    console.log('query = ', req.query);
    res.send('ok');
}

exports.createUser = (req,res) =>{

    const {name, email,password, age, married, about_me} = req.body;

    User.create({

    })

}