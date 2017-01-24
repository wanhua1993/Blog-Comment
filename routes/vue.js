var express = require('express');
var router = express.Router();
var Vue = require('../models/index').Vue;
var node = require('../models/main');
var url = 'http://so.csdn.net/so/search/s.do?q=vue&t=blog&o=&s=&l=null';
var cal = 'dt a';
var Code = 'utf-8';
node(Code, url, cal, Vue);
router.get('/', function (req, res) {
    Vue.find({name: new RegExp('vue', 'i')}, function (err, vues) {
        res.render('crawl/vue', {vues});
    });
});
module.exports = router;