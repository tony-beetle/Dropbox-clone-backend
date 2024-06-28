const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
       // required:true
    },
    email:{
        type:String,
       //required:true
    },
    number:{
        type:Number,
       // required:true
    },
    joinedDate:{
        type:String
    },
    lastSignIn:{
        type:String
    },
    password:{
        type:String
    },
    url:{
        type:String
    }

    
})

//coz already users collection created in mongodb else it will creata  a new collection
const users = mongoose.model('users',userSchema)

module.exports = users
//module.exports = rent