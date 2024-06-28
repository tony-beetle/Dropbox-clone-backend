//import user model
const users = require("../Models/UserSchema");
var jwt = require("jsonwebtoken");
const configs = require("../configs");
var AWS = require("aws-sdk");
// configure aws-sdk
const s3 = new AWS.S3({
  region: configs.s3.REGION,
  accessKeyId: configs.s3.ACCESS_KEY,
  secretAccessKey: configs.s3.SECRET_KEY,
});

// user registration
exports.register = async (req, res) => {
  console.log("inside user registration fn");
  const { name, email, password } = req.body;
  console.log(`Name-${name} , email is ${email} password ${password}`);
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(404).json(`user ${name} already exists`);
      console.log(existingUser);
    } else {
      const newUser = new users({
        name,
        email,
        password,
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(`Error ${err}`);
  }
};

// user login
exports.login = async (req, res) => {
  console.log("inside login  fn");
  const { email, password } = req.body;
  console.log(`email is ${email} and password is ${password}`);
  try {
    const existingUser = await users.findOne({ email, password });
    console.log(existingUser);
    if (existingUser) {
      //generate token
      const token = jwt.sign({userId: existingUser._id}, "superSecretKey123");
      // console.log(userId);
      res.status(200).json({
        existingUser,
        role: "user",
        token,
      });
    } else {
      res.status(404).json("no user found,Do sign up");
    }
  } catch (err) {
    res.status(401).json(`Error ${err}`);
  }
};

//fn to upload a file 
exports.fileUpload = async (req, res) => {
  console.log("inside file upload function");
  console.log(req.file);
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }
  const params = {
    Bucket: configs.s3.BUCKET,
    Key: file.originalname, // Or however you want to name your file in S3
    Body: file.buffer,
  };
  try {
    const data = await s3.upload(params).promise(); // Convert the AWS request to a promise
    res.send(data); // Send response back to client
    console.log(data);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      //Check if headers have not been sent yet
      res.status(500).send(err.message); // Send error response
    }
  }
};

// fn to generate a signed url
const generatePresignedUrl = (fileKey) => {
  const params = {
    Bucket:configs.s3.BUCKET ,
    Key: fileKey,
    Expires: 60 * 5, // URL expires in 5 minutes
  };
  return s3.getSignedUrl('getObject', params);
};
 //fn to list all objects in aws s3
exports.listFile = async (req, res) => {
  const params = {
    Bucket: configs.s3.BUCKET,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const files = data.Contents.map((item) => {
      return {
        key: item.Key,
        size: item.Size,
        LastModified: item.LastModified,
        url: generatePresignedUrl(item.Key)    };
    });
    res.json(files);
  } catch (err) {
    console.error("Error fetching file list: ", err);
    res.status(500).send(err.message);
  }
};
