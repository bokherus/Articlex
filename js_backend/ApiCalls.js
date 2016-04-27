var DbEditor = require('./DbManipulator');
var Schema = require('./Schema');



var getArticle = function(id, callback){
  var q = 'SELECT ' + Schema.Article.column.id + ', ' + Schema.User.column.username + ' as author ,' + Schema.Article.column.content + ', date_format(' + Schema.Article.column.time + ', \'%e-%c-%Y %T\') as createTime' + ', ' + Schema.Article.column.title + ' ' +
          'FROM ' + Schema.Article.table + ', ' + Schema.User.table + ' ' +
          'WHERE ' + Schema.Article.column.id + '=' + id + ' AND ' + Schema.Article.column.authorId + '=' + Schema.User.column.commentId + ';';
  console.log(q);
  DbEditor.rawQuery(q, callback);
  // DbEditor.query(Schema.Article.table, ['*'], [Schema.Article.column.id+'='], [id], callback);
};

var getLatestArticles = function(callback){
  var q = 'SELECT articleId, username as author, content, date_format(createTime, \'%e-%c-%Y %T\') as createTime, title FROM ' + Schema.Article.table + ', ' + Schema.User.table +
          ' WHERE ' + Schema.Article.table + '.' + Schema.Article.column.authorId + ' =' + ' ' + Schema.User.table + '.' + Schema.User.column.id +
          ' LIMIT 10;';
  console.log(q);
  DbEditor.rawQuery(q, callback);
};

var getLove = function(articleId, callback){
  var q = 'SELECT ' + Schema.Love.column.uid + ', COUNT(' + Schema.Love.column.aid + ') as amount ' +
          'FROM ' + Schema.Love.table + ' ' +
          'WHERE ' + Schema.Love.column.aid + '=' + articleId + ';';
  console.log(q);
  DbEditor.rawQuery(q, callback);
  // DbEditor.query(Schema.Love.table, [Schema.Love.column.uid, 'count(' + Schema.Love.column.aid +') as number'], [Schema.Love.column.aid+'='], [articleId], callback);
};

var postLove = function(userId, articleId, callback){
  var q = 'INSERT INTO ' + Schema.Love.table + ' VALUES (' + articleId + ', ' + userId + ');';
  console.log(q);
  DbEditor.rawQuery(q, callback);
};

var deleteLove = function(userId, articleId, callback){
  var q = 'DELETE FROM ' + Schema.Love.table +
          ' WHERE ' + Schema.Love.column.uid + '=' + userId + ' AND ' + Schema.Love.column.aid + '=' + articleId + ';';
  console.log(q);
  DbEditor.rawQuery(q, callback);
};

var postArticle = function(newArticleId ,userId, title, content, callback){
  var q = 'INSERT INTO ' + Schema.Article.table +
          ' VALUES ('+ newArticleId + ', ' + userId + ', ' + title + ', ' + content + ', NOW() );';
  console.log(q);
  DbEditor.rawQuery(q, callback);
};

var getComments = function(articleId, callback){
  var q = 'SELECT ' + Schema.Comment.column.commentId + ', ' + Schema.Comment.column.commentorId + ', ' + Schema.Comment.column.comment + ', date_format( ' + Schema.Comment.column.time + ', \'%e-%c-%Y %T\') as createTime' +
          'FROM ' + Schema.Comment.table + ' ' +
          'WHERE ' + Schema.Comment.column.aid + '=' + articleId + ';';
  console.log(q);
  DbEditor.rawQuery(q, callback);
  // DbEditor.query(Schema.Comment.table, [Schema.Comment.column.commentId, Schema.Comment.column.commentorId, Schema.Comment.column.comment, 'date_format(' + Schema.Comment.column.time + ', \'%e-%c-%Y %T\') as createTime'], [Schema.Comment.column.aid+'='], [articleId], callback);
};

var postComment = function(newCommentId, articleId, commentorId, comment, callback){
  var q = 'INSERT INTO ' + Schema.Comment.table +
          'VALUES (' + newCommentId + ', ' + articleId + ', ' + commentorId + ', ' + a(comment) + ', NOW());';
  console.log(q);
  DbEditor.rawQuery(q, callback);
};

var getTagInArticle = function(articleId, callback){
  var q = 'SELECT ' + Schema.Tag.column.tagName + ' ' +
          'FROM ' + Schema.Tag.table + ' ' +
          'WHERE ' + Schema.Tag.column.articleId + '=' + articleId + ';';
  console.log(q);
  DbEditor.rawQuery(q, callback);
  // DbEditor.query(Schema.Tag.table, [Schema.Tag.column.tagName], [Schema.Tag.column.articleId+'='], articleId, callback);
};

var getTaggedArticles = function(tagName, callback){
  var q = 'SELECT ' + Schema.Article.column.id + ', ' + Schema.Article.column.title + ', ' + Schema.Article.column.content + ', ' + 'date_format(' + Schema.Article.column.time + ', \'%e-%c-%Y %T\') as createTime ' +
          'FROM ' + Schema.Article.table + ', ' + Schema.Tag.table + ' ' +
          'WHERE ' + Schema.Tag.column.tagName + '=' + tagName + ' AND ' + Schema.Tag.column.articleId + '=' + Schema.Article.column.id;
  console.log(q);
  DbEditor.rawQuery(q, callback);
};


function a(s){
  return '\''+s+'\'';
}

module.exports = {
  getArticle: getArticle,
  getLatestArticle: getLatestArticles,
  getLovesInArticle: getLove,
  postLoveToArticle: postLove,
  removeLoveFromArticle: deleteLove,
  postArticle: postArticle,
  getCommentsOfArticle: getComments,
  postCommentsToArticle: postComment,
  getTagInArticle: getTagInArticle,
  getTaggedArticles: getTaggedArticles
};
