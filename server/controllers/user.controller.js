const {User} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const UserDict ={ 

register: async(req, res) => {
    console.log("register in controller")
    try{
        const user = await User.create(req.body)
        await jwt.sign({id: user._id}, process.env.FIRST_SECRET_KEY,function(err,token){
            if(err)res.status(402).json(err)
            if(token){
                res.cookie('usertoken',token, { maxAge: 900000, httpOnly: true }).send({userId:user._id})
            }
        })
    }
    catch(err){
        res.status(400).json(err)
    }
},
getAll:(req,res) =>{
  User.find()
  .then(user=>res.json(user))
  .catch(err=>res.json(err))
},
login: async(req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        console.log("controller's login function")
        if(user === null) {
            return res.sendStatus(400);
        }
     
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword) {
            // password wasn't a match!
            return res.sendStatus(400).json({message:"passwords didn't match"});
        }

        await jwt.sign({id: user._id}, process.env.FIRST_SECRET_KEY,function(err,token){
            if(err)res.status(402).json(err)
            if(token)res.cookie('usertoken',token, { maxAge: 900000, httpOnly: true }).send({userId:user._id})
        });
    }
    catch(err){
        res.status(400).json(err)
    }
},
logout: (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}
}

module.exports = UserDict
