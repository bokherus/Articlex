var DbEditor = require('./DbManipulator');
var Schema = require('./Schema');

var getArticle = function(id, callback){
  DbEditor.query(Schema.Article.table, ['*'], [Schema.Article.column.id+'='], [id], callback);
};

var getLatestArticles = function(callback){
  var q = 'SELECT articleId, username as author, content, createTime, title FROM ' + Schema.Article.table + ', ' + Schema.User.table +
          ' WHERE ' + Schema.Article.table + '.' + Schema.Article.column.authorId + ' =' + ' ' + Schema.User.table + '.' + Schema.User.column.id +
          ' LIMIT 10;';
  console.log(q);
  DbEditor.rawQuery(q, callback);
};

function a(string){
  return '\''+string+'\'';
}


module.exports = {
  getArticle: getArticle,
  getLatestArticle: getLatestArticles
};
