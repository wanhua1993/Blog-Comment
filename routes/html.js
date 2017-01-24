var express = require('express');
var router = express.Router();
var Html = require('../models/index').Html;
var node = require('../models/main');
var url = 'http://so.csdn.net/so/search/s.do?q=html5%2Bcss&t=blog&o=&s=&l=null';
var cal = 'dt a';
var Code = 'utf-8';
node(Code, url, cal, Html);
router.get('/', function (req, res){
    Html.find({name: new RegExp('html', 'i')}, function (err, htmls){
        res.render('crawl/html', {htmls});
    });
});
module.exports = router;