var express = require('express');
var router = express.Router();
var WeiChat = require('../models/index').WeiChat;
var node = require('../models/main');
var url = 'http://www.jb51.net/Special/900.htm';
var cal = '.mod_txt_style li a';
var Code = 'gbk';
node(Code, url, cal, WeiChat);
router.get('/', function (req, res){
    WeiChat.find({name: new RegExp('微信小程序')}, function (err, vues){
        res.render('crawl/weiChat', {vues});
    });
});
module.exports = router;
