var read = require('./read');
var save = require('./save');
var async = require('async');
var novels = [];
var Sch = null;
module.exports = function (Code, url, cal, Schema){
    async.series([
        function (done){
            read(Code, url, cal, function (err, items){
                novels = items;
                Sch = Schema;
                done();
            });
        },
        function (done){
            save(novels, done, Sch);
        }
    ],function (err, result){

    });
};
