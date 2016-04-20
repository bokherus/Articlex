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

        if (res.isAuthenticated()) {

            ApiCalls.getLatestArticle(function(err, rows) {
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


    app.post('/api/article/latest', function(req, res, next) {

        if (req.isAuthenticated()) {

            ApiCalls.getLatestArticle(function(err, rows) {
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
};
