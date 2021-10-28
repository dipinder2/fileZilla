const jwt = require("jsonwebtoken");
 
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, process.env.FIRST_SECRET_KEY, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
      next();
    }
  });
}