const mongoose = require('mongoose')
const connectionString = process.env.db_string

mongoose.connect(connectionString).then(()=>{
    console.log("mongodb connected to hostelServer");
}).catch(err=>{
    console.log("mongodb connection got failed !!" + err);
})