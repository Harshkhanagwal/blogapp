const mongoose = require('mongoose')
const validator  = require('validator')


const postSchema = new mongoose.Schema({
    title :{
        type : String,
        required: true
    },
    authorName : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    }
})

//create new collection 
const Post = new mongoose.model('post', postSchema)

module.exports = Post;