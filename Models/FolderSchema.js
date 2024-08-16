const mongoose = require('mongoose')

const folderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        // required:true
    }


})

const Folders = mongoose.model('folders',folderSchema)

module.exports = Folders