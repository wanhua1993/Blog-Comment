var express = require('express');
var router = express.Router();
var Comment = require('../models/index').Comment;
var Article = require('../models/index').Article;
router.post('/:_id/add', function (req, res){
    var postId = req.params._id;
    var comment = req.body;
    var date = new Date();
    var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    try{
        comment = {
            createTime: time,
            content: comment.title,
            postId: postId,
            avatar: req.session.user.avatar,
            name: req.session.user.username
        };
    }catch(e){
        req.session.error = '请登录以后再评论';
        res.redirect('back');
    }
    var id = req.session.article;
    Comment.create(comment, function (err, comment){
        if(err){
            req.session.error = inspect(err);
            res.redirect('back');
        }else{
            Article.findById(req.params._id, function (err, article){
                Comment.find({postId: id}, function (err, comment){
                    if(err){
                        req.session.error = inspect(err);
                        res.redirect('back');
                    }
                    req.session.success = '评论成功';
                    res.render('article/detail', {title: '评论', comment, article});
                });
            });
        }
    });
});
module.exports = router;
