const express = require('express');
const Article = require('../models/Article');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('newArticles', { article: new Article() });
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
    })
    try {
        article = await article.save();
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        res.render('newArticles', { article: article });
    }
})

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (article == null)
        res.redirect('/');
    res.render('showArticle', { article: article });
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('editArticles', { article: article });
})

router.put(':/id', async (req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.title
    });
    try {
        article = await article.save();
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        console.log(e);
    }
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


module.exports = router;