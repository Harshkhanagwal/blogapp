const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('../modules/postSchema')


const router = new express.Router();

router.use(bodyParser.urlencoded({ extended: true }))


// post 

router.post('/upload', (req, res) => {


    const newPost = new Post({
        title: req.body.title,
        authorName: req.body.username,
        body: req.body.blogBody
    });

    newPost.save().then(() => {
        res.redirect("/");
    }).catch((err) => {
        res.redirect("/error");
    })
})

module.exports = router;