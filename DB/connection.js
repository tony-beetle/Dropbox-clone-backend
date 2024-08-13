const mongoose = require('mongoose')
require('dotenv').config();
const url=require('../configs')

const connectionString = url.s3.db_string

mongoose.connect(connectionString).then(()=>{
    console.log("mongodb connected to File storage server");
}).catch(err=>{
    console.log("mongodb connection got failed !!" + err);
})