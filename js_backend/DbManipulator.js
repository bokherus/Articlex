var DB = require('./DbConnection.js');
var Schema = require('./Schema.js');

var dbpool = DB();

var manipulator = {
    query: query,
    rawQuery: rawQuery
};

function rawQuery(query, callback) {

    dbpool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            callback(err);
            return;
        }

        connection.query(query, function(err, rows) {
            connection.release();
            callback(err, rows);
        });

    });
}

function query(table, selects, where, clauses, callback) {

    var q = 'select ';

    //select something ...
    for (var i = 0; i < selects.length; i++) {
        q += selects[i];
        if (i < selects.length - 1) q += ',';
        q += ' ';
    }

    //select .. from table ..
    q += 'from ';
    q += table + ' ';

    //select .. where ..
    q += 'where ';
    for (var j = 0; j < where.length; j++) {
        q += where[j];
        q += clauses[j];
        if (j < where.length - 1) q += ', ';

    }

    q += ';';
    console.log('Query: ' + q);
    rawQuery(q, callback);

}


module.exports = manipulator;
