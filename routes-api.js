var ApiCalls = require('./js_backend/ApiCalls');

var debugMode = true;

module.exports = function(app, passport) {
    /*
            API
    */
    // app.get('/api/article/:username/:article_name', function(req, res, next) {
    //
    //     if (req.isAuthenticated() || debugMode) {
    //         //TODO: delete this or do query, then return as json
    //         res.json({
    //             title: 'title',
    //             content: 'this is a test'
    //         });
    //
    //     } else {
    //         res.redirect('/signin');
    //     }
    // });


    app.get('/api/article/id/:id', function(req, res, next) {

        if (req.isAuthenticated() || debugMode) {

            ApiCalls.getArticle(req.params.id ,function(err, rows) {
                if (err) {
                    res.json('');
                } else {
                    res.json(rows);
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
                res.json('');
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
      }
    });

    app.post('/api/article/uid/:authorId', function(req, res, next) {
      if(req.isAuthenticated() || debugMode){
          ApiCalls.postArticle(req.params.authorId, '\''+req.body.title+'\'', '\''+req.body.content+'\'', function(err, rows){
              if(!err){
                res.json('redirect to article');
              } else {
                console.log(err);
              }
          });
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
      }
    });

    app.post('/api/comment/aid/:articleId/commentorId/:commentorId', function(req, res, next) {
      if(req.isAuthenticated() || debugMode){
        ApiCalls.postCommentsToArticle(req.params.articleId, req.params.commentorId, req.body.comment, function(err, rows){
          console.log(rows);
          console.log(err);
        });
      }
    });


};
