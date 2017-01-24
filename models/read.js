var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
module.exports = function (Code, url, cal, callback) {
    var items = [];
    request({url: url, encoding: null}, function (err, response, body) {
        body = iconv.decode(body, Code);
        var $ = cheerio.load(body);
        $(cal).each(function () {
            var that = $(this);
            var item = {
                name: that.text().trim(),
                url: that.attr('href')
            };
            items.push(item);
        });
        callback(null, items);
    });
};