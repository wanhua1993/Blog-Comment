var express = require('express');
var router = express.Router();
var User = require('../models/index').User;
var multer = require('multer');
var upload = multer({dest: 'public/'});
router.get('/signup', function (req, res) {
    res.render('user/signup');
});

router.post('/signup', upload.single('avatar'), function (req, res) {
    var user = req.body;
    user.avatar = '/' + req.file.filename;
    User.findOne({username: user.username}, function (err, doc) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (doc) {
                req.session.error = '用户已经存在';
                res.redirect('back');
            } else {
                User.create(user, function (err, doc) {
                    if (err) {
                        res.redirect('back');
                    } else {
                        req.session.success = '用户创建成功';
                        res.redirect('/user/signin');
                    }
                })
            }
        }
    })
});
router.get('/signin', function (req, res) {
    res.render('user/signin');
});
router.post('/signin', function (req, res) {
    var user = req.body;
    User.findOne(user, function (err, doc) {
        if (err) {
            req.session.error = inspect(err);
            res.redirect('back');
        } else {
            if (doc) {
                req.session.success = '登录成功';
                req.session.user = doc;
                res.redirect('/');
            } else {
                req.session.error = '用户名或密码不正确';
                res.redirect('back');
            }
        }
    });
});
router.get('/signout', function (req, res) {
    req.session.user = null;
    req.session.success = '退出登录';
    res.redirect('/');
});
module.exports = router;
