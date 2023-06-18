const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const router = require("./routes/postRoutes")
const Post = require('./modules/postSchema')

require('./db/connection');

const port = 3000 || process.env.PORT

const app = express();
app.set('view engine', 'ejs')

const staticPath = path.join(__dirname, '../public')

app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)


// get routs
app.get("/", async (req, res) => {
    try{
        let data = await Post.find();
        res.render('home', {data : data})
    }catch(err){
        throw new Error(err)
    }

})

app.get('/about', (req, res) => {
    res.render('about', {
        content: "Creating this blog using Express.js has allowed me to combine my love for technology and writing. It serves as a platform for me to express my thoughts and engage in meaningful conversations with my readers. I believe in the power of storytelling and the impact it can have on others. This blog enables me to share my stories and experiences in a way that resonates with people from all walks of life."
    })
})

app.get('/upload', (req, res) => {
    res.render('upload', {})
})

app.get('/error', (req, res) => {
    res.render('error', {})
})


app.get('/post/:id', async (req, res) => {

    const requestedPostId = req.params.id;

    try{
        let data =  await Post.findOne({ _id: requestedPostId });
        res.render('post', { data : data})
        throw new Error("Data Error")

    }catch(err){
        res.send(err)
    }


})

app.listen(port, () => {
    console.log("listening to PORT : " + port)
})

