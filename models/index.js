var mongoose = require('mongoose');
var config = require('../config');
mongoose.Promise = Promise;
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect(config.dbUrl);
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String
}, {collection: 'user'});
var User = mongoose.model('User', UserSchema);
exports.User = User;

var ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    name: String,
    user: {type: ObjectId, ref: 'User'},
    createTime: {type: String, default: new Date()}
}, {collection: 'article'});
var Article = mongoose.model('Article', ArticleSchema);
exports.Article = Article;

var VueSchema = new mongoose.Schema({
    name: String,
    url: String
}, {collection: 'vue'});
var Vue = mongoose.model('Vue', VueSchema);
exports.Vue = Vue;

var NodeSchema = new mongoose.Schema({
    name: String,
    url: String
}, {collection: 'node'});
var Node = mongoose.model('Node', NodeSchema);
exports.Node = Node;

var JsSchema = new mongoose.Schema({
    name: String,
    url: String
}, {collection: 'js'});
var Js = mongoose.model('Js', JsSchema);
exports.Js = Js;

var HtmlSchema = new mongoose.Schema({
    name: String,
    url: String
}, {collection: 'html'});
var Html = mongoose.model('Html', HtmlSchema);
exports.Html = Html;

var WeiChatSchema = new mongoose.Schema({
    name: String,
    url: String
}, {collection: 'weiChat'});
var WeiChat = mongoose.model('WeiChat', WeiChatSchema);
exports.WeiChat = WeiChat;

var CommentSchema = new mongoose.Schema({
    content: String,
    name: String,
    avatar: String,
    postId: {type: ObjectId},
    createTime: {type: String, default: new Date()},
    user: {type: ObjectId, ref: 'User'}
}, {collection: 'comment'});
var Comment = mongoose.model('Comment', CommentSchema);
exports.Comment = Comment;