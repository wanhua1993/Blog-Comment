var express = require('express');
var router = express.Router();
var Node = require('../models/index').Node;
var node = require('../models/main');
var url = 'http://www.jb51.net/list/list_243_1.htm';
var cal = 'dt a';
var Code = 'GB2312';
node(Code, url, cal, Node);
router.get('/', function (req, res){
    Node.find({name: new RegExp('node', 'i')}, function (err, nodes){
        res.render('crawl/node', {nodes});
    });
});
module.exports = router;