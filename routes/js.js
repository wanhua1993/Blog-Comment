var express = require('express');
var router = express.Router();
var Js = require('../models/index').Js;
var node = require('../models/main');
var url = 'http://blog.csdn.net/column/details/javascript-html-css.html';
var cal = 'h4 a';
var Code = 'utf-8';
node(Code, url, cal, Js);
router.get('/', function (req, res) {
    Js.find({name: new RegExp('javascript', 'i')}, function (err, jss) {
        res.render('crawl/js', {jss});
    });
});
module.exports = router;