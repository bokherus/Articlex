var DbEditor = require('./DbManipulator');
var Schema = require('./Schema');


var getArticle = function(id, callback){
  var q = 'SELECT ' + Schema.Article.column.id + ', ' + Schema.User.column.username + ' as author ,' + Schema.Article.column.content + ', ' + Schema.Article.column.time + ', ' + Schema.Article.column.title + ', ' + Schema.ArticleImage.column.url + ' ' +
          'FROM ' + Schema.Article.table + ', ' + Schema.User.table + ' ' +
          'WHERE ' + Schema.Article.column.id + '=' + id + ' AND ' + Schema.Article.column.authorId + '=' + Schema.User.column.commentId + ';';
  console.log(q);
  DbEditor.rawQuery(q, callback);
  // DbEditor.query(Schema.Article.table, ['*'], [Schema.Article.column.id+'='], [id], callback);
};

var getLatestArticles = function(callback){
  var q = 'SELECT articleId, username as author, content, createTime, title' + ' ' +
          'FROM ' + Schema.Article.table + ', ' + Schema.User.table + ' ' +
          'WHERE ' + Schema.Article.table + '.' + Schema.Article.column.authorId + '=' + Schema.User.table + '.' + Schema.User.column.id + ' ' +
          'ORDER BY ' + Schema.Article.column.time + ' DESC;';
  console.log(q);
  DbEditor.rawQuery(q, callback);
};

var getLove = function(articleId, callback){
  var q = 'SELECT ' + Schema.Love.table + '.' + Schema.Love.column.uid + ', '+ Schema.User.column.fname + ', ' + Schema.User.column.lname + ' ' +
          'FROM ' + Schema.User.table + ', ' + Schema.Love.table + ' ' +
          'WHERE ' + Schema.Love.table + '.' + Schema.Love.column.aid + '=' + articleId + ' AND ' + Schema.Love.table + '.' + Schema.Love.column.uid + '=' + Schema.User.table +'.' + Schema.User.column.id +';';
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
  var q = 'SELECT ' + Schema.Comment.column.commentId + ', ' + Schema.User.column.fname + ', ' + Schema.User.column.lname + ', ' + Schema.Comment.column.comment + ', ' + Schema.Comment.column.time + ' ' +
          'FROM ' + Schema.Comment.table + ', ' + Schema.User.table + ' ' +
          'WHERE ' + Schema.Comment.column.aid + '=' + articleId + ' AND ' + Schema.Comment.column.commentorId + '=' + Schema.User.column.id + ';';
  console.log(q);
  DbEditor.rawQuery(q, callback);
  // DbEditor.query(Schema.Comment.table, [Schema.Comment.column.commentId, Schema.Comment.column.commentorId, Schema.Comment.column.comment, 'date_format(' + Schema.Comment.column.time + ', \'%e-%c-%Y %T\') as createTime'], [Schema.Comment.column.aid+'='], [articleId], callback);
};

var postComment = function(newCommentId, articleId, commentorId, comment, callback){
  var q = 'INSERT INTO ' + Schema.Comment.table + ' ' +
          'VALUES (' + newCommentId + ', ' + articleId + ', ' + commentorId + ', ' + toString(comment) + ', NOW());';
  console.log(q);
  DbEditor.rawQuery(q, callback);
};

var getUserInfo = function(username, callback){
  var q = 'SELECT ' + Schema.User.column.id + ', ' + Schema.User.column.username + ', ' + Schema.User.column.fname + ', ' + Schema.User.column.lname + ' ' +
          'FROM ' + Schema.User.table + ' '+
          'WHERE ' + Schema.User.column.username + '=' + toString(username) + ';';
  console.log(q);
  DbEditor.rawQuery(q, callback);
};

var postArticleImage = function(articleId, imageURL, callback){
  var q = 'INSERT INTO ' + Schema.ArticleImage.table + ' ' +
          'VAULES (' + articleId + ', ' + toString(imageURL) + ');';
  console.log(q);
  DbEditor.rawQuery(q, callback);
};

var postTagFromArticle = function(articleId, tags, callback){
  var q = 'INSERT INTO ' + Schema.Tag.table + ' ' +
          'VALUES ';
  for(var i = 0; i < tags.length; i++) {
    q += '( ' + toString(tags[i]) + ', ' + articleId + ')';
    if(i < tags.length - 1) q += ',';
    else q += ';';
  }
  console.log(q);
  DbEditor.rawQuery(q, callback);
};


var getFollowingsArticle = function(userId, callback){
  var q = 'SELECT tbl_articles.articleId, tbl_users.username, tbl_users.firstName, tbl_users.lastName, tbl_articles.content, tbl_articles.title, tbl_articles.createTime ' +
          'FROM tbl_articles, tbl_users, tbl_follows ' +
          'WHERE tbl_follows.uid=' + userId + ' AND tbl_follows.following=tbl_articles.authorId AND tbl_follows.following=tbl_users.uid';
  console.log(q);
  DbEditor.rawQuery(q, callback);
};

var getFollowings = function(userId, callback){
  var q = 'SELECT tbl_users.uid, tbl_users.username, tbl_users.firstName, tbl_users.lastName ' +
          'FROM tbl_users, tbl_follows ' +
          'WHERE tbl_follows.uid=' + userId + ' AND tbl_follows.following=tbl_users.uid;';
  console.log(q);
  DbEditor.rawQuery(q, callback);
};

var postFollowing = function(userId, followingId, callback){
  var q = 'INSERT INTO tbl_follows ' +
          'VALUES(' + userId + ', ' + followingId + ');';
};



function toString(s){
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
  getUserInfo: getUserInfo,
  getFollowingsArticle: getFollowingsArticle,
  getFollowings: getFollowings,
  postFollowing: postFollowing
};
