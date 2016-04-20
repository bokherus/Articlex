var DbEditor = require('./DbManipulator');
var Schema = require('./Schema');

var getArticle = function(id, callback){
  DbEditor.query(Schema.Article.table, ['*'], [a(Schema.article.column.id)+'='], [id],function(err, rows){
    callback(err, rows);
  });
};

function a(string){
  return '\''+string+'\'';
}
