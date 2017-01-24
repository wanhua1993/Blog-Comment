var express = require('express');
var router = express.Router();
var Article = require('../models/index').Article;
var Comment = require('../models/index').Comment;
router.get('/add', function (req, res) {
    res.render('article/add', {title: '发表文章', article: {}});
});

router.post('/add', function (req, res) {
    var article = req.body;
    if (article._id) {
        Article.update({_id: article._id}, {title: article.title, content: article.content}, function (err, doc) {
            if (err) {
                req.session.error = inspect(err);
                res.redirect('back');
            } else {
                req.session.success = '修改成功';
                res.redirect('/article/detail/' + article._id);
            }
        });
    } else {
        article.user = req.session.user._id;
        console.log(req.session.user);
        article.name = req.session.user.username;
        var date = new Date();
        var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        article.createTime = time;
        delete article._id;
        Article.create(article, function (err, doc) {
            if (err) {
                req.session.error = inspect(err);
                res.redirect('back');
            } else {
                req.session.success = '发表成功';
                res.redirect('/');
            }
        });
    }
});

router.get('/detail/:_id', function (req, res) {
    Article.findById(req.params._id, function (err, article) {
        req.session.article = req.params._id;
        Comment.find({postId: req.params._id}, function (err, comment){
            res.render('article/detail', {title: '详情页', article, comment});
        });
    })
});

router.get('/delete/:_id', function (req, res) {
    Article.findById(req.params._id, function (err, article) {
        if (article.user == req.session.user._id) {
            Article.remove({_id: req.params._id}, function () {
                if (err) {
                    req.session.error = inspect(err);
                    res.redirect('back');
                } else {
                    req.session.success = '删除成功';
                    res.redirect('/');
                }
            });
        } else {
            req.session.error = '没有权限';
            res.redirect('back');
        }
    })
});

router.get('/update/:_id', function (req, res) {
    Article.findById(req.params._id, function (err, article) {
        res.render('article/add', {title: '修改文章', article})
    })
});

module.exports = router;
