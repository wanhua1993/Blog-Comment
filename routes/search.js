var express = require('express');
var router = express.Router();
var Article = require('../models/index').Article;
router.post('/', function (req, res){
    var result = req.body;
    Article.find({title: new RegExp(result.title)}, function (err, result) {
        if(result.length == 0){
            req.session.error = '搜索结果为空';
            res.redirect('back');
        }else{
            res.render('crawl/search', {title: '搜索页', result});
        }
    });
});
module.exports = router;
