var ApiCalls = require('./js_backend/ApiCalls');
var DbEditor = require('./js_backend/DbManipulator');
var Schema = require('./js_backend/Schema');

var debugMode = true;

var newCommentId = 1000000000;
var newArticleId = 1000000000;

function init(){
  var q = 'SELECT MAX(' + Schema.Article.column.id + ' ) as max ' +
          'FROM ' + Schema.Article.table + ';';
  var r = 'SELECT MAX(' + Schema.Comment.column.commentId + ' ) as max ' +
          'FROM ' + Schema.Comment.table + ';';

  DbEditor.rawQuery(q, function(err, rows){
    if(!err && rows[0].max !== null){
      console.log(rows);
      newArticleId = rows[0].max + 1;
      console.log('New article\'s id: ' + newArticleId);
    } else {
      console.log(err);
    }
  });

  DbEditor.rawQuery(r, function(err, rows){
    if(!err && rows[0].max !== null){
      console.log(rows);
      newCommentId = rows[0].max + 1;
      console.log('New comment\'s id: ' + newCommentId);
    } else {
      console.log(err);
    }
  });
}
init();

function incrementCommentId(){
  newCommentId += 1;
  console.log('Update new comment\'s id to -> ' + newCommentId);
}

function incrementArticleId(){
  newArticleId += 1;
  console.log('Update new article\'s id to -> ' + newArticleId);
}

function toString(s){
  return '\'' + s + '\'';
}

module.exports = function(app, passport) {


    app.get('/api/article/id/:id', function(req, res, next) {

        if (req.isAuthenticated() || debugMode) {

            ApiCalls.getArticle(req.params.id ,function(err, rows) {
                if (err) {
                    res.json('');
                } else {
                    res.json(rows[0]);
                }
            });

        } else {
            res.redirect('/signin');
        }
    });


    app.get('/api/article/latest', function(req, res, next) {

        if (req.isAuthenticated() || debugMode) {

            ApiCalls.getLatestArticle(function(err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            });

        } else {
            res.redirect('/signin');
        }
    });


    app.get('/api/loves/article/:articleId', function(req, res, next) {

      if(req.isAuthenticated() || debugMode) {

          ApiCalls.getLovesInArticle(req.params.articleId, function(err, rows) {
              if(err){
                res.json(err);
              } else {
                res.json(rows);
              }
          });

      } else {
          res.redirect('/signin');
      }

    });


    app.post('/api/loves/aid/:articleId/uid/:userId', function(req, res, next) {

      if(req.isAuthenticated() || debugMode) {

          ApiCalls.postLoveToArticle(req.params.userId, req.params.articleId, function(err, rows){

              if(!err){
                console.log(rows);
                ApiCalls.getLovesInArticle(req.params.articleId, function(err, rows){
                    console.log(rows);
                    if(!err){
                      res.json(rows);
                    } else {
                      console.log(err);
                    }
                });
              } else {
                console.log(err);
              }

          });
      } else {
        res.redirect('/');
      }
    });

    app.delete('/api/loves/aid/:articleId/uid/:userId', function(req, res, next) {

      if(req.isAuthenticated() || debugMode){

        ApiCalls.removeLoveFromArticle(req.params.userId, req.params.articleId, function(err, rows){

            if(!err){
              ApiCalls.getLovesInArticle(req.params.articleId, function(err, rows){
                  if(!err){
                    res.json(rows);
                  } else {
                    console.log(err);
                  }
              });
            }else{
              console.log(err);
            }
        });
      } else {
        res.redirect('/');
      }
    });

    app.post('/api/article/uid/:authorId', function(req, res, next) {
      if(req.isAuthenticated() || debugMode){
          ApiCalls.postArticle(newArticleId, req.params.authorId, toString(req.body.title), toString(req.body.content), function(err, rows){
              if(!err){
                res.json('redirect to article');
                incrementArticleId();
              } else {
                console.log(err);
              }
              if(req.body.articleImage === ''){
                ApiCalls.postArticleImage(newArticleId-1, req.body.articleImage, function(err, rows){

                });
              }
          });

      } else {
        res.redirect('/');
      }
    });

    app.get('/api/comment/aid/:articleId', function(req, res, next) {
      if(req.isAuthenticated() || debugMode){
          ApiCalls.getCommentsOfArticle(req.params.articleId, function(err, rows) {
              if(!err){
                res.json(rows);
              } else {
                console.log(err);
              }
          });
      } else {
        res.redirect('/');
      }
    });

    app.post('/api/comment/aid/:articleId/commentorId/:commentorId', function(req, res, next) {
      if(req.isAuthenticated() || debugMode){
        ApiCalls.postCommentsToArticle(newCommentId, req.params.articleId, req.params.commentorId, req.body.comment, function(err, rows){
          if(!err){
            incrementCommentId();
          } else {
            console.log(err);
          }
        });
      } else {
        res.redirect('/');
      }
    });

    app.get('/api/userinfo/username/:username', function(req, res, next){
      if(req.isAuthenticated() || debugMode){
        ApiCalls.getUserInfo(req.params.username, function(err, rows){
          if(!err){
            console.log('-------------------------\n-' + rows);
            res.json(rows[0]);
          }
        });
      } else {
        res.redirect('/');
      }
    });



};
