//----------------Requirements-----------------
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const jwt_decode = require('jwt-decode');
require("dotenv").config();


//----------------Variables--------------------
const s3Client = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_BUCKET_REGION
    }
});


const FileDict = {
	fileExists: async function(params){
		await s3Client.getObject(params,function(err,data){
			var ret;
			if(err){ 
				//file doesn't exists
			}
			if(data){
				return false
			}
		})
	},
	upload: async function(req,res){
		const uid = req.params.userId

		for (const [key, value] of Object.entries(req.files)) {
			try {
				const params = {
				    Bucket: process.env.BUCKET_NAME,
				    Key: uid.toString() +"/" + key,
				}
				params.Body = req.files[key].data
			    const data = await s3Client.putObject(params,function(err,data){
			    	if(err)console.log(err,err.stack);
			    	else console.log(data)
			    });
			    return data;
			} 
			  catch (err) {
			    res.status(400).json(err)
			  }
		}
		
},
	getAll: async function(req,res){
		try{
			const uid = req.params.userId
			console.log(uid)
			console.log(req.cookies)

	     var params = {
	        	Bucket: process.env.BUCKET_NAME,
	        	Prefix: `${uid}/`
	         };

	    s3Client.listObjectsV2(params, function(err, data) {
		      if(err){
		      	res.status(400).json(err);
		      }
		      else{
		      	let myFiles = [];
		      	for(let i in data.Contents){
		      		let newKey = data.Contents[i].Key.toString().split("/");
		      		let file = {...data.Contents[i],"Key":newKey[1]}
		      		myFiles.push(file)
		      	}
		      	res.json(myFiles)
		 	 }           
		    });

		}catch(err){
			console.log("getAll err:", err)
		}
	}
}


module.exports = FileDict;