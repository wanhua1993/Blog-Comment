var async = require('async');
var Sch = null;
module.exports = function (items, callback, Schema) {
    async.series([
        function (callback) {
            Sch = Schema;
            Sch.remove({}, callback);
        },
        function (callback) {
            async.forEach(items, function (item, next) {
                Sch.create(item, next);
            }, callback);
        }
    ], function (err, result) {
        callback();
    });
};
