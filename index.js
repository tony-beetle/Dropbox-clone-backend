require("dotenv").config();
const multer = require("multer");
const configs = require("./configs");

require("./DB/connection");
const express = require("express");
const cors = require("cors");
const FileServer = express();
const router = require("./Routes/route");
const url=require('./configs')

FileServer.use(cors());
FileServer.use(express.json());
FileServer.use(express.urlencoded({ extended: true }));
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
FileServer.use(router);

const port = 5000;


FileServer.listen(port, () => {
  console.log(` FileServer listening at http://localhost:${port}`);
  
});

FileServer.get("/", async (req, res) => {
  try {
    res.send("Msg sent");
  } catch (err) {
    console.log(err);
  }
});


// FileServer.post("/upload", verifyToken, upload.single("myFile"), async (req, res) => {
//   console.log("inside file upload function");
//   const file = req.file;
//   if (!file) {
//     return res.status(400).send("No file uploaded.");
//   }
//   const params = {
//     Bucket: configs.s3.BUCKET,
//     Key: file.originalname, // Or however you want to name your file in S3
//     Body: file.buffer,
//   }
//   try{
//     const data = await s3.upload(params).promise();// Convert the AWS request to a promise
//     res.send(data); // Send response back to client
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//     if (!res.headersSent) {
//       //Check if headers have not been sent yet
//       res.status(500).send(err.message); // Send error response
//     }
//   }
// });
