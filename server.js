const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Article = require('./models/Article');

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => console.log("MongoDB Connected"));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    // const articles = [
    //     {
    //         title: 'Text Article',
    //         createdAt: new Date(),
    //         description: 'Text Description'
    //     },
    //     {
    //         title: 'Text Article 2',
    //         createdAt: new Date(),
    //         description: 'Text Description 2'
    //     }
    // ];
    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('index', { articles: articles });
})

app.use('/articles', require('./routes/articles'));


app.listen(3000, () => {
    console.log("Server's Running at port 3000");
})