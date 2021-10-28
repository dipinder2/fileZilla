// inside of user.routes.js
const Users = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

console.log("route")
module.exports = app => {
  app.post("/api/user", Users.login);
  app.post("/api/user/register",Users.register)
  app.get("/api/user", authenticate, Users.getAll);
  app.get("/api/user/logout", Users.logout);
}



