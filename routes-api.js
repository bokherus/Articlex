var ApiCalls = require('./js_backend/ApiCalls');

module.exports = function(app, passport) {
    /*
            API
    */
    app.get('/api/article/:username/:article_name', function(req, res, next) {

        if (req.isAuthenticated()) {
            //TODO: delete this or do query, then return as json
            res.json({
                title: 'title',
                content: 'this is a test'
            });

        } else {
            res.redirect('/signin');
        }
    });


    app.get('/api/article/:id', function(req, res, next) {

        if (req.isAuthenticated() || true) {

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


    app.get('/api/latestArticle/', function(req, res, next) {

        if (req.isAuthenticated() || true) {

            ApiCalls.getLatestArticle(function(err, rows) {
                console.log(err);
                console.log(rows);
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
};
