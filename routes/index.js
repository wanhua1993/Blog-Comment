var express = require('express');
var router = express.Router();
var Article = require('../models/index').Article;

router.get('/', function (req, res){
    Article.find({}).populate('user').exec(function (err, articles){
        res.render('index', {title: '首页', articles});
    });
});
module.exports = router;