// inside of user.routes.js
const Files = require('../controllers/file.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.post("/api/files/:userId",authenticate,Files.upload);
  app.get("/api/files/:userId", Files.getAll);
}



