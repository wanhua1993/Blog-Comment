var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session);
global.inspect = require('util').inspect;

var index = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
var vue = require('./routes/vue');
var node = require('./routes/node');
var js = require('./routes/js');
var html = require('./routes/html');
var weiChat = require('./routes/weiChat');
var comment = require('./routes/comment');
var search = require('./routes/search');

var app = express();

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
var config = require('./config');
app.use(session({
    secret: 'wh',//加密的cookie的密钥
    cookie: {httpOnly: true},//httpOnly=true的时候就客户端js无法读取cookie
    resave: true,//每次访问客户端服务器的时候都会重新保存一次会话对象
    saveUninitialized: true,//保存未使用过的session对象
    store:new MongoStore({//指定会话的存储位置
        url:config.dbUrl
    })
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.locals.success = req.session.success;
    res.locals.error = req.session.error;
    //把回话对象的user属性取出来 赋给res.locals
    res.locals.user = req.session.user;
    res.locals.article = req.session.article;
    req.session.success = req.session.error = null;
    next();
});

app.use('/', index);
app.use('/user', user);
app.use('/article', article);
app.use('/vue', vue);
app.use('/node', node);
app.use('/js', js);
app.use('/html', html);
app.use('/weiChat', weiChat);
app.use('/comment', comment);
app.use('/search', search);

app.listen(3000);