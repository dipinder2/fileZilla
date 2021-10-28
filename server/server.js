const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require('dotenv').config();
require("./config/mongoose.config");
const fileUpload = require("express-fileupload")


//----------------Middlewares------------------
app.use(express.json(), express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));
app.use(cors({
	origin:'http://localhost:3000',
	credentials:true,
}));
//----------------------------------------------


//------------------Routes--------------------------
const AllMyUserRoutes = require("./routes/user.routes");
const AllMyFilesRoutes = require("./routes/files.routes");
AllMyUserRoutes(app);
AllMyFilesRoutes(app);

//--------------------------------------------------
console.log("server")

app.listen(8000, () => console.log("The server is all fired up on port 8000"));
